/*
 * 基础配置
 */

let isLoaded = false; // 纹理资源是否加载完毕
const loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  ),
  // 移除加载标志的函数
  removeText() {
    const loadingText = document.querySelector("#canvas-loader");
    if (loadingText.parentNode) {
      loadingText.parentNode.removeChild(loadingText);
    }
  },
};

// 初始化加载器
let loadingManager = new THREE.LoadingManager();
// 监听加载器 onLoad 事件
loadingManager.onLoad = () => {
  loadingScreen.removeText();
  isLoaded = true;
};

// 创建场景
const scene = new THREE.Scene();
// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 渲染器基本设置
renderer.setClearColor("hotpink");
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// canvas 外部容器
const canvasWrapper = document.querySelector("#canvas-wrapper");
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(0, 0, 220);

// 创建平行光源
const light = new THREE.DirectionalLight();
light.position.set(0, 0, 1);
scene.add(light);
// 创建点光源
const point = new THREE.PointLight(0xeeeeee);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中

// 创建球体
const cRadius = 100;
const geometry = new THREE.SphereBufferGeometry(
  cRadius,
  cRadius * 6.4,
  cRadius * 6.4
);

// 纹理图
const textureLoader = new THREE.TextureLoader(loadingManager);
const textureSurface = textureLoader.load(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-surface.jpg"
);
const textureElevation = textureLoader.load(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-elevation.jpg"
);
const textureSpecular = textureLoader.load(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-specular.jpg"
);

// 材质信息
const materialOpt = {
  map: textureSurface,
  normalMap: textureElevation,
  specularMap: textureSpecular,
  shininess: 80,
};
const material = new THREE.MeshPhongMaterial(materialOpt);
// 创建网格体
const sphere = new THREE.Mesh(geometry, material);
// 设置环境贴图的颜色深浅
sphere.material.normalScale.set(0.5, 0.5);
// 将模型添加到场景中
scene.add(sphere);

// 将 canvas 元素添加到页面中
canvasWrapper.appendChild(renderer.domElement);

/*
 * 事件监听实现动效
 */
let mouseX = 0;
let mouseY = 0;
const moveAnimate = {
  coordinates(clientX, clientY) {
    const limit = 270;
    const limitNeg = limit * -1;

    mouseX = clientX - window.innerWidth / 2;
    mouseY = clientY - window.innerHeight / 2;

    mouseX = mouseX >= limit ? limit : mouseX;
    mouseX = mouseX <= limitNeg ? limitNeg : mouseX;

    mouseY = mouseY >= limit ? limit : mouseY;
    mouseY = mouseY <= limitNeg ? limitNeg : mouseY;
  },
  onMouseMove(e) {
    moveAnimate.coordinates(e.clientX, e.clientY);
  },
  onTouchMove(e) {
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    moveAnimate.coordinates(touchX, touchY);
  },
};
document.addEventListener("mousemove", moveAnimate.onMouseMove);
document.addEventListener("touchmove", moveAnimate.onTouchMove);

const onWindowResize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};
window.addEventListener("resize", onWindowResize);

const createAnimRotation = () => {
  const speed = 0.005;

  sphere.rotation.z += speed / 2;
  sphere.rotation.y += speed;
};

// 渲染函数
const render = () => {
  if (!isLoaded) {
    renderer.render(loadingScreen.scene, loadingScreen.camera);
    requestAnimationFrame(render);
    return;
  }

  camera.position.x += (mouseX * -1 - camera.position.x) * 0.05;
  camera.position.y += (mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  createAnimRotation();

  renderer.render(scene, camera);

  requestAnimationFrame(render);
};
render();
