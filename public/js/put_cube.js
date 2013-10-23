var camera, scene, renderer;
var cubeGeo, cubeMat;
var controls, time = Date.now();
var ws, ray, objects = [];

// Begin PointerLock Stuff
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {
    var element = document.body;
    
    var pointerlockchange = function(event) {
        
        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
            controls.enabled = true;
            blocker.style.display = 'none';
        } else {
            controls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
        }

    };

    var pointerlockerror = function(event) { instructions.style.display = ''; };

    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

    instructions.addEventListener( 'click', function(event) {
        
        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if ( /Firefox/i.test(navigator.userAgent) ) {
            
            var fullscreenchange = function (event) {
                if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
                    document.removeEventListener( 'fullscreenchange', fullscreenchange );
                    document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
                    element.requestPointerLock();
                }
            };

            document.addEventListener( 'fullscreenchange', fullscreenchange, false );
            document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
            element.requestFullscreen();

        } else { 
            element.requestPointerLock(); 
        }

    }, false );

} else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}
// End PointerLock Stuff

init();
animate();

function init() {
    
    ws = new WebSocket( 'ws://' + window.location.host + window.location.pathname );
    ws.onmessage = function(msg) { 

        var coordinates = JSON.parse(msg.data);
        
        var vector = new THREE.Vector3( coordinates.x, coordinates.y, coordinates.z );
        addCube( vector );

    };

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    scene = new THREE.Scene();

    cubeGeo = new THREE.CubeGeometry( 20, 20, 20 );
    cubeMat = new THREE.MeshPhongMaterial( { color: 0xFF0000, opacity: 0.5, transparent: true } );

    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( -1, - 0.5, -1 );
    scene.add( light );

    controls = new THREE.PointerLockControls( camera );
    scene.add( controls.getObject() );

    ray = new THREE.Raycaster();
    ray.ray.direction.set( 0, -1, 0 );

    var floorGeo = new THREE.PlaneGeometry( 2000, 2000, 20, 20 );
    floorGeo.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    var floorMat = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
    var floor = new THREE.Mesh( floorGeo, floorMat );
    scene.add( floor );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    controls.isOnObject( false );
    ray.ray.origin.copy( controls.getObject().position );
    
    var intersections = ray.intersectObjects( objects );
    if ( intersections.length > 0 ) {
        var distance = intersections[ 0 ].distance;
        if ( distance > 0 && distance < 10 ) {
            controls.isOnObject( true );
        }
    }

    controls.update( Date.now() - time );
    renderer.render( scene, camera );
    time = Date.now();

}

function addCube( v ) {

    var cube = new THREE.Mesh( cubeGeo, cubeMat );
    cube.position.copy( v );
    objects.push( cube );
    scene.add( cube );

}