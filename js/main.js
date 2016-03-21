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

    actions = quick[i].actions;
    for (var j = 0; j < actions.length; j++) {
      // set links
      actionList[i].innerHTML += "<li><a href=\"" + actions[j].url + "\">" + actions[j].label + "</a></li>"
    }
  }
}

function active_tab(){
   
    var ref=this.hash || window.location.hash;//||
    var all_tabs=all("#tab");
    for(var i=0 ; i<all_tabs.length ; i++){

        if(all_tabs[i].hash===ref){
            all_tabs[i].parentNode.className+=" active-tab";
              $(all_tabs[i].hash).classList.remove('hidden');
        }
        else{
             all_tabs[i].parentNode.className= 'option';

            $(all_tabs[i].hash).classList.add('hidden');
        }
    }
}
function  keyEvent(e){
    var hashLocation=window.location.hash;
    switch (e.keyCode) {
        case 37:{
                if(hashLocation=="#my-team-folders"){
                window.location.hash="#my-folders";
                active_tab();

                }
               else if (hashLocation=="#my-folders"){
                window.location.hash="#quick-reports";
                active_tab();
               
               }
               else if (hashLocation=="#public-folders") {
                window.location.hash="#my-team-folders";
                active_tab();
                }

            break;
        }
        case 39:{
            if (hashLocation=="#quick-reports"){
                    window.location.hash="#my-folders";
                active_tab();
               
               }

            if(hashLocation=="#my-folders"){
                window.location.hash="#my-team-folders";
                active_tab();
                }
             
            if (hashLocation=="#my-team-folders") {
                    window.location.hash="#public-folders";
                  active_tab();
                }
                
            break;
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

    var all_tabs=all("#tab");
    for(var i=0;i<all_tabs.length;i++){

        all_tabs[i].addEventListener('click',active_tab)
    }
    document.addEventListener('keydown',keyEvent);


       
}

window.onLoad= start_page();