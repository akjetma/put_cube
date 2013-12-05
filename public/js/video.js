(function () {

  var inputCanvas = document.createElement('canvas');
  var inputContext = inputCanvas.getContext('2d');
  var outputCanvas = document.getElementById('output');
  var outputContext = outputCanvas.getContext('2d');
  var video = document.getElementById('video');
  var constraints = { video: true };
  var width;
  var height;
  var outputImageData;
  var pixelIndices = [];

  ImageData.prototype.toInverted = function () {
    var pixels = this.data;

    for (var i=0; i<pixels.length / 4; i++) {
      var p = i * 4;
      pixels[p] = 255 - pixels[p];
      pixels[p+1] = 255 - pixels[p+1];
      pixels[p+2] = 255 - pixels[p+2];
    }
  };

  ImageData.prototype.toBW = function () {
    var pixels = this.data;

    for (var i=0; i<pixels.length / 4; i++) {
      var p = i * 4;
      var intensity = Math.floor((pixels[p] + pixels[p+1] + pixels[p+2]) / 3);
      pixels[p] = intensity;
      pixels[p+1] = intensity;
      pixels[p+2] = intensity;
    }
  };

  ImageData.prototype.shiftChannels = function () {
    var pixels = this.data;

    for (var i=0; i<pixels.length / 4; i++) {
      var p = i * 4;
      pixels[p] = pixels[p+1];
      pixels[p+1] = pixels[p+2];
      pixels[p+2] = pixels[p];
    }
  }
 
  ImageData.prototype.toChannelIntensity = function (channel) {
    var pixels = this.data;
    var ci = this.channelIndex[channel];

    for (var i=0; i<pixels.length / 4; i++) {
      var p = i * 4;
      var cVal = pixels[p+ci];
      pixels[p] = cVal;
      pixels[p+1] = cVal;
      pixels[p+2] = cVal;
    }
  };

  ImageData.prototype.channelIndex = {
    'r': 0,
    'R': 0,
    'red': 0,
    'g': 1,
    'G': 1,
    'green': 1,
    'b': 2,
    'B': 2,
    'blue': 2
  };

  function initializeCanvases () {
    inputContext.drawImage(video, 0, 0);
    outputImageData = inputContext.getImageData(0, 0, width, height);

    var numPix = width * height;
    var bufferLength = numPix / 4;
    pixelIndices = [0, 1*bufferLength, 2*bufferLength, 3*bufferLength];
  };

  function draw () {
    inputContext.drawImage(video, 0, 0);
    drawScanner();

    setTimeout(function () {
      draw(); 
    }, 1000/60);
  };

  function drawScanner () {
    var inputPixels = inputContext.getImageData(0, 0, width, height).data;
    var outputPixels = outputImageData.data;
    
    for (var i=0; i<pixelIndices.length; i++) {
      pi = pixelIndices[i];
      for (var j=pi; j<pi+width; j++) {
        var p = j * 4;

        outputPixels[p] = inputPixels[p];
        outputPixels[p+1] = inputPixels[p+1];
        outputPixels[p+2] = inputPixels[p+2];
      }
      pixelIndices[i] = (pi + width < width * height) ? pi + width : 0;
    }
    outputContext.putImageData(outputImageData, 0, 0);
  };

  function errorCallback (e) { 
    console.log(e); 
  };

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia(constraints, function (stream) {
      video.src = window.URL.createObjectURL(stream);
    }, errorCallback);
  }

  video.addEventListener('canplay', function (e) {
    width = video.videoWidth;
    height = video.videoHeight;
    
    inputCanvas.width = width;
    outputCanvas.width = width;
    inputCanvas.height = height;
    outputCanvas.height = height;

    initializeCanvases();
    draw();
  }, false);

})();