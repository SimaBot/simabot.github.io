var notify = {
    el: {},
    entered: false
};

notify.options = [
    "Get text from URL (req. URL)",
    "Get output from SimaBot (req. text)",
    "Get last post in VK group (req. id group)",
    "Get last video on YouTube channel (req. id channel)",
    "Get version of Android app on GPlay (req. app id)",
    "Get spin codes for Shindo (Roblox Game)",
    "Get last scripts for Roblox game (req. game name)",
    "Get last episode for anime (req. index from Animelist [0-5])",
    "Get video on YouTube (req. name)"
];

notify.descriptonOptions = {
    7: '[ "One Piece", "Boruto: Naruto Next Generations", "That Time I Got Reincarnated as a Slime", "My Hero Academy", "Pokemon" ]'
};
notify.loadOptions = function () {
    for (let i = 0; i < notify.options.length; i++) {
        const name = notify.options[i];
        const arr = name.split(' (req');
        var e = document.createElement('option');
        e.innerText = arr[0];
        notify.el.id.appendChild(e);
    }
}
notify.create = function (id, data, msg){
    var out = 'https://simabot.github.io/?i=' + id;
    if (data.length > 0) {
        out += '&d=' + encodeURIComponent(data);
     }
     if(msg.length > 0){
        out += '&m=' + encodeURIComponent(msg);
     }
    return out;
}

notify.update = function (){
    var data = notify.el.data.value;
    const url = notify.create(notify.el.id.selectedIndex, data, notify.el.msg.value);
    const arr = notify.options[notify.el.id.selectedIndex].split('(req.');
    if(arr.length > 1){
        notify.el.data.style.display = '';
        notify.el.data.placeholder = notify.options[notify.el.id.selectedIndex].split('(req.')[1].replace(')', '');
    }else{
        notify.el.data.style.display = 'none';
    }
    notify.el.desc.innerText = notify.descriptonOptions[notify.el.id.selectedIndex] || '';
    notify.el.output.value = url;
}

notify.importFromURL = function (){
    const out = notify.parser(window.location.href);
    notify.el.output.value = window.location.href;
    if (out.error) {
        if(out.error != '07'){
            notify.btnNE.innerText += ' Error: ' + out.error;
        }
        return;
    }
    notify.entered = true;
    notify.msg.value = out.msg || '';
    notify.data.value = out.data || '';
    notify.id.selectedOptions = out.id;
}
notify.parser = function (url) {
    var out = {
        id: -1,
        data: ' ',
        msg: ' '
    };
    var urlObj = null;

    try {
        urlObj = new URL(url);
    }
    catch (err) {
        return { error: '04' };
    }

    if (!urlObj) {
        return { error: '03' };
    }
    const params = urlObj.searchParams;
    out.id = Number(params.get('n')) || -1;
    if (out.id == -1) {
        return { error: '07' };
    }
    out.data = decodeURIComponent(out.data);
    out.msg = params.get('m');
    out.msg = decodeURIComponent(out.msg);
    return out;
}

notify.buildGUI = function () {
    var gui = document.createElement('div');
    gui.className = 'gui-notify';

    var title = document.createElement('h1');
    title.innerText = 'Create notification for SimaBot!';
    gui.appendChild(title);

    var title2 = document.createElement('h2');
    title2.innerText = 'Editor';
    gui.appendChild(title2);

    var editor = document.createElement('div');
    gui.appendChild(editor);

    var actionEditor = document.createElement('div');
    actionEditor.className = 'action-notify';
    editor.appendChild(actionEditor);

    var name = document.createElement('p');
    name.innerText = 'Action';
    actionEditor.appendChild(name);

    notify.el.id = document.createElement('select');
    actionEditor.appendChild(notify.el.id);

    notify.el.data = document.createElement('input');
    actionEditor.appendChild(notify.el.data);

    notify.el.desc = document.createElement('p');
    editor.appendChild(notify.el.desc);

    
    notify.el.msg = document.createElement('input');
    notify.el.msg.placeholder = 'Message';
    editor.appendChild(notify.el.msg);

    var msg = document.createElement('p');
    msg.innerText = 'URL:';
    editor.appendChild(msg);

    notify.el.output = document.createElement('textarea');
    notify.el.output.readOnly = true;
    editor.appendChild(notify.el.output);

    var instruction = document.createElement('h2');
    instruction.innerText = 'Instruction';
    gui.appendChild(instruction);

    var instructionText = document.createElement('div');
    gui.appendChild(instructionText);

    var tip = document.createElement('p');
    tip.innerText = 'Tip: Write [] to change output position.';
    instructionText.appendChild(tip);

    var p1 = document.createElement('p');
    p1.innerText = '1. Enter what you need.';
    instructionText.appendChild(p1);

    var p2 = document.createElement('p');
    p2.innerText = '2. Send generated URL to any channel, where you need to receive notification.';
    instructionText.appendChild(p2);

    var p3 = document.createElement('p');
    p3.innerText = '3. Everything just works!';
    instructionText.appendChild(p3);
    return gui;
}
notify.load = function () {
    var gui = notify.buildGUI();
    notify.el.id.onchange = notify.el.data.oninput = notify.el.msg.oninput = notify.update;
    notify.loadOptions();
    notify.importFromURL();
    notify.update();
    return gui;
}

notify.updateWindow = function () {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if(hash == 'notify'){
            notify.win.show();
        }
    }
}

notify.init = function () {
    notify.btnNE = document.getElementById('btn-notifyeditor');
    notify.win = win.create('Notify Editor');
    notify.win.onhide = function () {
        window.location.hash = '';
    }
    notify.win.add(notify.load());
    if (window.location.hash == '#notify') {
        notify.win.show();
    }else{
        if (!notify.entered) {
            notify.win.hide();
        }
    }
    window.addEventListener('hashchange', function (e) {
        notify.updateWindow();
    });
}

notify.init();