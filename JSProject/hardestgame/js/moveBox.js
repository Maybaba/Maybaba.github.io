import {keys} from "./app.js"
import { boxSize, step, $boxStyle } from "./getDom.js"
import { drawBox  } from "./drawBox.js";
import { checkCollision } from "./checkCollision.js";

let x = parseInt($boxStyle.left);
let y = parseInt($boxStyle.top);

export function moveBox() {
  if ("ArrowLeft" in keys) {
    if (!checkCollision("left")) {
      x = Math.max(x - step, 0);
    }
  }
  if ("ArrowRight" in keys) {
    if (!checkCollision("right")) {
      x = Math.min(window.innerWidth - boxSize, x + step);
    }
  }
  if ("ArrowUp" in keys) {
    if (!checkCollision("up")) {
      y = Math.max(y - step, 0);
    }
  }
  if ("ArrowDown" in keys) {
    if (!checkCollision("down")) {
      y = Math.min(window.innerHeight - boxSize, y + step);
    }
  }

  drawBox();
  requestAnimationFrame(moveBox); // request... 는 애니메이션 부드럽게 구동 함수
}
