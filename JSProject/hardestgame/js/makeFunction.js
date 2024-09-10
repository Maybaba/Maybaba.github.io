
import { $redBox, $game, $clear, $eatCircle1, $clearY } from './getDom.js';


// console.log(`$eatCircle1= ${{$eatCircle1}}`);
// 게임이 끝나려면 빨간박스의 x좌표값이 클리어존의 좌표값
// 보다 커지면 끝난다. 빨간박스의 x좌표값을 변수에 담는다.


// char의 z-index가 safeArea보다 높다면 delete element.
export function clear() {
  if (
    window.location.href ===
    "http://127.0.0.1:5500/hardestgame/html/yunjong.html"
  ) {
    let $redBoxCoor = $redBox.getBoundingClientRect();
    let $redBoxXCoor = Math.floor($redBoxCoor.x);
    let $redBoxYCoor = Math.floor($redBoxCoor.y)
    if ($redBoxXCoor > $clear - 23 || $redBoxYCoor > $clearY) {
      $game.innerHTML = "";
      window.location.href = "http://127.0.0.1:5500/hardestgame/html/subPage3.html";
      return;
    }
  } else {
    let $redBoxCoor = $redBox.getBoundingClientRect();
    let $redBoxXCoor = Math.floor($redBoxCoor.x);
    console.log($redBoxXCoor);

    if ($redBoxXCoor > $clear - 23) {
      // 23은 디테일, 끝내는 함수

      $game.innerHTML = "";
      window.location.href =
        "http://127.0.0.1:5500/hardestgame/html/subPage.html";

      return;
    }
  }
}



