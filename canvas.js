var canvas = document.getElementById("board");
// 透過此方法可以取得渲染環境及其繪圖函數
if(canvas.getContext) {
  var ctx = canvas.getContext('2d');
}

//更換背景
let img = new Image();
img.addEventListener('load',function(){
  let xy = img.naturalHeight/img.naturalWidth;
  ctx.drawImage(img,0,0,300,Math.floor(300*xy));
})

img.src="images/nento.jpg";

let imageInput = document.getElementById("picUpload");

//選擇圖片
imageInput.addEventListener("change",function(){
  
  let file = imageInput.files[0];
  let reader = new FileReader();

  reader.onload = e =>{
    let canvasWidth = canvas.width;
    let canvasheight = canvas.height;

    ctx.clearRect(0,0,canvasWidth,canvasheight);

    img.src = e.target.result;

  };

  reader.readAsDataURL(file);
})


//滑鼠畫圖
let isDrawing=false, startX =0, startY=0;

canvas.addEventListener("mousedown", event => { //點下滑鼠後記錄資料
  startX = event.offsetX;
  startY = event.offsetY;
  let strokeWidth = document.getElementById("strokeWidth");
  let color = document.getElementById("colorSelect");
  ctx.strokeStyle = color.value;
  ctx.lineWidth =strokeWidth.value;
  isDrawing = true;
});

canvas.addEventListener("mousemove", event => { //移動滑鼠時畫圖
  if(isDrawing==false){ return }
  else{
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(event.offsetX,event.offsetY);
    ctx.stroke();
    ctx.closePath();
    startX = event.offsetX;
    startY = event.offsetY;
  }
})

canvas.addEventListener("mouseup", event => { //放開滑鼠後
  startX = 0;
  startY = 0;
  isDrawing = false;
})


//下載圖片
document.getElementById("save").addEventListener("click",function(){
  const img = canvas.toDataURL("image/png");

  let a = document.createElement('a');
  a.setAttribute('download','test.png');
  a.setAttribute('href',img);
  a.click();

})
