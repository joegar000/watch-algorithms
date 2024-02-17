import { produce } from "immer";
import { last } from "../../utilities/last";

export interface MergeState {
  value: number,
  offset: number,
  comparing: boolean,
  toCompare: boolean
}

// JavaScript program for Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr: number[], leftIndex: number, middleIndex: number, rightIndex: number, mergeStates: MergeState[][]) {
  const size1 = middleIndex - leftIndex + 1;
  const size2 = rightIndex - middleIndex;

  // Create temp arrays
  const leftSub: number[] = []; 
  const rightSub: number[] = [];

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < size1; i++) {
    leftSub.push(arr[leftIndex + i]);
  }
  for (let j = 0; j < size2; j++) {
    rightSub.push(arr[middleIndex + 1 + j])
  }

  mergeStates.push(produce(last(mergeStates), draft => {
    for (const v of leftSub.concat(rightSub)) {
      const stateI = last(mergeStates).findIndex(s => s.value === v);
      draft[stateI].toCompare = true;
    }
  }));
  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = leftIndex;

  while (i < size1 && j < size2) {
    const stateI = last(mergeStates).findIndex(s => s.value === leftSub[i]);
    const stateJ = last(mergeStates).findIndex(s => s.value === rightSub[j]);

    mergeStates.push(produce(last(mergeStates), draft => {
      draft[stateI].comparing = true;
      draft[stateJ].comparing = true;
    }));

    if (leftSub[i] <= rightSub[j]) {
      arr[k] = leftSub[i];
      i++;
    }
    else {
      arr[k] = rightSub[j];
      j++;
    }
    mergeStates.push(produce(last(mergeStates), draft => {
      const stateIndex = draft.findIndex(s => s.value === arr[k]);
      const move = k - stateIndex;
      const offset = draft[stateIndex].offset
      if (move !== offset) {
        draft[stateIndex].offset = move;

        const oldPos = stateIndex + offset;
        const newPos = stateIndex + move;
        const iter = leftSub.slice(i).concat(rightSub.slice(j));
        for (let x = 0; x < oldPos - newPos; x++) {
          const s = draft.find(s => s.value === iter[x]);
          s && s.offset++;
        }
      }
    }));
    k++;

    mergeStates.push(produce(last(mergeStates), draft => {
      draft[stateI].comparing = false;
      draft[stateJ].comparing = false;
    }));
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < size1) {
    arr[k] = leftSub[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < size2) {
    arr[k] = rightSub[j];
    j++;
    k++;
  }


  mergeStates.push(produce(last(mergeStates), draft => {
    draft.forEach(s => s.toCompare = false);
  }));
}


function sort(arr: number[], leftIndex: number, rightIndex: number, mergeStates: MergeState[][]) {
  if (leftIndex >= rightIndex) {
    return;
  }

  const m = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
  sort(arr, leftIndex, m, mergeStates);
  sort(arr, m + 1, rightIndex, mergeStates);
  merge(arr, leftIndex, m, rightIndex, mergeStates);
}

export function mergeSort(arr: number[]): MergeState[][] {
  const mergeStates = [arr.map(v => ({
    value: v,
    offset: 0,
    comparing: false,
    toCompare: false
  }))];
  sort(arr, 0, arr.length - 1, mergeStates);
  return mergeStates;
}

