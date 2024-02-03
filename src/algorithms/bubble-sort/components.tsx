import { useEffect, useMemo, useRef, useState } from "react";
import { WatchBar } from "../interactions";
import { bubbleSort, BubbleState } from "./sort";
import generateNumbers from "../../utilities/generate-numbers";
import "./styles.css";

/** Step duration in 'ms' */
export const STEP_DURATION = 200;

export function Column(props: BubbleState & { totalCount: number, speed: number }) {
  const height = useMemo(() => `${props.value * (100 / props.totalCount)}%`, [props.value, props.totalCount]);
  const width = useMemo(() => `${100 / props.totalCount}%`, [props.totalCount]);
  const [pixelWidth, setPixelWidth] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setPixelWidth(ref.current.getBoundingClientRect().width);
      const o = new ResizeObserver(() => setPixelWidth(ref.current?.getBoundingClientRect().width ?? null));
      o.observe(ref.current);
      return () => o.disconnect();
    }
  }, []);

  const translate = pixelWidth !== null ? `${props.offset * pixelWidth}px` : `${100 * props.offset}%`;
  const transition = `transform ${STEP_DURATION}ms`;
  return (
    <div
      style={{
        // @ts-ignore
        '--bubble-offset': `translateX(${translate})`,
        width,
        height
      }}
    >
      <div className={`bubble-sort-column flex-fill ${props.comparing ? 'bg-danger' : 'bg-info'} border position-relative h-100 w-100`}
        style={{ transition }}
        ref={ref}
      />
    </div>
  );
}

export function BubbleSort() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(50);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [history, setHistory] = useState(() => bubbleSort(generateNumbers(count)));

  if (count !== history[0]?.length) {
    setIndex(0);
    setHistory(bubbleSort(generateNumbers(count)))
  }

  useEffect(() => {
    if (playing) {
      const t = setTimeout(() => {
        if (index < history.length - 1)
          setIndex(index + 1);
        else
          setPlaying(false);
      }, STEP_DURATION / (speed === 100 ? 0 : speed));
      return () => clearTimeout(t);
    }
  }, [playing, count, index, speed]);

  useEffect(() => {
    const closeSettings = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement) || !e.target.closest('.settings-container'))
        setSettingsOpen(false);
    };
    document.addEventListener('click', closeSettings);
    return () => document.removeEventListener('click', closeSettings);
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex flex-fill align-items-end pt-5 position-relative">
        {history[index]?.map((state) => {
          return <Column key={state.value} {...state} totalCount={count} speed={speed} />
        })}
      </div>
      <input type="range" className="form-range" min={0} max={history.length - 1} value={index} step={1}
        onChange={e => setIndex(Number(e.target.value))}
      />
      <div className="d-flex w-100">
        <div className="w-100">
          <WatchBar
            playing={playing}
            onLeft={() => {
              if (index > 0 && !playing) {
                setIndex(index - 1);
              } else {
                setSpeed(Math.min(1, speed - 5));
              }
            }}
            onRight={() => {
              if (index < history.length - 1 && !playing) {
                setIndex(index + 1);
              } else {
                setSpeed(Math.min(100, speed + 5));
              }
            }}
            onPlayPause={() => {
              if (index === history.length - 1) {
                setIndex(0);
                setPlaying(true);
              }
              else
                setPlaying(!playing);
            }}
          />
        </div>
        <div className="float-end position-relative settings-container">
          <div className={`form-group position-absolute end-0 bg-body border shadow rounded-3 py-3 px-4${settingsOpen ? '' : ' d-none'}`} style={{ bottom: "100%" }}>
            <div className="row">
              <label htmlFor="speed-setting" className="form-label">Speed</label>
              <input type="range" id="speed-setting" className="form-range w-auto" max="100" min="1" step="0.1" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
            </div>
            <div className="row border-top mt-2">
              <label htmlFor="colCount" className="form-label">Columns</label>
              <input type="number" id="col-count" className="form-control" max="100" min="2" value={count} onChange={e => setCount(Number(e.target.value))} />
            </div>
            <div className="row border-top mt-2">
              <label htmlFor="reset-btn" className="form-label">
                Regenerate
                </label>
              <button className="btn btn-outline-secondary w-auto" id="reset-btn"onClick={() => setHistory(bubbleSort(generateNumbers(count)))}>
                <i className="bi bi-arrow-clockwise" />
              </button>
            </div>
          </div>
          <div className={`position-absolute end-0 ${settingsOpen ? 'settings-open' : 'settings'}`} onClick={() => setSettingsOpen(!settingsOpen)}>
            <i className={`bi bi-${settingsOpen ? 'gear-fill' : 'gear'}`} style={{ fontSize: '2em' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
