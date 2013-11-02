var context;
var oscillator;
var amplifier;
window.addEventListener('load', init, false);

function init() {
  
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    
    oscillator = context.createOscillator();
    oscillator.type = oscillator.SINE;
    oscillator.frequency.value = this.frequency;
    oscillator.start(0);

    amplifier = context.createGain();
    amplifier.gain.value = 0;

    oscillator.connect(amplifier);
    amplifier.connect(context.destination);

  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

}

$('.btn').on('mousedown', function () {

  oscillator.frequency.value = $(this).data('frequency');
  amplifier.gain.value = 1;

});

$('.btn').on('mouseup', function () {

  amplifier.gain.value = 0;

});