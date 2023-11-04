

export function generateNumbers(numCount: number) {
  const nums: number[] = [];
  for (let x = 0; x < numCount; x++) {
    let num = Math.ceil(Math.random() * numCount);
    while (nums.includes(num))
      num = Math.ceil(Math.random() * numCount);
    nums.push(num);
  }
  return nums;
};
export function* bubbleSort(nums: number[]) {
  let i, j, temp;
  let swapped;
  let arr = nums.slice();
  let n = nums.length;
  for (i = 0; i < n - 1; i++) {
    swapped = false;
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        yield arr.slice();
      }
    }

    // IF no two elements were 
    // swapped by inner loop, then break
    if (swapped == false)
      break;
  }
}
