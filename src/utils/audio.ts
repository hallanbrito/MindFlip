/**
 * Web Audio API synthesizer for MindFlip.
 * Generates tactile feedback tones, clicks, whooshes, and the Shepard Tone illusion.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function getSoundEnabled(): boolean {
  return soundEnabled;
}

/**
 * Gentle click tone for buttons and options
 */
export function playClickTone() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

/**
 * Shimmering dual-tone chord when perception flips / challenge completes
 */
export function playSuccessTone() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

    const startTime = ctx.currentTime + idx * 0.06;
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.45);
  });
}

/**
 * Sweep whoosh for the "Mind Flip" moment
 */
export function playFlipWhoosh() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.22);
}

/**
 * Soft tick for fixation countdowns
 */
export function playCountdownTick(isFinal = false) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = isFinal ? 'triangle' : 'sine';
  osc.frequency.setValueAtTime(isFinal ? 880 : 587.33, ctx.currentTime);

  gain.gain.setValueAtTime(isFinal ? 0.15 : 0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isFinal ? 0.2 : 0.06));

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + (isFinal ? 0.22 : 0.07));
}

// Shepard Tone generator (acoustic pitch illusion)
let shepardOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
let shepardInterval: number | null = null;

export function startShepardTone(): boolean {
  if (!soundEnabled) return false;
  const ctx = getAudioContext();
  if (!ctx) return false;

  stopShepardTone();

  const octaves = 6;
  const baseFreq = 55; // A1
  let currentPitchOffset = 0;

  shepardOscs = [];

  for (let i = 0; i < octaves; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    gain.gain.value = 0.02;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    shepardOscs.push({ osc, gain });
  }

  shepardInterval = window.setInterval(() => {
    if (!ctx) return;
    currentPitchOffset = (currentPitchOffset + 0.008) % 1;

    shepardOscs.forEach((item, index) => {
      const p = (index + currentPitchOffset) % octaves;
      const freq = baseFreq * Math.pow(2, p);
      item.osc.frequency.setValueAtTime(freq, ctx.currentTime + 0.05);

      // Gaussian envelope so highest and lowest octaves fade into silence
      const x = (p - octaves / 2) / (octaves / 2);
      const amp = Math.exp(-3 * x * x) * 0.08;
      item.gain.gain.setValueAtTime(amp, ctx.currentTime + 0.05);
    });
  }, 50);

  return true;
}

export function stopShepardTone() {
  if (shepardInterval) {
    clearInterval(shepardInterval);
    shepardInterval = null;
  }
  shepardOscs.forEach((item) => {
    try {
      item.osc.stop();
      item.osc.disconnect();
      item.gain.disconnect();
    } catch {}
  });
  shepardOscs = [];
}
