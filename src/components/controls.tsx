import { useEffect, useMemo, useState } from "react";
import generateNumbers from "../utilities/generate-numbers";
import { Column, ColumnSortProps } from "./column";
import { WatchBar } from "./watch-bar";
import "./styles/controls.css";
import { Sortable } from "./sortable";


export function SortControls(props: { stepDuration?: number, algorithm: (nums: number[]) => ColumnSortProps[][] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(50);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [triggerRegen, setTriggerRegen] = useState(false);
  const history = useMemo(() => props.algorithm(generateNumbers(count)), [count, props.algorithm, triggerRegen]);
  const stepDuration = props.stepDuration ?? 200;

  useEffect(() => {
    const onclick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement) || !e.target.closest('.settings-container'))
        setSettingsOpen(false);
    }
    document.addEventListener("click", onclick);
    return () => document.removeEventListener("click", onclick);
  }, []);

  useEffect(() => {
    if (playing) {
      const t = setTimeout(() => {
        if (index < history.length - 1)
          setIndex(index + 1);
        else
          setPlaying(false);
      }, (stepDuration ?? 200) / (speed === 100 ? 0 : speed));
      return () => clearTimeout(t);
    }
  }, [playing, count, index, speed, stepDuration]);

  return (
    <div className="h-100 d-flex flex-column">
      <Sortable speed={speed} stepDuration={stepDuration} columns={history[index]} />
      <input type="range" className="form-range" min={0} max={history.length - 1} value={index} step={1}
        onChange={e => {
          setIndex(Number(e.target.value));
        }}
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
              <button className="btn btn-outline-secondary w-auto" id="reset-btn" onClick={() => setTriggerRegen(!triggerRegen)}>
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
