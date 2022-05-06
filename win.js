var win = {};

// from https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt, el2) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (el2) {
        el2.onmousedown = dragMouseDown;
        // if present, the header is where you move the DIV from:
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

win.create = function(title, id) {
    var win = document.createElement('div');
    win.id = id;
    var vWin;
    win.hide = function() {
        if (win.style.display != 'none') {
            win.style.display = 'none';
            if(vWin.onhide){
                vWin.onhide();
            }
        }
    }
    win.show = function() {
        if(win.style.display != '') {
            win.style.display = '';
            if(vWin.onshow){
                vWin.onshow();
            }
        }
    }
    win.className = 'win';
    win.style.left = '0px';
    win.style.top = '0px';
    var winBar = document.createElement('div');
    winBar.className = 'win-bar';
    var winTitle = document.createElement('h1');
    winTitle.innerText = title;
    winBar.appendChild(winTitle);
    
    var winClose = document.createElement('p');
    winClose.className = 'win-close';
    winClose.innerText = '✖';
    winClose.onclick = win.hide;
    
    winBar.appendChild(winClose);
    
    win.appendChild(winBar);
    dragElement(win, winBar);
    var winInner = document.createElement('div');
    winInner.className = 'win-inner';
    win.appendChild(winInner);
    document.body.appendChild(win);
    vWin = {
        hide: win.hide,
        show: win.show,
        add: function (e) {
            winInner.appendChild(e);
        },
        onhide: null,
        onshow: null
    };
    return vWin;
}
