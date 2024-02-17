import { produce } from "immer";
import { ColumnSortProps } from "../components/column";
import { last } from "../utilities/last";

export function bubbleSort(arr: number[]): ColumnSortProps[][] {
  const bubbleStates: ColumnSortProps[][] = [arr.map(v => ({
    value: v,
    offset: 0,
    background: 'bg-info'
  }))];

  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        
        const statesJ = last(bubbleStates).findIndex(s => s.value === arr[j]);
        const statesJ1 = last(bubbleStates).findIndex(s => s.value === arr[j + 1]);

        bubbleStates.push(produce(last(bubbleStates), draft => {
          draft[statesJ].background = 'bg-danger';
          draft[statesJ1].background = 'bg-danger';
        }));

        bubbleStates.push(produce(last(bubbleStates), draft => {
          draft[statesJ].offset++;
          draft[statesJ1].offset--;
        }));

        bubbleStates.push(produce(last(bubbleStates), draft => {
          draft[statesJ].background = 'bg-info';
          draft[statesJ1].background = 'bg-info';
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

