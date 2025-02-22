import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Scene } from 'three';
import { color } from 'three/tsl';

console.log(THREE)

// Scene 
const scene = new THREE.Scene()

// Red Cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : "red"})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = 1
mesh.position.x = 1
mesh.position.z =
scene.add(mesh)


// Sizes
const sizes = {
    width:800,
    height:600
}

// Camera
const fov = 75
const aspect = sizes.width / sizes.height 
const camera = new THREE.PerspectiveCamera(fov, aspect)

scene.add(camera)

// Renderer 
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer(
    {
        canvas:canvas
    }
)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// To move objects 
/*
Propertise to transform object 
Postion 
rotation
scale

xyz for 3d 
zy for 2d 
 these are camera method by that I meant PerspectiveCamera
*/
