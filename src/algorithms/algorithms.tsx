
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

export type SortingRes = Generator<{ comparing: { left: number, right: number } | null, nums: number[] }>
export function* bubbleSort(arr: number[]): SortingRes {
  let i, j;
  yield { comparing: null, nums: arr.slice() };
  for (i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        yield { comparing: { left: arr[j], right: arr[j + 1] }, nums: arr.slice() };
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        yield { nums: arr.slice(), comparing: null };
      }
    }

    // IF no two elements were 
    // swapped by inner loop, then break
    if (swapped == false)
      break;
  }
}

function* merge(arr: number[], left: number, mid: number, right: number): SortingRes {
  let n1 = mid - left + 1;
  let n2 = right - mid;

  // Create temp arrays
  let leftArr = new Array(n1);
  let rightArr = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++)
    leftArr[i] = arr[left + i];
  for (let j = 0; j < n2; j++)
    rightArr[j] = arr[mid + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = left;

  let originalArr = arr.slice();
  while (i < n1 && j < n2) {
    yield { comparing: { left: leftArr[i], right: rightArr[j] }, nums: originalArr };
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    }
    else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
  yield { comparing: null, nums: arr.slice() };
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted
export function* mergeSort(arr: number[], l: number = 0, r: number = arr.length - 1): SortingRes {
  if (l >= r) {
    return;
  }
  let m = l + Math.floor((r - l) / 2);
  yield* mergeSort(arr, l, m);
  yield* mergeSort(arr, m + 1, r);
  yield* merge(arr, l, m, r);
  yield { comparing: null, nums: arr.slice() };
}
