(function () {

  var canvas = document.getElementById('canvas');
  var audio_ctx, canvas_ctx;
  var width, height;

  init();

  function init () {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audio_ctx = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
    try { 
      canvas_ctx = canvas.getContext("2d");
    }
    catch(e) {
      alert('HTML5 Canvas is not supported in this browser');
    }

    width = $('#canvas').parent().width();
    height = width / 3.2;
    canvas.width = width;
    canvas.height = height;
    setTimeout(drawKeyboard, 1000);
  }

  function drawKeyboard () {
    var timeout = 50;
    var offset_width = (width - 4) / 22;
    var x_offset = 2;

    for (var i=0; i<37; i++) {
      var key_index = i + 27;
      if ([0, 2, 3, 5, 7, 8, 10].indexOf(key_index % 12) > -1) {
        setTimeout(drawKey, timeout, x_offset, key_index, "white");
        x_offset = x_offset + offset_width;
      } else {
        setTimeout(drawKey, timeout, x_offset, key_index, "black");
      }
      timeout = timeout + 50;
    }
  }

  function drawKey (x_offset, key_index, color) {
    var key_width = (width - 4) / 22;
    var key_height = height - 4;

    if (color === "white") {
      canvas_ctx.strokeStyle = "#000000";
      canvas_ctx.lineWidth = 4;
      canvas_ctx.strokeRect(x_offset, 2, key_width, key_height);
    } else {
      key_width = key_width / 2;
      key_height = key_height / 1.5;
      canvas_ctx.fillStyle = "#000000";
      canvas_ctx.fillRect(x_offset-key_width/2, 0, key_width, key_height);
    }
    new Note(key_index, 0.05, audio_ctx.currentTime);
  }

  function frequencyAtIndex (key_index) {
    return 440 * Math.pow(2, (key_index - 48) / 12.0)
  }

  var Note = function (key_index, duration, startTime) {
    this.oscillator = audio_ctx.createOscillator();
    this.oscillator.type = "square";
    this.oscillator.frequency.value = frequencyAtIndex(key_index);
    this.oscillator.connect(audio_ctx.destination);
    this.oscillator.start(startTime);
    this.oscillator.stop(startTime + duration);
  };

  function keyProperties (key_index) {
    var keys = [
      { name: "A",  color: "#ffffff" },
      { name: "A#", color: "#000000" },
      { name: "B",  color: "#ffffff" },
      { name: "C",  color: "#ffffff" },
      { name: "C#", color: "#000000" },
      { name: "D",  color: "#ffffff" },
      { name: "D#", color: "#000000" },
      { name: "E",  color: "#ffffff" },
      { name: "F",  color: "#ffffff" },
      { name: "F#", color: "#000000" },
      { name: "G",  color: "#ffffff" },
      { name: "G#", color: "#000000" }
    ];

    var key = keys[key_index % 12];
    key.frequency = frequencyAtIndex(key_index);
    return key;
  }
  
})();