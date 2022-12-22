// require("./template.html");
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import * as THREE from "three";
import empty from "./assets/images/empty.png";
import { getElements, getElementsByTagType } from "domutils";
require("webpack-hot-middleware/client?reload=true");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loadingManager: loading started");
};
loadingManager.onLoaded = () => {
  console.log("loadingManager: loading finished");
};
loadingManager.onProgress = () => {
  console.log("loadingManager: loading progressing");
};
loadingManager.onError = () => {
  console.log("loadingManager: loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

// textures
// const colorTexture = textureLoader.load(
//   "/textures/Brick_Wall_017_basecolor.jpg"
// );
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.repeat.x = 0.5;
// colorTexture.repeat.y = 0.5;

// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;

// const ambientOcclusionTexture = textureLoader.load(
//   "/textures/Brick_Wall_017_ambientOcclusion.jpg"
// );
// const heightTexture = textureLoader.load("/textures/Brick_Wall_017_height.jpg");
// const normalTexture = textureLoader.load("/textures/Brick_Wall_017_normal.jpg");
// const roughnessTexture = textureLoader.load(
//   "/textures/Brick_Wall_017_roughness.jpg"
// );
// const materialTexture = textureLoader.load(
//   "/textures/Brick_Wall_017_Material.jpg"
// );

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0x5bc0de
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth * 0.9,
  height: window.innerHeight * 0.5
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth * 0.9;
  sizes.height = window.innerHeight * 0.5;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  // set background to clear
  renderer.setClearColor(0xffffff, 0);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// *** TYPEWRITER STUFF
let messageArray = ["Hey", "I'm Caleb", "A Web Developer"];
var textPosition = 0;
// lower = faster
var speed = 70;

let hey = "hey".substring(0, textPosition);

var message0 = document.querySelector("#message0");
var message1 = document.querySelector("#message1");
var message2 = document.querySelector("#message2");

const typewriter = () => {
  message0.innerHTML =
    messageArray[0].substring(0, textPosition) +
    '<span class="mySpan">..</span>';

  if (textPosition++ != messageArray[0].length) {
    setTimeout(typewriter, speed);
  } else {
    message0.innerHTML = messageArray[0];
    textPosition = 0;
  }
};

const typewriter2 = () => {
  message1.innerHTML =
    messageArray[1].substring(0, textPosition) +
    '<span class="mySpan">..</span>';

  if (textPosition++ != messageArray[1].length) {
    setTimeout(typewriter2, speed);
  } else {
    message1.innerHTML = messageArray[1];
    textPosition = 0;
  }
};

const typewriter3 = () => {
  message2.innerHTML =
    messageArray[2].substring(0, textPosition) +
    '<span class="mySpan">..</span>';

  if (textPosition++ != messageArray[2].length) {
    setTimeout(typewriter3, speed);
  }
};

window.addEventListener("load", typewriter);
setTimeout(typewriter2, 800);
setTimeout(typewriter3, 1600);

// contact form
const contactForm = document.querySelector(".contact-form");

let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("contactMessage");

contactForm.addEventListener("submit", e => {
  e.preventDefault();

  let formData = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function() {
    console.log(xhr.responseText);

    if (xhr.responseText == "success") {
      alert("Email Sent");
      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      alert("something went wrong");
    }
  };

  xhr.send(JSON.stringify(formData));
});
