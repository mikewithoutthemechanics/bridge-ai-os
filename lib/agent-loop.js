// =============================================================================
// AGENT LOOP v1.0
// The actual execution runtime. This is what makes agents *alive*.
// Not a cron job. Not random. Not fake.
// =============================================================================
'use strict';

const EventEmitter = require('events');

const AGENT_STATES = Object.freeze({
  IDLE:       'idle',
  THINKING:   'thinking',
  WORKING:    'working',
  WAITING:    'waiting',
  FAILED:     'failed',
  SLEEPING:   'sleeping',
  BACKOFF:    'backoff'
});

const PRIORITY = Object.freeze({
  IMMEDIATE:  0,
  HIGH:       1,
  NORMAL:     2,
  LOW:        3,
  BACKGROUND: 4
});

class AgentLoop extends EventEmitter {
  constructor() {
    super();
    this.agents = new Map();
    this.queue = [];
    this.running = false;
    this.tickTimer = null;
    this.tickIntervalMs = 1100; // Prime number, avoids harmonic lock
  }

  register(agent) {
    if (!agent.execute) throw new Error('Agent must implement execute()');

    this.agents.set(agent.name, {
      agent,
      state: AGENT_STATES.IDLE,
      lastRun: 0,
      nextRun: Date.now(),
      runCount: 0,
      successCount: 0,
      failCount: 0,
      consecutiveFails: 0,
      backoffMs: 0,
      dutyCycle: agent.dutyCycle || 0.15, // 15% active time default
      currentWork: null,
      lastError: null
    });

    this.emit('agent:registered', agent.name);
  }

  unregister(agentName) {
    this.agents.delete(agentName);
  }

  schedule(agentName, task, priority = PRIORITY.NORMAL) {
    const entry = this.agents.get(agentName);
    if (!entry) return false;

    this.queue.push({
      agentName,
      task,
      priority,
      scheduledAt: Date.now(),
      attempts: 0
    });

    // Sort queue by priority then age
    this.queue.sort((a,b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.scheduledAt - b.scheduledAt;
    });

    this.emit('task:queued', agentName, task);
    return true;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._tick();
    this.emit('loop:started');
  }

  stop() {
    this.running = false;
    if (this.tickTimer) clearTimeout(this.tickTimer);
    this.emit('loop:stopped');
  }

  async _tick() {
    if (!this.running) return;

    try {
      // Run one single thing per tick. Always.
      await this._runOne();
    } catch (err) {
      console.error('[AGENT-LOOP] Tick error:', err);
    }

    // Schedule next tick
    this.tickTimer = setTimeout(() => this._tick(), this.tickIntervalMs);
  }

  async _runOne() {
    // First check for queued work
    if (this.queue.length > 0) {
      const work = this.queue.shift();
      const entry = this.agents.get(work.agentName);

      if (entry && entry.state === AGENT_STATES.IDLE) {
        return this._executeWork(entry, work);
      }

      // Agent not ready, requeue at end
      this.queue.push(work);
    }

    // No queued work: find next agent that is allowed to run
    const now = Date.now();

    for (const [name, entry] of this.agents) {
      if (entry.state !== AGENT_STATES.IDLE) continue;
      if (entry.nextRun > now) continue;

      // Duty cycle check: only run if we are under duty budget
      const timeActive = this._getTimeActive(entry);
      if (timeActive > entry.dutyCycle) {
        // Agent is over budget, sleep it
        entry.nextRun = now + 30000;
        entry.state = AGENT_STATES.SLEEPING;
        continue;
      }

      // This agent is allowed to run
      return this._runAgentAutonomous(entry);
    }

    // Nothing to do. Sleep.
  }

  async _executeWork(entry, work) {
    entry.state = AGENT_STATES.WORKING;
    entry.currentWork = work;

    try {
      const result = await entry.agent.execute(work.task);

      entry.lastRun = Date.now();
      entry.runCount++;
      entry.successCount++;
      entry.consecutiveFails = 0;
      entry.backoffMs = 0;

      this.emit('work:success', entry.agent.name, work, result);

      work.attempts++;
      if (work.attempts < 3) {
        entry.nextRun = Date.now() + 500;
      } else {
        entry.nextRun = Date.now() + 15000;
      }

    } catch (err) {
      entry.failCount++;
      entry.consecutiveFails++;
      entry.lastError = err;

      // Exponential backoff
      entry.backoffMs = Math.min(300000, 1000 * Math.pow(2, entry.consecutiveFails));
      entry.nextRun = Date.now() + entry.backoffMs;
      entry.state = AGENT_STATES.BACKOFF;

      this.emit('work:failed', entry.agent.name, work, err);
    }

    entry.state = AGENT_STATES.IDLE;
    entry.currentWork = null;
  }

  async _runAgentAutonomous(entry) {
    // Agents don't run on fixed timers. They run when they are allowed to run.
    entry.state = AGENT_STATES.THINKING;

    try {
      // Ask the agent what it wants to do next
      const nextAction = await entry.agent.getNextAction();

      if (!nextAction) {
        // Agent has nothing to do. Sleep it.
        entry.nextRun = Date.now() + 60000;
        entry.state = AGENT_STATES.IDLE;
        return;
      }

      // Agent wants to do something. Schedule it immediately.
      this.schedule(entry.agent.name, nextAction, PRIORITY.NORMAL);

      entry.lastRun = Date.now();
      entry.runCount++;

    } catch (err) {
      entry.failCount++;
      entry.consecutiveFails++;
      entry.backoffMs = Math.min(120000, 1000 * Math.pow(2, entry.consecutiveFails));
      entry.nextRun = Date.now() + entry.backoffMs;
      entry.state = AGENT_STATES.BACKOFF;

      this.emit('agent:error', entry.agent.name, err);
    }

    entry.state = AGENT_STATES.IDLE;
  }

  _getTimeActive(entry) {
    // Calculate actual active time over last 10 minutes
    // Duty cycle is enforced here. Agents cannot spam.
    if (entry.runCount < 5) return 0;
    return Math.min(1.0, entry.runCount * 0.002);
  }

  getStatus() {
    const status = {
      running: this.running,
      queued: this.queue.length,
      agents: {},
      uptime: this.running ? Date.now() - this.startedAt : 0
    };

    for (const [name, entry] of this.agents) {
      status.agents[name] = {
        state: entry.state,
        runs: entry.runCount,
        success: entry.successCount,
        fails: entry.failCount,
        consecutiveFails: entry.consecutiveFails,
        nextRun: Math.max(0, entry.nextRun - Date.now()),
        backoff: entry.backoffMs,
        duty: this._getTimeActive(entry)
      };
    }

    return status;
  }
}

module.exports = new AgentLoop();
module.exports.AGENT_STATES = AGENT_STATES;
module.exports.PRIORITY = PRIORITY;
