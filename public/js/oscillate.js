$(document).ready(function () {

  var context;
  init();

  function init() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      offsetTime = context.currentTime;
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    var height = $('#keys').height();
    $('#visualization-container').height(height);
    $('.btn').on('click', function () {
      var frequency = $(this).data('frequency');
      var duration = $(this).data('duration');
      sequence(frequency, duration, 4, 10);
    });
  }

  function sequence (frequency, duration, period, count) {
    var startTime = context.currentTime
    for (var i=0; i<count; i++) {
      new Note(frequency, duration, startTime);
      startTime = startTime + period;
    }
  }

  var Note = function (frequency, duration, startTime) {
    this.oscillator = context.createOscillator();
    this.oscillator.frequency.value = frequency;
    this.oscillator.connect(context.destination);
    this.oscillator.start(startTime);
    this.oscillator.stop(startTime + duration);
  };

});