function radio(){
    var iframe = document.createElement("iframe");
    iframe.id = 'radio';
    iframe.height = "720";
    iframe.width = "1280";
    return iframe;
}
function updateRadioWin(){
    if (window.location.hash == '#radio') {
        radio.src = 'radio/index.html';
        radioWin.show();
    }else{
        radioWin.hide();
    }
}

var radioWin = win.create('Radio', 'radioWin');
radioWin.onhide = function(){
    window.location.hash = '';
}
var radio = radio();
radioWin.add(radio());
updateRadioWin();
window.addEventListener('hashchange', updateRadioWin);