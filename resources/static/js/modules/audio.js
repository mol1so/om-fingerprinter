export async function getAudio() {
    // Sum (Hash) of Audio Samples
    function calculateAudioSum(samples) {
        let sum = 0
        for (let i = 0; i < samples.length; ++i) {
            sum += Math.abs(samples[i])
        }
        return sum
    }

    // Setup
    const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const context = new AudioContext(1, 5000, 44100);

    // Create Oscillator
    const oscillator = context.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.value = 1000;

    // Apply Dynamics Compressor
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -40;
    compressor.knee.value = 30;
    compressor.ratio.value = 20;
    compressor.attack.value = 0.005;
    compressor.release.value = 0.22;

    // Connect Nodes
    oscillator.connect(compressor);
    compressor.connect(context.destination);

    // Render
    oscillator.start();
    const buffer = await context.startRendering();
    const samples = buffer.getChannelData(0);

    // Return
    return calculateAudioSum(samples);
}