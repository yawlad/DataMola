function maxSubarraySum(arr) {
  let maxSoFar = 0;
  let maxEndingHere = 0;

  for (num of arr) {
    maxEndingHere += num;

    if (maxEndingHere < 0) {
      maxEndingHere = 0;
    }

    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
    }
  }

  return maxSoFar;
}

console.log(maxSubarraySum([1,2,3,4,5,3,-100,2,-2,3,5]))