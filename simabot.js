// Create canvas
var canvas = document.createElement("canvas");
canvas.id = 'background';
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var waveI = 0;
var waveMode = true;
var waveI2 = 0;

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function renderWave(offsetX, offsetY){
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    for(var x = 0; x < canvas.width; x++){
        var iX = x + Math.sin(waveI2 / 200) * 100;
        var y = Math.sin(iX / 25) * 50 + canvas.height / 2;
        ctx.lineTo(x * 3 * offsetX, y + waveI * offsetY + (document.body.getBoundingClientRect().y * 1.5));
    }

    if(waveMode){
        waveI += .05;
    }else{
        waveI -= .05;
    }
    waveI2++;
    if(waveI > 200){
        waveMode = false;
    }
    if(waveI < 0){
        waveMode = true;
    }
    

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
}
function render(){
    var stateRender = true;
    if(stateRender){
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(50, 255, 50, 0.1)";
        renderWave(1, 1);
        ctx.fillStyle = "rgba(50, 255, 50, 0.3)";
        renderWave(1.18, 0.5);
        ctx.fillStyle = "rgba(50, 255, 50, 0.3)";
        renderWave(1.4, 1.2);
        ctx.fillStyle = "rgba(50, 255, 50, 0.1)";
        renderWave(1.6, 0.8);
    }
    requestAnimationFrame(render);
}
render();
resizeCanvas();

function radio(){
    var iframe = document.createElement("iframe");
    iframe.id = 'radio';
    iframe.height = "720";
    iframe.width = "1280";
    return iframe;
}

var radioWin = win.create('Radio', 'radioWin');
radioWin.onhide = function(){
    window.location.hash = '';
}
var radio = radio();
radioWin.add(radio);
function updateRadioWin(){
    if (window.location.hash == '#radio') {
        radio.src = 'radio/index.html';
        radioWin.show();
    }else{
        radioWin.hide();
    }
}
updateRadioWin();
window.addEventListener('hashchange', updateRadioWin);