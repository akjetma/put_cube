(function () {

  var errorCallback = function(e) {
    $('.help-block').html("no video for you.");
    console.log(e);
  };

  var constraints = {
    video: true,
    audio: true
  };

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var video = document.querySelector('video');

  if (navigator.getUserMedia) {
    navigator.getUserMedia(constraints, function(stream) {
      video.src = window.URL.createObjectURL(stream);
    }, errorCallback);
  } else {
    video.src = 'somevideo.webm'; // fallback.
  }
  
})();