(function () {

  var errorCallback = function (e) { console.log(e); };

  var width = $('#video-container').width();
  var aspect = 1280/720;
  var height = width / aspect;
  $('video').height(height);
  $('video').width(width);
  
  var video = document.querySelector('video');
  var constraints = {
    video:{
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      }
    }
  }

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia(constraints, function (stream) {
      video.src = window.URL.createObjectURL(stream);
    }, errorCallback);
  }
    
})();    