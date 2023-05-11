const graphPrint = document.querySelector(".print");
const dropdown = document.querySelector(".dropdown");
const toggleButton = document.querySelector(".dropdown-toggle");
const menu = document.querySelector(".dropdown-menu");
const options = document.querySelectorAll(".dropdown-option");
const nextButton = document.querySelector(".next-button");

toggleButton.addEventListener("click", function () {
  menu.classList.toggle("show");
});

for (const option of options) {
  option.addEventListener("click", function () {
    const graphName = option.textContent.trim();
    toggleButton.textContent = graphName;
    toggleButton.classList.add("selected");
    // nextButton.removeAttribute("disabled");

    // if (graphName) {
    //   openGraph();
    //   graphPrint.textContent = graphName;
    // }
  });
}
// function redirectToGraph(index) {
//   // const selectElement = document.getElementById('graph-select');
//   // const graphType = selectElement.value;
//   const graphType = 'bar';
//   const fileName = document.getElementById('fileName').textContent;
//   if (graphType) {
//       location.href = `/chart/${index}/${graphType}/${fileName}`;
//   } else {
//       alert("그래프 종류를 선택해주세요.");
//   }
// }
// 그래프 보여주는 로직

function openGraph() {
  console.log("hi");
}

toggleButton.addEventListener("blur", function () {
  menu.classList.remove("show");
});
