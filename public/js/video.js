(function () {
  
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  var video = document.querySelector('video');
  var constraints = { video: true };
  var errorCallback = function (e) { console.log(e); };
  var draw = function (v, c) {
    c.drawImage(v, 0, 0);
    setTimeout(function () { draw(v, c); }, 20);
  };

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia(constraints, function (stream) {
      video.src = window.URL.createObjectURL(stream);
    }, errorCallback);
  }

  video.addEventListener('canplay', function (e) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    draw(video, context);
  }, false);

})();