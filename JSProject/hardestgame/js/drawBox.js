import { $redBox, $boxStyle } from "./getDom.js";

let x = parseInt($boxStyle.left);
let y = parseInt($boxStyle.top);
 export function drawBox() {
  $redBox.style.left = x + "px";
  $redBox.style.top = y + "px";
}