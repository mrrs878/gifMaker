/*
 * @Author: your name
 * @Date: 2021-04-27 10:47:50
 * @LastEditTime: 2021-04-27 17:16:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gif-maker/js/index.js
 */
(() => {
  try {
    const { GIF } = window;

    const str = "Typewriter gif";
    let strIndex = 0;

    const pointImg = document.querySelector("#pointImg");
    const canvasElement = document.querySelector("#typed");
    const canvasCtx = canvasElement.getContext('2d');
    let renderFinished = false;
    let isWorking = false;
    const gif = new GIF({
      workers: 2,
      quality: 1,
      width: 900,
      height: 400,
      workerScript: "./assets/gif.worker.js"
    });

    function draw(cb) {
      function draw() {
        if(renderFinished) return;
        canvasCtx.fillStyle = "#f00";
        canvasCtx.font = "48px Sans-serif";
        canvasCtx.fillText(str[strIndex], (strIndex++) * 30 + 10, 100);
        cb(canvasElement);
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
    }

    function addFrame() {
      if (renderFinished) return;
      if (str[strIndex]) {
        gif.addFrame(canvasElement, { copy: true, delay: 200 });
      } else {
        gif.addFrame(canvasElement, { copy: true, delay: 200 });
        console.log(gif.frames.length);
        gif.render();
        renderFinished = true;
      }
    }

    function initCanvas() {
      canvasCtx.beginPath();
      canvasCtx.fillStyle = "#000";
      canvasCtx.moveTo(10, 0);
      canvasCtx.lineTo(890, 0);
      canvasCtx.arc(890, 10, 10, 1.5*Math.PI, 0);
      canvasCtx.lineTo(900, 390);
      canvasCtx.arc(890, 390, 10, 0, 0.5*Math.PI);
      canvasCtx.lineTo(10, 480);
      canvasCtx.arc(10, 390, 10, 0.5*Math.PI, Math.PI);
      canvasCtx.lineTo(0, 10);
      canvasCtx.arc(10, 10, 10, Math.PI, 1.5*Math.PI);
      canvasCtx.fill();
      canvasCtx.clip();
      canvasCtx.drawImage(pointImg, 10, 10, 70, 20);
    }

    function gifRender() {
      if (isWorking) return;
      isWorking = true;

      gif.on("finished", (blob) => {
        // window.open(URL.createObjectURL(blob));
      });
      draw(addFrame);
    }

    initCanvas();
    gifRender();
  } catch (e) {
    console.log(e);
  }
})();
