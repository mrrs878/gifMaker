/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2021-04-27 10:47:50
 * @LastEditTime: 2021-04-28 19:47:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gif-maker/js/index.js
 */
const { GIF, alert } = window;
const Elements = {
  canvas: document.querySelector("#typed"),
  textArea: document.querySelector("#text"),
  fontSizeInput: document.querySelector("#fontSize"),
  confirmBtn: document.querySelector("#confirmBtn"),
  renderingModal: document.querySelector("#renderingModal"),
  progressTip: document.querySelector("#progressTip"),
}

function initCanvas(canvasElement) {
  return new Promise((resolve, reject) => {
    const canvasCtx = canvasElement.getContext("2d");
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

    const image = new Image();
    image.src = "./assets/point.png";
    image.onload = () => {
      canvasCtx.drawImage(image, 10, 10, 70, 20);
      resolve();
    };
    image.onerror = (error) => {
      reject(error);
    }
  })
}

function drawText({ canvasElement, text, cb, fontSize }) {
  let strIndex = 0;
  return new Promise((resolve) => {
    function draw() {
      if(strIndex >= text.length) {
        resolve();
        return;
      }
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.font = `${fontSize || 24}px Sans-serif`;
      const lines = text.match(/[^\r\n]+/g);
      for(let i = 0; i < lines.length; i++) {
        const yL =  30 * (i+1) + 30;
        canvasCtx.fillStyle = "#000";
        canvasCtx.fillText(lines[i].slice(0, strIndex), 10, yL);
        canvasCtx.fillStyle = "#f00";
        canvasCtx.fillText(lines[i].slice(0, ++strIndex), 10, yL);
      }
      cb(canvasElement, { copy: true, delay: 200 });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  });
}

async function initRender(gif) {
  gif.log = (msg) => {
    Elements.progressTip.innerText += `\r\n${msg}`;
    Elements.progressTip.scrollTop = Elements.progressTip.scrollHeight;
  }
  gif.on("finished", (blob) => {
    gif.running = false;
    gif.frames = [];
    Elements.renderingModal.classList.remove("active");
    window.open(URL.createObjectURL(blob));
  });
}

function initEvents(gif, canvasElement, textElement) {
  Elements.confirmBtn.addEventListener("click", async () => {
    const text = textElement.value;
    if (!text) {
      alert("请输入要生成的文字");
      return;
    }
    Elements.progressTip.innerText = "";
    const fontSize = Elements.fontSizeInput.value;
    await initCanvas(canvasElement);
    await drawText({ canvasElement, text, cb: gif.addFrame.bind(gif), fontSize });
    Elements.renderingModal.classList.add("active");
    renderFinished = true;
    gif.render();
  });
}

function init() {
  try {
    const gif = new GIF({
      workers: 2,
      quality: 1,
      width: 900,
      height: 400,
      debug: true,
      workerScript: "./assets/gif.worker.js"
    });
    initCanvas(Elements.canvas);
    initRender(gif);
    initEvents(gif, Elements.canvas, Elements.textArea);
  } catch (e) {
    console.log(e);
  }
}

init();
