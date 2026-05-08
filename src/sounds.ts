let ctx: AudioContext | null = null;

const initCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      ctx = new AudioCtx();
    }
  }
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
};

export const playClick = () => {
  try {
    const context = initCtx();
    if (!context) return;
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    osc.connect(gain);
    gain.connect(context.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, context.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.05);
    
    osc.start(context.currentTime);
    osc.stop(context.currentTime + 0.05);
  } catch(e) {}
};

export const playPop = () => {
  try {
    const context = initCtx();
    if (!context) return;
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    osc.connect(gain);
    gain.connect(context.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, context.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.05, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
    
    osc.start(context.currentTime);
    osc.stop(context.currentTime + 0.08);
  } catch(e) {}
};

export const playChime = () => {
  try {
    const context = initCtx();
    if (!context) return;
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    osc.connect(gain);
    gain.connect(context.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, context.currentTime);
    osc.frequency.linearRampToValueAtTime(1200, context.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.8);
    
    osc.start(context.currentTime);
    osc.stop(context.currentTime + 0.8);
  } catch(e) {}
};
