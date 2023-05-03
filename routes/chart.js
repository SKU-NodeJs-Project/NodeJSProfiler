//chart 페이지 렌더링하는 로직
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chart", { title: ["작업단위", "코어단위"] });
});

// window.onload = () => {
//   document.querySelector(".dropbtn_click").onclick = () => {
//     dropdown();
//   };
//   document.getElementsByClassName("fastfood").onclick = () => {
//     showMenu(value);
//   };
//   dropdown = () => {
//     var v = document.querySelector(".dropdown-content");
//     var dropbtn = document.querySelector(".dropbtn");
//     v.classList.toggle("show");
//     dropbtn.style.borderColor = "rgb(94, 94, 94)";
//   };

//   showMenu = (value) => {
//     var dropbtn_icon = document.querySelector(".dropbtn_icon");
//     var dropbtn_content = document.querySelector(".dropbtn_content");
//     var dropbtn_click = document.querySelector(".dropbtn_click");
//     var dropbtn = document.querySelector(".dropbtn");

//     dropbtn_icon.innerText = "";
//     dropbtn_content.innerText = value;
//     dropbtn_content.style.color = "#252525";
//     dropbtn.style.borderColor = "#3992a8";
//   };
// };
// window.onclick = (e) => {
//   if (!e.target.matches(".dropbtn_click")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");

//     var dropbtn_icon = document.querySelector(".dropbtn_icon");
//     var dropbtn_content = document.querySelector(".dropbtn_content");
//     var dropbtn_click = document.querySelector(".dropbtn_click");
//     var dropbtn = document.querySelector(".dropbtn");

//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };

module.exports = router;
