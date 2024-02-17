import { produce } from "immer";
import { last } from "../../utilities/last";

export interface BubbleState {
  value: number,
  offset: number,
  comparing: boolean
}

export function bubbleSort(arr: number[]): BubbleState[][] {
  const bubbleStates: BubbleState[][] = [arr.map(v => ({
    value: v,
    offset: 0,
    comparing: false
  }))];

  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        
        const statesJ = last(bubbleStates).findIndex(s => s.value === arr[j]);
        const statesJ1 = last(bubbleStates).findIndex(s => s.value === arr[j + 1]);

        bubbleStates.push(produce(last(bubbleStates), draft => {
          draft[statesJ].comparing = true;
          draft[statesJ1].comparing = true;
        }));

        bubbleStates.push(produce(last(bubbleStates), draft => {
          draft[statesJ].offset++;
          draft[statesJ1].offset--;
        }));

        bubbleStates.push(produce(last(bubbleStates), draft => {
          draft[statesJ].comparing = false;
          draft[statesJ1].comparing = false;
        }));

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (swapped == false)
      break;
  }

  return bubbleStates;
}

