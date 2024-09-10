const $box = document.querySelector(".box");
    const $boxStyle = getComputedStyle($box);
    let x = parseInt($boxStyle.left);
    let y = parseInt($boxStyle.top);
    const boxSize = parseInt($boxStyle.width); 
    const step = 5;

    let keys = {};

    // 키 다운 이벤트 처리
    window.addEventListener('keydown', function(event) {
        keys[event.key] = true;
    });

    // 키 업 이벤트 처리
    window.addEventListener('keyup', function(event) {
        delete keys[event.key];
    });

     function moveBox() {
        if ('ArrowLeft' in keys) {
            if (!checkCollision("left")) {
                x = Math.max(x - step, 0);
            }
        }
        if ('ArrowRight' in keys) {
            if (!checkCollision("right")) {
                x = Math.min(window.innerWidth - boxSize, x + step);
            }
        }
        if ('ArrowUp' in keys) {
            if (!checkCollision("up")) {
                y = Math.max(y - step, 0);
            }
        }
        if ('ArrowDown' in keys) {
            if (!checkCollision("down")) {
                y = Math.min(window.innerHeight - boxSize, y + step);
            }
        }

        drawBox();
        requestAnimationFrame(moveBox);
    }

    function drawBox() {
        $box.style.left = x + 'px';
        $box.style.top = y + 'px';
    }

    function checkCollision(direction) {
        const $box = document.querySelector(".box");
        const $boxRect = $box.getBoundingClientRect();
        const $obstacles = document.querySelectorAll(".leftborder, .rightborder, .topborder, .bottomborder");
      
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