import * as THREE from '../build/three.module.js';

import { GUI } from './jsm/libs/dat.gui.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

var controls, camera, scene, renderer;
var cameraCube, sceneCube;
var textureEquirec, textureCube;
var cubeMesh, sphereMesh;
var sphereMaterial;

init();
animate();

function init() {

    // CAMERAS

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.set( 0, 0, 1000 );
    cameraCube = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );

    // SCENE

    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();

    // Lights

    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    // Textures

    var r = 'textures/cube/Bridge2/';
    var urls = [ r + 'posx.jpg', r + 'negx.jpg',
                    r + 'posy.jpg', r + 'negy.jpg',
                    r + 'posz.jpg', r + 'negz.jpg' ];

    textureCube = new THREE.CubeTextureLoader().load( urls );
    textureCube.encoding = THREE.sRGBEncoding;

    var textureLoader = new THREE.TextureLoader();

    textureEquirec = textureLoader.load( 'textures/2294472375_24a3b8ef46_o.jpg' );
    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
    textureEquirec.encoding = THREE.sRGBEncoding;

    // Materials

    var equirectShader = THREE.ShaderLib[ 'equirect' ];

    var equirectMaterial = new THREE.ShaderMaterial( {
        uniforms: THREE.UniformsUtils.clone( equirectShader.uniforms ),
        fragmentShader: equirectShader.fragmentShader,
        vertexShader: equirectShader.vertexShader,
        depthWrite: false,
        side: THREE.BackSide
    } );

    equirectMaterial.uniforms[ 'tEquirect' ].value = textureEquirec;

    // enable code injection for non-built-in material
    Object.defineProperty( equirectMaterial, 'map', {

        get: function () {

            return this.uniforms.tEquirect.value;

        }

    } );

    var cubeShader = THREE.ShaderLib[ 'cube' ];

    var cubeMaterial = new THREE.ShaderMaterial( {
        uniforms: THREE.UniformsUtils.clone( cubeShader.uniforms ),
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        depthWrite: false,
        side: THREE.BackSide
    } );

    cubeMaterial.envMap = textureCube;

    // Skybox

    cubeMesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 100, 100 ), cubeMaterial );
    sceneCube.add( cubeMesh );

    //

    var geometry = new THREE.SphereBufferGeometry( 400.0, 48, 24 );
    sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube } );
    sphereMesh = new THREE.Mesh( geometry, sphereMaterial );

    scene.add( sphereMesh );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    renderer.outputEncoding = THREE.sRGBEncoding;

    //

    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 500;
    controls.maxDistance = 2500;

    //

    var params = {
        Cube: function () {

            cubeMesh.material = cubeMaterial;
            cubeMesh.visible = true;
            sphereMaterial.envMap = textureCube;
            sphereMaterial.needsUpdate = true;

        },
        Equirectangular: function () {

            cubeMesh.material = equirectMaterial;
            cubeMesh.visible = true;
            sphereMaterial.envMap = textureEquirec;
            sphereMaterial.needsUpdate = true;

        },
        Refraction: false
    };

    var gui = new GUI();
    gui.add( params, 'Cube' );
    gui.add( params, 'Equirectangular' );
    gui.add( params, 'Refraction' ).onChange( function ( value ) {

        if ( value ) {

            textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
            textureCube.mapping = THREE.CubeRefractionMapping;

        } else {

            textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
            textureCube.mapping = THREE.CubeReflectionMapping;

        }

        sphereMaterial.needsUpdate = true;

    } );
    gui.open();

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    camera.lookAt( scene.position );
    cameraCube.rotation.copy( camera.rotation );

    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );

}
