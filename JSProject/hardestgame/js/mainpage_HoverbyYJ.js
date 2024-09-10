const $start = document.querySelector('.a-playGame')

  //게임시작, 나가기 버튼 
  const playGame = document.getElementById('playGame');
  const exit = document.getElementById('exit');

  //버튼에 mouseover 시, animation opacity = 1 효과
  playGame.addEventListener('mouseover',() => {
    document.querySelector('.redbox-anime .first').style.opacity =1;
  });
//버튼에서 mouseout 시, animation opacity = 0 효과
  playGame.addEventListener('mouseout', () => {
    document.querySelector('.redbox-anime .first').style.opacity =0;
  });

  exit.addEventListener('mouseover', function() {
    document.querySelector('.redbox-anime .second').style.opacity =1;
  });

  exit.addEventListener('mouseout', function() {
    document.querySelector('.redbox-anime .second').style.opacity =0;
  });

  function startGame() {
    window.location.href= "http://127.0.0.1:5500/hardestgame/html/kibeom.html"
  }
  $start.addEventListener('click', startGame)

