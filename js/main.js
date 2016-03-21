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

function updateNotifications(notif){
  if(notif != undefined){
        $(".notifications").innerHTML = notif;
    }
       
}
function  updateActionList(quick){
    var quickList=all(".nav-section");

  for (var i = 0; i < quickList.length; i++) {
    // set header for every nav-section
    quickList[i].innerHTML = "<p>" + quick[i].label + "</p>" + quickList[i].innerHTML;
    // set background for every nav-section
    quickList[i].style.background = "black url(./img/icons/" + quick[i].icon + ".png)  left 50% top 70px no-repeat";
    }
  var menuList = all(".menu-caption");
  for (var i = 0; i < menuList.length; i++) {
    // menu header
    menuList[i].innerHTML = "<p>" + quick[i].actionsLabel + "</p>";
  }
  var actionList = all(".action-list");
  for (var i = 0; i < actionList.length; i++) {
    alert(actionList.length);
    actions = actionList[i].actions;
    for (var j = 0; j < actions.length; j++) {
      // set links
      actionList[i].innerHTML += "<li><a href=\"" + actions[j].url + "\">" + actions[j].label + "</a></li>"
    }
  }
}




function updatePage (config) {
        updateNotifications(config.notification);
         updateActionList(config.quickActions);
}

function start_page(){
    UTILS.ajax("data/config.json" , {done: updatePage});       

    document.getElementById("quick-reports-options-putton").addEventListener('click',function(e){
        $("#quickreports").classList.toggle('hidden');

    });
    alert("hi");
       
}

window.onLoad= start_page();