// require("./template.html");
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import * as THREE from "three";
import empty from "./assets/images/empty.png";
import "./assets/images/GroceryListApp.png";
import { getElements, getElementsByTagType, getElementById } from "domutils";
import { FontLoader } from "/node_modules/three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "/node_modules/three/examples/jsm/geometries/TextGeometry.js";
import CANNON from "cannon";
import HelvetikerFontPath from "./assets/fonts/helvetiker_regular.typeface.json";
require("webpack-hot-middleware/client?reload=true");

console.log(HelvetikerFontPath);

/**
 *
 *  TYPEWRITER
 *
 */
let messageArray = ["Hey", "I'm Caleb,", "A Web Developer"];
var textPosition = 0;
// lower = faster
var speed = 75;

var message0 = document.querySelector("#message0");
var message1 = document.querySelector("#message1");
var message2 = document.querySelector("#message2");

const typewriter = () => {
  message0.innerHTML =
    messageArray[0].substring(0, textPosition) +
    '<span id="mySpan" class="mySpan">||</span>';

  if (textPosition++ != messageArray[0].length) {
    setTimeout(typewriter, speed);
  } else {
    message0.innerHTML = messageArray[0];
    textPosition = 0;
    typewriter2();
  }
};

const typewriter2 = () => {
  message1.innerHTML =
    messageArray[1].substring(0, textPosition) +
    '<span id="mySpan" class="mySpan">||</span>';

  if (textPosition++ != messageArray[1].length) {
    setTimeout(typewriter2, speed);
  } else {
    message1.innerHTML = messageArray[1];
    textPosition = 0;
    typewriter3();
  }
};

const typewriter3 = () => {
  message2.innerHTML =
    messageArray[2].substring(0, textPosition) +
    '<span id="mySpan" class="mySpan">_</span>';

  if (textPosition++ != messageArray[2].length) {
    setTimeout(typewriter3, speed);
  }
};
window.addEventListener("load", typewriter);

/**
 *
 *  Observer style togglers
 *
 */
// observer for about me
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // add animation class to svg path
      document
        .querySelector("#signaturePath")
        .classList.add("signature-animation-toggle");

      // add slide animation to about-me <p>
      entry.target.classList.add("slide-in-from-right");
    }
  });
});
// tell observer what to track (p in about me)
observer.observe(document.querySelector("div.col-md p"));

// observer for projects
const projAnimation = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("slide-in-from-bottom");
    }
  });
};
const projObserver = new IntersectionObserver(projAnimation);

const projItem = document.querySelectorAll(".project-item");

// tell observer what to track (project images)
projItem.forEach((element) => {
  projObserver.observe(element);
});
// tell observer to track text
// projTxt.forEach((element) => {
//   projObserver.observe(element);
// });

/**
 *
 *
 *
 *
 */
// Hacker animation on text
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelectorAll("#hacker").forEach((h1) => {
  h1.onmouseover = (event) => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        console.log();
        clearInterval(interval);
      }

      iteration += 1 / 6;
    }, 10);
  };
});

/**
 * THREE.js Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
// blue light
const directionalLightB = new THREE.DirectionalLight(0x00fffc, 1);
directionalLightB.position.set(-1, -2, 1.5);
// pink light
const pointLightP = new THREE.PointLight(0xff0099, 0.0);
pointLightP.position.set(0, 6, -1);
pointLightP.castShadow = true;

scene.add(ambientLight, directionalLightB, pointLightP);

/**
 *  Text ******
 */

const fontLoader = new FontLoader();

fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
  (font) => {
    const javascript = new TextGeometry("Javascript", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 2,
    });
    const hTML = new TextGeometry("html", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 2,
    });
    const cSS = new TextGeometry("css", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 2,
    });
    const bootstrap = new TextGeometry("Bootstrap", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 2,
    });
    const threejs = new TextGeometry("Three.js", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 2,
    });
    const npm = new TextGeometry("npm", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 2,
    });
    const jSON = new TextGeometry("JSON", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 2,
    });
    const git = new TextGeometry("git", {
      font: font,
      size: 0.4,
      height: 0.2,
      curveSegments: 2,
    });
    const expressjs = new TextGeometry("Express.js", {
      font: font,
      size: 0.4,
      height: 0.2,
      curveSegments: 2,
    });
    const webpack = new TextGeometry("webpack", {
      font: font,
      size: 0.4,
      height: 0.2,
      curveSegments: 2,
    });
    const nodejs = new TextGeometry("node.js", {
      font: font,
      size: 0.4,
      height: 0.2,
      curveSegments: 2,
    });

    const textMaterial = new THREE.MeshStandardMaterial();
    // 3D Meshes
    const js3D = new THREE.Mesh(javascript, textMaterial);
    const hTML3D = new THREE.Mesh(hTML, textMaterial);
    const cSS3D = new THREE.Mesh(cSS, textMaterial);
    const bootstrap3D = new THREE.Mesh(bootstrap, textMaterial);
    const threejs3D = new THREE.Mesh(threejs, textMaterial);
    const npm3D = new THREE.Mesh(npm, textMaterial);
    const jSON3D = new THREE.Mesh(jSON, textMaterial);
    const git3D = new THREE.Mesh(git, textMaterial);
    const expressjs3D = new THREE.Mesh(expressjs, textMaterial);
    const webpack3D = new THREE.Mesh(webpack, textMaterial);
    const nodejs3D = new THREE.Mesh(nodejs, textMaterial);

    // array of all TextGeometries
    const textGeoms = [
      javascript,
      hTML,
      cSS,
      bootstrap,
      threejs,
      npm,
      jSON,
      git,
      expressjs,
      webpack,
      nodejs,
    ];

    const meshes3D = [
      js3D,
      hTML3D,
      cSS3D,
      bootstrap3D,
      threejs3D,
      npm3D,
      jSON3D,
      git3D,
      expressjs3D,
      webpack3D,
      nodejs3D,
    ];

    textGeoms.forEach((i) => {
      i.center();
    });
    meshes3D.forEach((i) => {
      i.receiveShadow = true;
      i.castShadow = true;
    });

    // 3D Text Positions
    hTML3D.position.set(-1.4, 0.8, 0);
    cSS3D.position.set(-0.5, 0.8, 0);
    js3D.position.set(1, 0.8, 0);
    bootstrap3D.position.set(-1.3, 0.1, 0);
    threejs3D.position.set(0.5, 0.1, 0);
    npm3D.position.set(1.8, 0.1, 0);
    jSON3D.position.set(-1.4, -0.6, 0);
    git3D.position.set(-0.4, -0.6, 0);
    webpack3D.position.set(1.2, -0.6, 0);
    expressjs3D.position.set(-0.9, -1.3, 0);
    nodejs3D.position.set(1.5, -1.3, 0);

    scene.add(
      js3D,
      hTML3D,
      cSS3D,
      bootstrap3D,
      threejs3D,
      npm3D,
      jSON3D,
      git3D,
      expressjs3D,
      webpack3D,
      nodejs3D
    );
  }
);

/**
 * Window Sizes
 */
const sizes = {
  width: window.innerWidth * 0.94,
  height: window.innerHeight * 0.37,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth * 0.94;
  sizes.height = window.innerHeight * 0.37;

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
  45,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 4;
camera.lookAt(0, 0, 0);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
// set background to clear
renderer.setClearColor(0xffffff, 0);

// /**
//  * Animate
//  */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);

  // 3D Text Flicker
  const span = document.getElementById("mySpan");
  const spanOpacity = window.getComputedStyle(span).opacity;

  pointLightP.intensity = spanOpacity * 0.5;
};

tick();

/**
 *
 *
 *
 * EMAIL Contact Form
 */
const contactForm = document.querySelector(".contact-form");

let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("contactMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
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
