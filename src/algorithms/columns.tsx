import { useRef } from "react";

export function Column(props: { value: number, comparing: { left: number, right: number } | null }) {
  const height = `${props.value}%`;
  const isComparing = props.comparing && (props.comparing.left === props.value || props.comparing.right === props.value);

  return (
    <div
      className={`flex-fill ${isComparing ? 'bg-danger' : 'bg-info'} border border-dark`}
      style={{ height }}
    />
  );
}