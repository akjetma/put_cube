$(document).ready(function () {

  var context;
  var active_voices = {};

  init();

  function init() {
    
    var height = $('#keys').height();
    $('#visualization-container').height(height);

    $('.btn').on('click', function () {
      var note = $(this).text();

      if (active_voices[note]) {
        active_voices[note].stop();
        delete active_voices[note];
      } else {
        var frequency = $(this).data('frequency');
        var voice = new Voice(frequency);
        active_voices[note] = voice;
        voice.start();
      }
    });

    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
  };

  var Voice = (function(context) {
    
    function Voice (frequency) {
      this.frequency = frequency;
      this.oscillators = [];
    };

    Voice.prototype.start = function() {
      /* oscillator */
      var oscillator = context.createOscillator();
      oscillator.type = oscillator.SINE;
      oscillator.frequency.value = this.frequency;

      /* amplifier */
      var amplifier = context.createGain();
      amplifier.gain.value = 0.3;

      /* connections */
      oscillator.connect(amplifier);
      amplifier.connect(context.destination);

      oscillator.start(0);
      this.oscillators.push( oscillator );
    };

    Voice.prototype.stop = function() {
      this.oscillators.forEach( function(oscillator, _) {
        oscillator.stop(0);
      });
    };

    return Voice;
  }(context));

});