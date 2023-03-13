import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
// Scene
const scene = new THREE.Scene();

// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.2,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".WebGL");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.enablePan = false;
control.enableZoom = false;
control.autoRotate = true;
control.autoRotateSpeed = 5;
// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //   Update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;

  //   Render
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// Timeline edits
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(sphere.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { y: "500%" }, { y: "0%" });
