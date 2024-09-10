
import { $game, $redBox, $eatCircle1, $clear, $avoid, $death } from "./getDom.js";
import {keys} from "./app.js";

document.querySelectorAll('.backgroundInGame1').forEach(function(element) {
  element.textContent = ''; 
});
document.querySelectorAll('.backgroundInGame2').forEach(function(element) {
  element.textContent = ''; 
});
document.querySelectorAll('.number').forEach(function(element) {
  element.textContent = ''; 
});


export const totalDeathObject = {
  totalDeath: null,
};



// 충돌 애니메이션 충돌중복감지
let isitColliding = false; // 충돌 감지 변수
let isAnimating = false; // 애니메이션 중인지 여부 변수

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


// 충돌 전체애니메이션 함수
export function detectCollision() {
  // $death.textContent = `DEATH: ${deathCount}`;
  
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
          // deathCount++;
          isAnimating = true;
          isitColliding = true; // 충돌 감지 상태로 변경
          // 1초 동안 키 입력 무시
          window.removeEventListener("keydown", function (event) {
            keys[event.key] = true;
          });
          window.removeEventListener("keyup", function (event) {
            delete keys[event.key];
          });
          deathCount++;
          
          // 충돌 애니메이션 실행
          redboxDeadAnimation();
        }
      }
    });
  }
  
  // 충돌 감지 0.1초마다 실행
  setTimeout(detectCollision, 100);
}

// 충돌 애니메이션 함수
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
      // 1초가 지나면 애니메이션 종료 후 리스폰
      redboxRespawn();
    }
  }

  opacityDecreasing();
}

// 리스폰 함수
function redboxRespawn() {
  // red box를 다시 화면에 표시하기 전에 원래 위치로 되돌리기
  const restartArea = document.querySelector(".start");
  // const parentRect = restartArea.parentElement.getBoundingClientRect();
  const restartAreaRect = restartArea.getBoundingClientRect();
  console.log(restartAreaRect);
  const redBoxX = restartAreaRect.left;
  const redBoxY = restartAreaRect.top;


  $redBox.style.left = `${redBoxX}px`;
  $redBox.style.top = `${redBoxY}px`;

  // red box 화면에 다시 표시
  $redBox.style.display = "block";

  //red box opacity 1로 되돌림
  $redBox.style.opacity = 1;


  // 충돌 감지 상태와 애니메이션 상태 초기화
  isitColliding = false;
  isAnimating = false;

  // 키 이벤트 다시 등록하는데 중복되니까 onkeyup으로 설정하기
  window.addEventListener("keydown", function (event) {
    keys[event.key] = true;
  });
  window.addEventListener("keyup", function (event) {
    delete keys[event.key];
  });

  console.log("리스폰 완료.");
}
