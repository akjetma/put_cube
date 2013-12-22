(function () {

  var context;
  var scales = {
    c_major: [
      freq(40),
      freq(42),
      freq(44),
      freq(45),
      freq(47),
      freq(49),
      freq(51),
      freq(52)
    ]
  };

  init();

  function init() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    var height = $('#keys').height();
    $('#visualization-container').height(height);
    $('.btn').on('click', function () {
      var frequency = $(this).data('frequency');
      var duration = $(this).data('duration');
      var startTime = context.currentTime;
      sequence(frequency, duration, 4, 10, startTime);
    });

    $('#sequence').on('click', function () {
      var startTime = context.currentTime;
      for (var i=0; i<scales.c_major.length; i++) {
        var frequency = scales.c_major[i];
        sequence(frequency, 1/16, 1, 2, startTime);
        startTime = startTime + 1/16;
      }
    });
  }

  function freq (key_index) {
    return 440 * Math.pow(2, (key_index - 49) / 12.0)
  }

  function sequence (frequency, duration, period, count, startTime) {
    var offset = startTime;
    for (var i=0; i<count; i++) {
      new Note(frequency, duration, offset);
      offset = offset + period;
    }
  }

  var Note = function (frequency, duration, startTime) {
    this.oscillator = context.createOscillator();
    this.oscillator.frequency.value = frequency;
    this.oscillator.connect(context.destination);
    this.oscillator.start(startTime);
    this.oscillator.stop(startTime + duration);
  };

})();