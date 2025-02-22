import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//scene

const scene = new THREE.Scene()

//hdr texture

const rgb = new RGBELoader()

rgb.load('./snowy_park_01_2k.hdr', (texture) => { texture.mapping = THREE.EquirectangularReflectionMapping, scene.environment = texture; })

//dracoloader

const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

//objects

let model;

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoloader);
loader.load(
    './Porche-911.glb',
    (gltf) => {
        model = gltf.scene;
        scene.add(model);
    }
)

//sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Camera

const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height)
camera.position.set(0, 0, 7)

scene.add(camera)

//canvas

const canvas = document.querySelector('.webgl')

//controls

const controls = new OrbitControls(camera, canvas)
controls.maxPolarAngle = Math.PI / 2.2;
controls.enableDamping = true

//renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio * 2);
