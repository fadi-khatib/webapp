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




var tabs =document.getElementsByClassName("tabs");

for (var i = 0; i < tabs.length; i++) {
    alert("by");
    tabs[i].addEventListener("click", set_tab);
  };





var set_tab = function(){
        var tabsList =document.getElementsByClassName("tabs");
        // current tab hash
        var active=this.hash;

    for (var i = 0; i < tabsList.length; i++) {
        if (tabsList[i].hash == active) {
          x=tabsList[i].parentNode;
          // set the tab toggle class to be active-tab
          x.className+=' active';
        } else {
          // remove the tab-active class from the other tabs
          x=tabsList[i].parentNode;
          x.className='';
          // hide the other tabs content
        $(tabsList[i].hash).classList.add('hidden');
        }
      }
    // show current tab content
     $(active).classList.remove('hidden');

     localStorage.setItem("lastTab", active);


};




function start_page(){
    document.getElementById("quick-reports-options-putton").addEventListener('click',function(e){
        $("#quickreports").classList.toggle('hidden');

    });
    var tabs =document.getElementsByClassName("links");

    for (var i = 0; i < tabs.length; i++) {
    alert(tabs[i]);
    tabs[i].addEventListener("click", set_tab);
     };
     document.getElementById(" id="tabs"").addEventListener('click',function(e){
        $("#quickreports").classList.toggle('hidden');

    });

}

window.onLoad= start_page();