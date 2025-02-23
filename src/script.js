import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

/**
 * Objects
 */
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0xff0000);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
scene.add(sphere);

// plane geometry
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
scene.add(plane);

const  torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
scene.add(torus);


// Moving the objects 
sphere.position.x = -1.5;
torus.position.x = 1.5;

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;  // Move the camera back to see the cube in the scene
scene.add(camera);  

// Renderer
const canvas = document.querySelector('canvas.webgl');  // Get the canvas element
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});                
renderer.setSize(sizes.width, sizes.height);  // Set the size of the renderer                             
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  // Set the pixel ratio
// Viewport and fullscreen
window.addEventListener('resize', () => {      // Resize the canvas when the window is resized
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {     // Toggle fullscreen when double clicking
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Clock
const clock = new THREE.Clock();

// Function tick
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects Animation
    sphere.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;   
    plane.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();