export function Column(props: { height: number }) {
  const height = `${props.height}%`;
  return (
    <div className="flex-fill bg-info border border-dark" style={{ height }}></div>
  );
}