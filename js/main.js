function $(selector) {
    return document.querySelector(selector);
}

function all(selector) {
    return document.querySelectorAll(selector);
}

function remove(element) {
    element.parentNode.removeChild(element);
}


var addEventListener = function(obj, evt, fnc) {
if (document.addEventListener) {
    var addEvent = function(elem, type, handler) {
        elem.addEventListener(type, handler, false)
    }
    var removeEvent = function(elem, type, handler) {
        elem.removeEventListener(type, handler, false)
    }
} else {
    var addEvent = function(elem, type, handler) {
        elem.attachEvent("on" + type, handler)
    }
    var removeEvent = function(elem, type, handler) {
        elem.detachEvent("on" + type, handler)
    }
}

};








function start_page(){
    document.getElementById("quick-reports-options-putton").addEventListener('click',function(e){
        $("#quickreports").classList.toggle('hidden');

    });
    alert("hi");
    alert(config.notification);
        $(".notifications").innerHTML = "fadi";//config.notification;
       
}

window.onLoad= start_page();