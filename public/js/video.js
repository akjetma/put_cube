
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var video = document.getElementById('video');
  var constraints = { video: true };
  var width, 
      height,
      pixelCount;
  
  function errorCallback (e) { console.log(e); };
  function draw (v, c) {
    c.drawImage(v, 0, 0);
    var imageData = c.getImageData(0, 0, width, height);
    var pixels = imageData.data;

    for (var i=0; i<pixelCount; i++) {
      var p = i * 4;
      pixels[p] = 255 - pixels[p];
      pixels[p+1] = 255 - pixels[p+1];
      pixels[p+2] = 255 - pixels[p+2];
    }
    c.putImageData(imageData, 0, 0);  

    setTimeout(function () { draw(v, c); }, 20);
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
    pixelCount = width * height;
    canvas.width = width;
    canvas.height = height;
    draw(video, context);
  }, false);

