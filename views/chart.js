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

    if (graphName === "bar graph") {
      openBarGraph();
      // openGraph();
      // graphPrint.textContent = graphName;
    }
  });
}
// 그래프 보여주는 로직

function openGraph() {
  console.log("hi");
}

function openBarGraph() {
  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Floating Bar Chart",
        },
      },
    },
  };
}

toggleButton.addEventListener("blur", function () {
  menu.classList.remove("show");
});
