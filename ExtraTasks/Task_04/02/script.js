function maxProfit(arr) {
  let maxProfit = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      maxProfit += arr[i + 1] - arr[i];
    }
  }
  return maxProfit;
}

console.log(maxProfit([10,8,7,6,6,6,5,10]));
console.log(maxProfit([10,8,7,6,6,6,5]));
console.log(maxProfit([1,10,1,15,20,1,3,5]));