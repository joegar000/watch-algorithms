import { useEffect, useMemo, useRef, useState } from "react";
import { WatchBar } from "../interactions";
import { bubbleSort, BubbleState } from "./sort";
import generateNumbers from "../../utilities/generate-numbers";

/** Step duration in 'ms' */
export const STEP_DURATION = 200;

export function Column(props: BubbleState & { totalCount: number }) {
  const height = useMemo(() => {
    return `${props.value * (100 / props.totalCount)}%`;
  }, [props.value, props.totalCount]);

  const [width, setWidth] = useState(`${100 / props.totalCount}%`);

  useEffect(() => {
    setWidth(`${100 / props.totalCount}%`);
  }, [props.totalCount]);

  const transform = `translateX(${100 * props.offset}%)`;
  const transition = `transform ${STEP_DURATION}ms`;
  return (
    <div
      ref={(div) => div && setWidth(`${div.offsetWidth}px`)}
      className={`flex-fill ${props.comparing ? 'bg-danger' : 'bg-info'} border border-light position-absolute`}
      style={{ height, transform, transition, width }}
    />
  );
}

export function BubbleSort({ count = 200 }: { count?: number }) {
  const [playing, setPlaying] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const history = useMemo(() => {
    return bubbleSort(generateNumbers(count));
  }, [count]);

  useEffect(() => {
    if (playing) {
      const t = setTimeout(() => {
        if (historyIndex < history.length - 1)
          setHistoryIndex(historyIndex + 1);
      }, STEP_DURATION + 100);
      return () => clearTimeout(t);
    }
  }, [playing, historyIndex]);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex flex-fill align-items-end pt-5 position-relative">
        {history[historyIndex].map((state) => {
          return <Column key={state.value} {...state} totalCount={count} />
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
