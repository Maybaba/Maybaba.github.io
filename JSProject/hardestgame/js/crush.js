import clear from './makeFunction.js';
import { $clear } from './getDom.js';


// // DOM 요소 가져오기
// const $redBox = document.getElementById('redbox');
// const $eatCircleFirst = document.getElementById('eatCircleFirst');
// const $eatCircleSecond = document.getElementById('eatCircleSecond');
// const $eatCircleThird = document.getElementById('eatCircleThird');
// const $eatCircleFourth = document.getElementById('eatCircleFourth');
// const $count = document.querySelector(".count");






// DOM 요소 가져오기


const $redBox = document.getElementById('redbox');

const $eatCircle = document.querySelectorAll(".eatCircle");


// const $eatCircleFirst = document.getElementById('eatCircleFirst');
// const $eatCircleSecond = document.getElementById('eatCircleSecond');
// const $eatCircleThird = document.getElementById('eatCircleThird');
// const $eatCircleFourth = document.getElementById('eatCircleFourth');


// 충돌 감지 함수
export function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

  // 매 100ms마다 각 동그라미와의 충돌 감지
 const intervalId = setInterval(function () {
  // 빨간 박스의 위치 및 크기 가져오기
  const redBoxRect = $redBox.getBoundingClientRect();

  // 각 동그라미마다 충돌 여부 확인 및 처리
  let result = 0;
  $eatCircle.forEach(circle => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      circle.style.display = "none";
      
    }
    if (circle.style.display !== "none") {
      result++;
    }
  });


  let $redBox_Rect = Math.floor(redBoxRect.x)

  // 남은 동그라미 수가 0일 때 게임 종료
  if (result === 0 && $redBox_Rect > $clear -23 ) {
    clearInterval(intervalId);
    console.log(result);
    clear();
  }
}, 100); // 매 100ms마다 충돌 감지

export {intervalId}; 









