/*
 * @Author: CL
 * @Date: 2021-05-14 15:52:06
 * @LastEditTime: 2021-07-02 16:29:04
 * @Description:
 */

const btnStart = document.querySelector(".btnStart"), //开始按钮
  btnLaunch = document.querySelector(".btnLaunch"), //发射按钮
  btnLand = document.querySelector(".btnLand"), //着陆按钮
  fire = document.querySelector(".fire"),
  rockets = document.querySelector(".rockets"),
  shadow = document.querySelector(".shadow"),
  txtLaunch = document.querySelector(".btnLaunch span"),
  txtLand = document.querySelector(".btnLand span"),
  txtStart = document.querySelector(".btnStart span");

/**
 * 开始点火
 */
btnStart.addEventListener("click", openFire);

/**
 * 发射
 */
btnLaunch.addEventListener("click", launch);

/**
 * 着陆
 */
btnLand.addEventListener("click", land);

/**
 * 点火
 */
function openFire() {
  //如果开始按钮已经有了active,class,则证明此时是有火的，点击就要去掉火，移除activeclass
  if (btnStart.classList.contains("active")) {
    fire.classList.remove("burn"); //去火
    btnStart.classList.remove("active"); //改变背景样式
    txtStart.innerText = "start"; //文本
  } else {
    fire.classList.add("burn");
    btnStart.classList.add("active");
    txtStart.innerText = "停止";
  }
}

/**
 * 熄火
 */
function burn() {
  fire.classList.remove("burn");
  rockets.classList.remove("land");
  shadow.style.opacity = "0.2";
  // buttons
  btnLand.classList.remove("active");
  btnLand.classList.add("disable");
  btnLand.disabled = true;
  // 着陆按钮文本
  txtLand.innerText = "着陆";
}

/**
 * 发射
 */
function launch() {
  btnStart.classList.add("disable");
  fire.classList.add("burn");
  rockets.classList.remove("land");
  rockets.classList.add("launch");
  rockets.removeEventListener("animationend", burn);
  shadow.style.opacity = "0";

  //按钮
  btnLaunch.classList.add("active");
  btnStart.disabled = true;
  btnStart.classList.remove("active");
  btnLand.classList.remove("active");
  btnLand.classList.remove("disable");
  btnLand.disabled = false;

  //文本
  txtLaunch.innerText = "发射";
  txtStart.innerText = "开始";
  txtLand.innerText = "着落";
}

/**
 * 着陆
 */
function land() {
  //飞船
  rockets.classList.remove("launch");
  rockets.classList.add("land");
  rockets.addEventListener("animationend", burn); //熄火显示

  // 按钮
  btnLaunch.classList.remove("active");
  btnLand.classList.add("active");
  btnStart.classList.remove("disable");
  btnStart.disabled = false;

  // 按钮文本
  txtLand.innerText = "着陆";
  txtLaunch.innerText = "发射";
}
