var camera, scene, renderer;
var controls, time = Date.now();
var ws, ray, objects = [];

var element = document.getElementById('put-cube-container');
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {

  var pointerlockchange = function (event) {        
    
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      controls.enabled = true;
    } else {
      controls.enabled = false;
    }
  };

  var pointerlockerror = function (event) { console.log('pointerlockerr', event) };

  document.addEventListener('pointerlockchange', pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
  document.addEventListener('pointerlockerror', pointerlockerror, false);
  document.addEventListener('mozpointerlockerror', pointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

  element.addEventListener('click', function (event) {
    
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    element.requestPointerLock();
  }, false);
}


init();
animate();

function init() {

  var aspect = 2.39;  
  camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
  scene = new THREE.Scene();

  var light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  var light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(1, 1, 1);
  scene.add(light);

  var light = new THREE.DirectionalLight(0xffffff, 0.75);
  light.position.set(-1, - 0.5, -1);
  scene.add(light);

  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());

  ray = new THREE.Raycaster();
  ray.ray.direction.set(0, -1, 0);

  var floor_geo = new THREE.PlaneGeometry(2000, 2000, 20, 20);
  floor_geo.applyMatrix( new THREE.Matrix4().makeRotationX(-Math.PI / 2) );
  var floor_mat = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
  var floor = new THREE.Mesh(floor_geo, floor_mat);
  scene.add(floor);

  var width = $('#put-cube-container').width();
  var height = width / aspect;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
  ws.onmessage = function(msg) { 
    var coordinates = JSON.parse(msg.data);
    var vector = new THREE.Vector3(coordinates.x, coordinates.y, coordinates.z);
    addCube(vector);
  };

  document.getElementById('put-cube-container').appendChild(renderer.domElement);
}

function animate() {

  requestAnimationFrame(animate);

  controls.isOnObject(false);
  ray.ray.origin.copy(controls.getObject().position);
  
  var intersections = ray.intersectObjects(objects);
  if (intersections.length > 0) {

    var distance = intersections[0].distance;
    if (distance > 0 && distance < 10) controls.isOnObject(true);
  }

  controls.update(Date.now() - time);
  renderer.render(scene, camera);
  time = Date.now();
}

function addCube(vector) {
  
  var geo = new THREE.CubeGeometry(20, 20, 20);
  var mat = new THREE.MeshPhongMaterial({ color: 0xFF0000, opacity: 0.5, transparent: true });
  var cube = new THREE.Mesh(geo, mat);
  
  cube.position.copy(vector);
  objects.push(cube);
  scene.add(cube);
}