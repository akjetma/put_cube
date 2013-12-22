
  var context;
  init();

  function freq (key_index) {
    return 440 * Math.pow(2, (key_index - 49) / 12.0)
  }

  function init() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    var height = $('#keys').height();
    $('#visualization-container').height(height - 30);
    $('.btn').on('click', function () {
      var frequency = $(this).data('frequency');
      var duration = $(this).data('duration');
      var startTime = context.currentTime;
      sequence(frequency, duration, 4, 10, startTime);
    });

    $('#sequence').on('click', function () {
      var startTime = context.currentTime;
      for (var i=0; i<12; i++) {
        var frequency = freq(40 + i);
        sequence(frequency, 1/8, (i+1)/8, 10, startTime);
        startTime = startTime + 1;
      }
    });
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

