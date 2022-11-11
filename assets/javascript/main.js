// vars
let navBar = document.getElementsByTagName("nav")[0];
let main = document.querySelector("main");
var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
var mobileMode;
let touchstartX = 0;
let touchendX = 0;
let localTheme;

function checkDirection() {
  if (touchendX < touchstartX) console.log("swiped left!");
  if (touchendX > touchstartX) console.log("swiped right!");
}

// eventlisteners
window.addEventListener("DOMContentLoaded", onStart, false);
// window.addEventListener("scroll", onscroll, false);

// on page load run this functions
function onStart() {
  // onscroll();
  if (width <= 1024) {
    mobileMode = true;
    // mobileMenu()
  } else {
    mobileMode = false;
    // desktopMode()
  }
  update(localStorage.getItem("Theme"));
}

// click outside of the nav Close it
function closeClick() {
  const target = navBar;
  let click = false;
  document.addEventListener("click", function (eve) {
    const withinBoundaries = eve.composedPath().includes(target);
    if (!withinBoundaries && click == true) {
      navBar.classList.remove("pin");
      navBar.classList.remove("infos");
      document.body.style.removeProperty("cursor");
      click = false;
    } else if (
      navBar.classList.contains("infos") ||
      navBar.classList.contains("pin")
    ) {
      click = true;
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.removeProperty("cursor");
    }
  });
}

// mobile
// function mobileMenu(){
//   main.addEventListener('touchstart', e => {
//     touchstartX = e.changedTouches[0].screenX
//   })

//   main.addEventListener('touchend', e => {
//     touchendX = e.changedTouches[0].screenX
//     checkDirection()
//   })
// }

// desktop
// function desktopMode(){
//   onmousemove = function(e){
//     this.document.querySelector("#navbar").style.top = e.clientY + "px"
//   }
// }

// check current place
// function onscroll() {
//   var doc = document.documentElement;
//   var current = doc.scrollTop + window.innerHeight;
//   var height = doc.offsetHeight;
//   if (current <= 750) {
//   } else if (current >= height) {
//   } else {
//   }
// }

// menu pinng
document.getElementById("menu").addEventListener("click", () => {
  if (
    !navBar.classList.contains("pin") &&
    !navBar.classList.contains("infos")
  ) {
    navBar.classList.add("pin");
  } else if (navBar.classList.contains("infos")) {
    navBar.classList.remove("pin");
    navBar.classList.remove("infos");
  } else {
    navBar.classList.remove("pin");
  }
  closeClick();
});

// avatar click
function avaclick() {
  switch (mobileMode) {
    case true:
      if (!navBar.classList.contains("pin")) {
        navBar.classList.add("pin");
      } else {
        navBar.classList.remove("pin");
      }
      break;
    case false:
      if (navBar.classList.contains("infos")) {
        navBar.classList.remove("infos");
      } else {
        navBar.classList.add("infos");
        navBar.classList.remove("pin");
      }
      break;
    default:
      setTimeout(() => {
        location.reload();
      }, 1000);
      break;
  }
  closeClick();
}

// document.getElementById("drrw").addEventListener("click", ()=>{
//   window.scrollBy({ top: 500, left: 0, behavior: 'smooth' })
// }
function ThemeChanger() {
  let theme;
  if (document.querySelector("#color-switch").checked) {
    trans();
    theme = "light"
  } else {
    trans();
    theme = "dark"
  }
  update(theme);
}


function update(theme){
  localStorage.setItem("Theme", theme)
  document.documentElement.setAttribute("data-theme", theme)
  if (theme == "light") document.querySelector("#color-switch").checked = true
}
function trans() {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
}


function idleLogout() {
  var t;
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;  // catches touchscreen presses as well      
  window.ontouchstart = resetTimer; // catches touchscreen swipes as well      
  window.ontouchmove = resetTimer;  // required by some devices 
  window.onclick = resetTimer;      // catches touchpad clicks as well
  window.onkeydown = resetTimer;   
  window.addEventListener('scroll', resetTimer, true); // improved; see comments

  function yourFunction() {
      // your function for too long inactivity goes here
      // e.g. window.location.href = 'logout.php';
      console.log("time")
      fullimg(true)
  }

  function resetTimer() {
    fullimg(false)
      clearTimeout(t);
      t = setTimeout(yourFunction, 10000);  // time is in milliseconds
  }
}
idleLogout();

function fullimg(choice){
  let hero = document.getElementsByTagName("hero")
  if (hero.length !==  0 && choice == true){
    hero[0].style.paddingInline = "0vw"
  } else {
    hero[0].style.paddingInline = "5vw"
  }
}