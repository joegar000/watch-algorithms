import { useEffect, useMemo, useRef, useState } from "react";
import "./styles/column.css";

export interface ColumnSortProps {
  background?: 'bg-info' | 'bg-warning' | 'bg-danger' | 'bg-primary' | 'bg-secondary' | 'bg-light' | 'bg-dark'
  offset: number
  value: number
}

export type ColumnProps = ColumnSortProps & {
  totalCount: number
  speed: number
  stepDuration: number
}

export function Column(props: ColumnProps) {
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
  const transition = `transform ${props.stepDuration}ms`;
  return (
    <div
      style={{
        // @ts-ignore
        '--sort-offset': `translateX(${translate})`,
        width,
        height
      }}
    >
      <div className={`sort-column flex-fill ${props.background ?? 'bg-info'} border position-relative h-100 w-100`}
        style={{ transition }}
        ref={ref}
      />
    </div>
  );
}

