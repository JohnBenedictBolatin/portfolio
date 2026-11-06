import type { MascotState } from 'wobnimo';

// One client-side activity store keeps the persistent companion in sync with every Link.
const listeners = new Set<() => void>();
const pendingLinks = new Set<string>();
let snapshot: MascotState = 'idle';
let resting: MascotState = 'idle';
let feedback: MascotState | null = null;
let taskPending = false;
let routeFailed = false;
let feedbackTimer: ReturnType<typeof setTimeout> | undefined;

function publish() {
  const next: MascotState = routeFailed
    ? 'error'
    : pendingLinks.size || taskPending
      ? 'thinking'
      : (feedback ?? resting);
  if (snapshot === next) return;
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function clearFeedback() {
  clearTimeout(feedbackTimer);
  feedback = null;
}

function react(state: MascotState, duration = 2200) {
  clearFeedback();
  feedback = state;
  feedbackTimer = setTimeout(() => {
    feedback = null;
    publish();
  }, duration);
  publish();
}

export const mascotActivity = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => snapshot,
  getServerSnapshot: (): MascotState => 'idle',
  navigation(id: string, pending: boolean) {
    if (pendingLinks.has(id) === pending) return;
    if (pending) {
      pendingLinks.add(id);
      clearFeedback();
    } else {
      pendingLinks.delete(id);
    }
    publish();
  },
  navigated() {
    react('celebrating');
  },
  beginTask() {
    taskPending = true;
    clearFeedback();
    publish();
  },
  finishTask(success: boolean) {
    taskPending = false;
    react(success ? 'celebrating' : 'error', success ? 2200 : 4000);
  },
  routeError(failed: boolean) {
    routeFailed = failed;
    publish();
  },
  rest(state: 'idle' | 'listening' | 'sleeping') {
    resting = state;
    publish();
  },
  idleEmote(state: 'surprised' | 'listening' | 'thinking') {
    if (routeFailed || pendingLinks.size || taskPending || feedback || resting !== 'idle') return;
    react(state, 1800);
  },
  wake() {
    if (resting === 'sleeping') {
      resting = 'idle';
      publish();
    }
  },
};
