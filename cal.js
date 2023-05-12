 function stdev(arr) {
    const n = arr.length;
    const m = arr.reduce((acc, val) => acc + val, 0) / n;
    const v = arr.reduce((acc, val) => acc + (val - m) ** 2, 0) / (n - 1);
    const s = Math.sqrt(v);
    return s;
  }

   function max(arr) {
    let max = 0;
    for (const i of arr) {
      if (max < i) max = i;
    }
    return max;
  }
  
   function avg(arr) {
    let avg = 0;
    let sum = 0;
    for (const i of arr) {
      sum += i;
    }
    avg = sum / arr.length;
    return avg;
  }
  
   function min(arr) {
    let min = Number.MAX_SAFE_INTEGER;
    for (const i of arr) {
      if (min > i) min = i;
    }
    return min;
  }
  
  module.exports = {
    calculatePopulationStandardDeviation, max, avg, min
  };