import { bubbleSort } from "../algorithms/bubble";
import { SortControls } from "./controls";

export function Welcome() {
  return (
    <>
      <div>
        <div className="d-flex align-items-center flex-column pt-3 pb-5">
          <h2>Welcome to Watch Algorithms!</h2>
        </div>
        <div>
          <p>I created this website for two main reasons:</p>
          <ol>
            <li><p>To improve my familiarity with the different kinds of sortings algorithms.</p></li>
            <li>
              <p>
                To practice smoothly changing the position of HTML elements. I've used packages
                like <a href="https://dndkit.com/" target="_blank">dnd kit</a> before and wanted to see if
                I could achieve something similar.
              </p>
            </li>
          </ol>
          <p>If you're seeing this, I hope I am at least able to get you to think "huh, neat".</p>
          <p>Below is an example of bubble sort, enjoy!</p>
        </div>
      </div>
      <div>
        <SortControls algorithm={bubbleSort} startPlaying={true} />
      </div>
    </>
  );
}

