'use client';

import { useEffect } from 'react';

const clickableSelector = [
  'a[href]',
  'button',
  '[role="button"]',
  'summary',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
].join(',');

const soundSettings = {
  hover: {
    noiseDuration: 0.018,
    duration: 0.028,
    filterStart: 6500,
    filterEnd: 2500,
    noiseVolume: 0.08,
    pitchStart: 1800,
    pitchEnd: 1200,
    toneVolume: 0.022,
    wave: 'sine',
  },
  click: {
    noiseDuration: 0.032,
    duration: 0.065,
    filterStart: 3600,
    filterEnd: 950,
    noiseVolume: 0.14,
    pitchStart: 640,
    pitchEnd: 260,
    toneVolume: 0.075,
    wave: 'triangle',
  },
} as const;

type SoundKind = keyof typeof soundSettings;

function findControl(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) return null;

  const candidate = target.closest(`${clickableSelector},label`);
  const control = candidate instanceof HTMLLabelElement ? candidate.control : candidate;

  if (
    !control?.matches(clickableSelector) ||
    control.matches(':disabled') ||
    control.closest('[aria-disabled="true"], [inert]')
  ) {
    return null;
  }

  return control;
}

function createNoiseBuffer(context: BaseAudioContext) {
  const noiseBuffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * 0.08),
    context.sampleRate,
  );
  const noiseSamples = noiseBuffer.getChannelData(0);

  for (let index = 0; index < noiseSamples.length; index += 1) {
    noiseSamples[index] = Math.random() * 2 - 1;
  }

  return noiseBuffer;
}

function playFeedback(context: BaseAudioContext, noiseBuffer: AudioBuffer, kind: SoundKind) {
  const settings = soundSettings[kind];
  const now = context.currentTime + 0.002;
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  noise.buffer = noiseBuffer;
  filter.type = 'lowpass';
  filter.Q.value = 0.7;
  filter.frequency.setValueAtTime(settings.filterStart, now);
  filter.frequency.exponentialRampToValueAtTime(settings.filterEnd, now + settings.noiseDuration);
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.linearRampToValueAtTime(settings.noiseVolume, now + 0.001);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + settings.noiseDuration);
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(context.destination);
  noise.onended = () => {
    noise.disconnect();
    filter.disconnect();
    noiseGain.disconnect();
  };
  noise.start(now);
  noise.stop(now + settings.noiseDuration + 0.002);

  const tone = context.createOscillator();
  const toneGain = context.createGain();
  tone.type = settings.wave;
  tone.frequency.setValueAtTime(settings.pitchStart, now);
  tone.frequency.exponentialRampToValueAtTime(settings.pitchEnd, now + settings.duration);
  toneGain.gain.setValueAtTime(0.0001, now);
  toneGain.gain.linearRampToValueAtTime(settings.toneVolume, now + 0.002);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration);
  tone.connect(toneGain);
  toneGain.connect(context.destination);
  tone.onended = () => {
    tone.disconnect();
    toneGain.disconnect();
  };
  tone.start(now);
  tone.stop(now + settings.duration + 0.002);
}

export function ClickSounds() {
  useEffect(() => {
    if (!window.AudioContext) return;

    let context: AudioContext | null = null;
    let noiseBuffer: AudioBuffer | null = null;
    let mounted = true;

    function unlockAudio() {
      try {
        context ??= new window.AudioContext({ latencyHint: 'interactive' });
        noiseBuffer ??= createNoiseBuffer(context);
        if (context.state === 'suspended') {
          void context.resume().catch(() => undefined);
        }
      } catch {
        // Sound feedback is optional when audio is unavailable or blocked.
      }
    }

    function play(kind: SoundKind) {
      if (!mounted || context?.state !== 'running' || !noiseBuffer) return;

      try {
        playFeedback(context, noiseBuffer, kind);
      } catch {
        // Audio failures must not interrupt a control's normal behavior.
      }
    }

    function handleUnlock(event: Event) {
      if (!event.isTrusted) return;
      if (event instanceof PointerEvent && event.button !== 0) return;
      unlockAudio();
    }

    function handlePointerOver(event: PointerEvent) {
      if (!event.isTrusted || event.pointerType === 'touch' || event.buttons !== 0) return;
      const control = findControl(event.target);

      // Moving between a button's text and icon should produce just one tick.
      if (!control || control === findControl(event.relatedTarget)) return;
      play('hover');
    }

    function handleClick(event: MouseEvent) {
      if (!event.isTrusted || event.button !== 0) return;
      const control = findControl(event.target);
      if (!control) return;

      // A label forwards a second click to its input; sound only that input click.
      if (control instanceof HTMLInputElement && control !== event.target) return;

      unlockAudio();
      if (context?.state === 'running') {
        play('click');
      } else if (context) {
        const clickedAt = performance.now();
        void context
          .resume()
          .then(() => {
            // Do not replay stale clicks if the browser unlocks audio much later.
            if (performance.now() - clickedAt < 200) play('click');
          })
          .catch(() => undefined);
      }
    }

    document.addEventListener('pointerdown', handleUnlock, true);
    document.addEventListener('pointerup', handleUnlock, true);
    document.addEventListener('keydown', handleUnlock, true);
    document.addEventListener('pointerover', handlePointerOver, true);
    document.addEventListener('click', handleClick, true);
    return () => {
      mounted = false;
      document.removeEventListener('pointerdown', handleUnlock, true);
      document.removeEventListener('pointerup', handleUnlock, true);
      document.removeEventListener('keydown', handleUnlock, true);
      document.removeEventListener('pointerover', handlePointerOver, true);
      document.removeEventListener('click', handleClick, true);
      if (context) void context.close().catch(() => undefined);
    };
  }, []);

  return null;
}
