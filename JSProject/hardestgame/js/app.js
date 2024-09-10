import {
  $redBox,
  $eatCircle1,
  $avoid,
  $hiddenClear,
  $clear,
  $death,
  $clearY,
} from "./getDom.js";
import {clear} from "./makeFunction.js";

function clearText() {
  var divs = document.querySelectorAll('.backgroundInGame1, .backgroundInGame2, .avoidCircle, .eatCircle, .box'); // 모든 클래스가 'backgroundInGame1' 또는 'backgroundInGame2'인 div 요소 선택
  divs.forEach(function(div) {
      div.textContent = ''; // 또는 div.innerText = '';
  });
}

// 페이지 로드 후 호출할 함수
window.onload = function() {
  clearText(); // 페이지 로드 후 텍스트를 지우기 위해 호출
};
//키보드 입력 함수
document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  delete keys[event.key];
});

const $boxStyle = getComputedStyle($redBox);
let x = parseInt($boxStyle.left);
let y = parseInt($boxStyle.top);
const initialX = x;
const initialY = y;
const boxSize = parseInt($boxStyle.width);
const step = 5;

export let keys = {};
let canMove = true; // 키보드 이벤트 활성/비활성 여부

function moveBox() {
  if (canMove) {
    // 키보드 이벤트가 활성화된 경우에만 움직임
    if ("ArrowLeft" in keys && !checkCollision("left")) {
      x = Math.max(x - step, 0);
    }
    if ("ArrowRight" in keys && !checkCollision("right")) {
      x = Math.min(window.innerWidth - boxSize, x + step);
    }
    if ("ArrowUp" in keys && !checkCollision("up")) {
      y = Math.max(y - step, 0);
    }
    if ("ArrowDown" in keys && !checkCollision("down")) {
      y = Math.min(window.innerHeight - boxSize, y + step);
    }
  }

  drawBox();
  requestAnimationFrame(moveBox);
}

function drawBox() {
  $redBox.style.left = x + "px";
  $redBox.style.top = y + "px";
}

function checkCollision(direction) {
  const $boxRect = $redBox.getBoundingClientRect();
  const $obstacles = document.querySelectorAll(
    ".leftborder, .rightborder, .topborder, .bottomborder, .leftLine, .rightLine, .topLine, .bottomLine"
  );

  let collision = false;

  $obstacles.forEach(function ($obstacle) {
    const obstacleRect = $obstacle.getBoundingClientRect();

    switch (direction) {
      case "left":
        if (
          $boxRect.left - 10 < obstacleRect.right &&
          $boxRect.right > obstacleRect.right &&
          $boxRect.top < obstacleRect.bottom &&
          $boxRect.bottom > obstacleRect.top
        ) {
          collision = true;
        }
        break;
      case "up":
        if (
          $boxRect.top - 10 < obstacleRect.bottom &&
          $boxRect.bottom > obstacleRect.bottom &&
          $boxRect.left < obstacleRect.right &&
          $boxRect.right > obstacleRect.left
        ) {
          collision = true;
        }
        break;
      case "right":
        if (
          $boxRect.right + 10 > obstacleRect.left &&
          $boxRect.left < obstacleRect.left &&
          $boxRect.top < obstacleRect.bottom &&
          $boxRect.bottom > obstacleRect.top
        ) {
          collision = true;
        }
        break;
      case "down":
        if (
          $boxRect.bottom + 10 > obstacleRect.top &&
          $boxRect.top < obstacleRect.top &&
          $boxRect.left < obstacleRect.right &&
          $boxRect.right > obstacleRect.left
        ) {
          collision = true;
        }
        break;
    }
  });

  return collision;
}

moveBox();

function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

const intervalId = setInterval(function () {
  const redBoxRect = $redBox.getBoundingClientRect();
  let result = 0;

  Array.from($eatCircle1).forEach((circle) => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      circle.style.display = "none";
    }
    if (circle.style.display !== "none") {
      result++;
    }
  });

  Array.from($avoid).forEach((circle) => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      // 충돌 발생 시 빨간 상자를 멈추고 opacity를 0으로 조절하는 애니메이션 추가
      $redBox.style.transition = "opacity 1s";
      $redBox.style.opacity = 0;

      // 1초 동안 키보드 이벤트 비활성화
      canMove = false;

      // 1초 후에 재시작 위치로 돌아가는 함수 호출
      setTimeout(() => {
        resetRedBoxPosition();

        // 충돌 후 노란공들을 다시 표시해주는 부분 추가
        Array.from($eatCircle1).forEach((circle) => {
          circle.style.display = "block";
        });

        // 키보드 이벤트 활성화
        canMove = true;
      }, 1000);
    }
  });

  let $redBoxCoor = $redBox.getBoundingClientRect();
  let $redBoxXCoor = Math.floor(redBoxRect.x);
  let $redBoxYCoor = Math.floor($redBoxCoor.y);
  if (
    result === 0 &&
    $redBoxXCoor > $clear - 23 &&
    $redBoxYCoor - 70 < $clearY
  ) {
    clearInterval(intervalId);
    clear();
  }
}, 100);

function resetRedBoxPosition() {
  // 재시작 위치로 돌아가는 애니메이션 추가
  $redBox.style.transition = "none"; // 애니메이션 초기화
  $redBox.style.opacity = 1; // opacity 초기화

  x = initialX;
  y = initialY;
  drawBox();
}
