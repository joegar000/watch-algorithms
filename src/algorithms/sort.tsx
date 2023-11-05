import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Column } from "./columns";
import { WatchBar } from "./interactions";
import { SortingRes, generateNumbers } from "./algorithms";

export const SortableColumns = createContext<[{ left: number, right: number }, React.MutableRefObject<HTMLElement | null>[]] | null>(null);
/** Step duration in 'ms' */
export const STEP_DURATION = 200;

export function Sort({ count = 100, sort }: { count?: number, sort: (n: number[]) => SortingRes }) {
  const [playing, setPlaying] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const history = useMemo(() => {
    const numbers = generateNumbers(count);
    return [...sort(numbers.slice())];
  }, [count, sort]);
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
      <input type="range" min={0} max={history.length - 1} value={historyIndex} step={1}
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
          setPlaying(!playing);
        }}
      />
    </div>
  );
}
