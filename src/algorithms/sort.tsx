import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Column } from "./columns";
import { WatchBar } from "./interactions";
import { generateNumbers } from "./algorithms";

export function Sort({ count = 100, sort }: { count?: number, sort: (n: number[]) => Generator<number[], void, unknown> }) {
  const [playing, setPlaying] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const history = useMemo(() => {
    const numbers = generateNumbers(count);
    const result: number[][] = [];
    let steps = sort(numbers);
    let next = steps.next();
    while (!next.done) {
      result.push(next.value);
      next = steps.next();
    }
    return result;
  }, [count, sort]);
  const nums = history[historyIndex];

  useEffect(() => {
    if (playing) {
      const t = setTimeout(() => {
        if (historyIndex < history.length - 1)
          setHistoryIndex(historyIndex + 1);
      }, 10);
      return () => clearTimeout(t);
    }
  }, [playing, nums]);

  const unit = 100 / count;

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex flex-fill align-items-end pt-5">
        {nums?.map(n => {
          return <Column key={unit * n} height={unit * n} />;
        })}
      </div>
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
