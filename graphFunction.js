function max(arr) {
  let max = 0;
  for (let i = 0; i < 10; i++){
    if(max < arr[i]) max = arr[i];
  }
  return max;
}

function avg(arr) {
  let avg = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++){
    sum += arr[i];
  }
  avg = sum / arr.length;
  return parseInt(avg);
}

function min(arr) {
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < 10; i++){
    if(min > arr[i]) min = arr[i];
  }
  return min;
}

function stdev(arr) {
  const n = arr.length;
  const m = arr.reduce((acc, val) => acc + val, 0) / n;
  const v = arr.reduce((acc, val) => acc + (val - m) ** 2, 0) / (n - 1);
  const s = Math.sqrt(v);
  return parseInt(s);
}

//표준편차 연산

module.exports = {
  stdev,
  max,
  avg,
  min,
};