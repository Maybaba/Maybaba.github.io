
// 노란 공
const $eatCircle1 = [...document.querySelectorAll('.eatCircle')]

// 파란 공
const $avoid = [...document.querySelectorAll('.avoidCircle')];

// 빨간 박스
const $redBox = document.querySelector(".box");

// 클리어 시 삭제에 필요한 변수
const $game = document.querySelector('.game')

// 클리어존
const $clearZone = document.querySelector(".clearZone");

// 클리어존의 x(가로)좌표 값을 변수에 담는 과정
const $clearZoneCoor = $clearZone.getBoundingClientRect();
const $clear = $clearZoneCoor.x;
const $clearY = $clearZoneCoor.y;
const $hiddenClear = document.querySelector('.land')


// 죽음 횟수 누ar적
const $death = document.querySelector('.deaths') 

export { $avoid, $redBox, $game, $hiddenClear, $clearZone, $clearZoneCoor, $clear, $eatCircle1, $death, $clearY };

