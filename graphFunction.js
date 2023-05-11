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
  for (let i = 0; i < 10; i++){
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

//표준편차 연산

module.exports = {
  max,
  avg,
  min,
};