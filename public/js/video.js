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
  var currentPixelIndex;

  function initializeCanvases () {

  };

  function draw () {
    inputContext.drawImage(video, 0, 0);
    drawScanner();

    setTimeout(function () {
      draw(); 
    }, 1000/60);
  };

  function drawScanner (startPixelIndex) {
    var inputPixels = inputContext.getImageData(0, 0, width, height).data;
    var outputPixels = outputImageData.data;
    var nextPixelIndex = currentPixelIndex + width + 1;
    
    for (var i=currentPixelIndex; i<nextPixelIndex; i++) {
      var p = i * 4;
      outputPixels[p] = inputPixels[p];
      outputPixels[p+1] = inputPixels[p+1];
      outputPixels[p+2] = inputPixels[p+2];
    }
    outputContext.putImageData(outputImageData, 0, 0);
    currentPixelIndex = (nextPixelIndex < width * height) ? nextPixelIndex : 0;
  };

  function drawInverted () {
    var imageData = inputContext.getImageData(0, 0, width, height);
    var pixels = imageData.data;

    for (var i=0; i<width * height; i++) {
      var p = i * 4;
      pixels[p] = 255 - pixels[p];
      pixels[p+1] = 255 - pixels[p+1];
      pixels[p+2] = 255 - pixels[p+2];
    }
    outputContext.putImageData(imageData, 0, 0);
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

    inputContext.drawImage(video, 0, 0);
    outputImageData = inputContext.getImageData(0, 0, width, height);
    draw();
  }, false);

})();