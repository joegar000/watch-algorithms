import React, { createContext, useEffect, useMemo, useState } from "react";
import { WatchBar } from "../interactions";
import { mergeSort } from "./sort";
import generateNumbers from "../../utilities/generate-numbers";

export function Column(props: { value: number, comparing: { left: number, right: number } | null }) {
  const height = `${props.value}%`;
  const isComparing = props.comparing && (props.comparing.left === props.value || props.comparing.right === props.value);

  return (
    <div
      className={`flex-fill ${isComparing ? 'bg-danger' : 'bg-info'} border border-light`}
      style={{ height }}
    />
  );
}

export const SortableColumns = createContext<[{ left: number, right: number }, React.MutableRefObject<HTMLElement | null>[]] | null>(null);
/** Step duration in 'ms' */
export const STEP_DURATION = 200;

export function MergeSort({ count = 100 }: { count?: number }) {
  const [playing, setPlaying] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const history = useMemo(() => {
    const numbers = generateNumbers(count);
    return [...mergeSort(numbers.slice())];
  }, [count]);
  const nums = history[historyIndex];

  useEffect(() => {
    if (playing) {
      const t = setTimeout(() => {
        if (historyIndex < history.length - 1)
          setHistoryIndex(historyIndex + 1);
      }, STEP_DURATION + 100);
      return () => clearTimeout(t);
    }
  }, [playing, nums]);

  const unit = 100 / count;

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex flex-fill align-items-end pt-5">
        {nums.nums.map(n => {
          return <Column key={unit * n} comparing={nums.comparing} value={unit * n} />;
        })}
      </div>
      <input type="range" className="form-range" min={0} max={history.length - 1} value={historyIndex} step={1}
        onChange={e => {
          setHistoryIndex(Number(e.target.value));
        }}
      />
      <WatchBar
        playing={playing}
        onLeft={() => {
          if (historyIndex > 0)
            setHistoryIndex(historyIndex - 1);
        }}
        onRight={() => {
          if (historyIndex < history.length - 1)
            setHistoryIndex(historyIndex + 1);
        }}
        onPlayPause={() => {
          if (historyIndex === history.length - 1) {
            setHistoryIndex(0);
            setPlaying(true);
          }
          else
            setPlaying(!playing);
        }}
      />
    </div>
  );
}
