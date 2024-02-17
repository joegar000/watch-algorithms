import { Column, ColumnSortProps } from "./column";

export function Sortable(props: { columns: ColumnSortProps[], stepDuration: number, speed: number }) {
  return (
    <div className="d-flex flex-fill align-items-end pt-5">
      {props.columns.map((state) => {
        return <Column key={state.value} {...state} stepDuration={props.stepDuration} totalCount={props.columns.length} speed={props.speed} />
      })}
    </div>
  );
}

