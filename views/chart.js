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

// 그래프 종류
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

//그래프 띄워주는 로직
var ctx = document.getElementById("myChart").getContext("2d");
var first = document.getElementById("first");
var second = document.getElementById("second");
if ("{{display}}") {
  first.style.display = "none";
  second.style.display = "block";
  var myChart = new Chart(ctx, {
    type: "{{graphType}}",
    data: {
      labels: ["{{xLabel}}" + 1, "{{xLabel}}" + 2, "{{xLabel}}" + 3, "{{xLabel}}" + 4, "{{xLabel}}" + 5],
      datasets: [
        {
          label: "MAX",
          data: "{{maxArr}}".split(","), //배열을 문자열로 받기 때문에 다시 ,을 기준으로 배열로 반환
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgb(75, 192, 192)",
          tension: 0,
        },
        {
          label: "AVG",
          data: "{{avgArr}}".split(","),
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          tension: 0,
        },
        {
          label: "MIN",
          data: "{{minArr}}".split(","),
          fill: false,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
          tension: 0,
        },
        {
          label: "STDEV",
          data: "{{stdevArr}}".split(","),
          fill: false,
          backgroundColor: "rgb(235, 162, 235)",
          borderColor: "rgb(235, 162, 235)",
          tension: 0,
        },
      ],
    },
    options: {
      scales: {},
    },
  });
  const savedValue = localStorage.getItem("selectedGraph");
  if (savedValue) {
    document.getElementById("graph-select").textContent = savedValue;
  }
}
function redirectToGraph(index) {
  const graphType = document.getElementById("graph-select").textContent.trim();
  // const graphType = 'line';
  console.log("graphType: " + graphType);
  if (graphType != "그래프를 선택해주세요") {
    location.href = `/chart/${index}/${graphType}/{{fileName}}/`;
  } else {
    alert("그래프 종류를 선택해주세요.");
  }
}
