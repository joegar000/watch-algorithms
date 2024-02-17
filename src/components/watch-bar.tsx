
export function WatchBar(props: { playing: boolean, onLeft: () => void, onRight: () => void, onPlayPause: () => void }) {

  return (
    <div className="d-flex justify-content-center pt-2">
      <button className="btn btn-secondary" onClick={props.onLeft}>
        <i className="bi bi-caret-left" />
      </button>
      <button className="btn btn-secondary mx-3"
        onClick={props.onPlayPause}
      >
        <i className={`bi bi-${props.playing ? 'pause' : 'play'}`} />
      </button>
      <button className="btn btn-secondary" onClick={props.onRight}>
        <i className="bi bi-caret-right" />
      </button>
    </div>
  )
}
