(function () {
  
  var context;
  var scales = {
    c_major: [freq(40), freq(42), freq(44), freq(45), freq(47), freq(49), freq(51)],
    c_s_major: [freq(29), freq(31), freq(34), freq(36), freq(38), freq(41), freq(43), freq(46), freq(48), freq(50), freq(53), freq(55), freq(58), freq(60), freq(62)]
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

    $('.note').on('click', function () {
      var frequency = parseFloat($(this).data('frequency'));
      var duration = parseFloat($(this).data('duration'));
      var startTime = context.currentTime;
      new Note(frequency, duration, startTime);
    });

    $('#sequence').on('click', function () {
      var startTime = context.currentTime;
      var keys = scales.c_s_major;
      for (var i=0; i<keys.length; i++) {
        for(var j=0; j<keys.length; j++) {
          new Note(keys[j], 1/4, startTime);
          startTime = startTime + 1/4;
        }
        sequence(keys[i], 1/4, 1/4, 8, startTime, i);
        startTime = startTime + 1/4;
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
    this.oscillator.type = "square";
    this.oscillator.frequency.value = frequency;
    this.oscillator.connect(context.destination);
    this.oscillator.start(startTime);
    this.oscillator.stop(startTime + duration);
  };

})();