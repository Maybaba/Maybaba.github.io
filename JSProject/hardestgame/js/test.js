import { $game, $redBox, $eatCircle1, $clear, $avoid } from "./getDom.js";

console.log(`$eatCircle1= ${{ $eatCircle1 }}`);

let isitColliding = false; // 충돌 감지 변수
let isAnimating = false; // 애니메이션 중인지 여부 변수

function clear() {
  if (true) {
    let $redBoxCoor = $redBox.getBoundingClientRect();
    let $redBoxXCoor = Math.floor($redBoxCoor.x);
    console.log($redBoxXCoor);

    if ($redBoxXCoor > $clear - 23) {
      console.log(`dddd`);

      $game.innerHTML = "";
      window.location.href =
        "http://127.0.0.1:5500/hardestgame/html/subPage.html";
      return;
    }
  }
}

const $boxStyle = getComputedStyle($redBox);
let x = parseInt($boxStyle.left);
let y = parseInt($boxStyle.top);
const boxSize = parseInt($boxStyle.width);
const step = 5;

let keys = {};

window.addEventListener("keydown", function (event) {
  if (!isitColliding) {
    // 충돌이 발생하지 않았을 때만 키 이벤트 처리
    keys[event.key] = true;
  }
});

window.addEventListener("keyup", function (event) {
  if (!isitColliding) {
    // 충돌이 발생하지 않았을 때만 키 이벤트 처리
    delete keys[event.key];
  }
});

function moveBox() {
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
  requestAnimationFrame(moveBox);
}

function drawBox() {
  $redBox.style.left = x + "px";
  $redBox.style.top = y + "px";
}

function checkCollision(direction) {
  const $boxRect = $redBox.getBoundingClientRect();
  const $obstacles = document.querySelectorAll(
    ".leftborder, .rightborder, .topborder, .bottomborder"
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

// 노란 공 충돌 감지
const intervalId = setInterval(function () {
  const redBoxRect = $redBox.getBoundingClientRect();
  let result = 0;

  $eatCircle1.forEach((circle) => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      circle.style.display = "none";
    }
    if (circle.style.display !== "none") {
      result++;
    }
  });

  let $redBoxXCoor = Math.floor(redBoxRect.x);

  if (result === 0 && $redBoxXCoor > $clear - 23) {
    clearInterval(intervalId);
    clear();
  }
}, 100);

// 충돌 애니메이션
function detectCollision() {
  if (!isitColliding) {
    const redBoxRect = $redBox.getBoundingClientRect();

    $avoid.forEach(($avoid) => {
      const avoidRect = $avoid.getBoundingClientRect();

      if (
        !(
          redBoxRect.right < avoidRect.left ||
          redBoxRect.left > avoidRect.right ||
          redBoxRect.bottom < avoidRect.top ||
          redBoxRect.top > avoidRect.bottom
        )
      ) {
        if (!isAnimating) {
          isAnimating = true;
          isitColliding = true; // 충돌 감지 상태로 변경

          // 1초 동안 키 입력 무시
          window.removeEventListener("keydown", function (event) {
            keys[event.key] = true;
          });
          window.removeEventListener("keyup", function (event) {
            delete keys[event.key];
          });

          // 충돌 애니메이션 실행
          redboxDeadAnimation();
        }
      }
    });
  }

  setTimeout(detectCollision, 100);
}


//충돌 애니메이션 함수
function redboxDeadAnimation() {
  const redBoxCollide = $redBox.getBoundingClientRect();
  const startTime = Date.now();

  function opacityDecreasing() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < 1000) {
      const opacity = 1 - elapsedTime / 1000;
      $redBox.style.left = `${redBoxCollide.offsetLeft}px`;
      $redBox.style.top = `${redBoxCollide.offsetTop}px`;
      $redBox.style.opacity = opacity;
      requestAnimationFrame(opacityDecreasing);
    } else {
      // 1초 후에 충돌 감지 상태 및 애니메이션 종료
      isAnimating = false;
      isitColliding = false; // 충돌 감지 상태를 해제합니다.

      // 1초 후에 키 이벤트 다시 등록
      window.addEventListener("keydown", function (event) {
        keys[event.key] = true;
      });
      window.addEventListener("keyup", function (event) {
        delete keys[event.key];
      });

      console.log(`충돌애니메이션 끝, elapsetime : ${elapsedTime}`);
    }
  }
  opacityDecreasing();
  // 충돌 애니메이션이 종료된 후에 restart area로 이동
  // moveRedBoxToRestartArea();

  console.log("restart area로 이동.");

  const restartArea = document.getElementById("safeArea");
  const parentRect = restartArea.parentElement.getBoundingClientRect(); // 부모 요소의 위치를 가져옴
  const restartAreaRect = restartArea.getBoundingClientRect();

  // red box의 위치를 restart area의 위치로 설정
  const redBoxX = restartAreaRect.left - parentRect.left; // 부모 요소를 기준으로 계산
  const redBoxY = restartAreaRect.top - parentRect.top; // 부모 요소를 기준으로 계산

  $redBox.style.left = `${redBoxX}px`;
  $redBox.style.top = `${redBoxY}px`;

  console.log(`red box의 위치를 (${redBoxX}px, ${redBoxY}px)로 재설정함.`);
}
detectCollision();