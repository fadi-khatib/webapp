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



/*function checkinputs(){
    var name=[];
    var url=[];
    var i;
    var urlExp = new RegExp("https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}", i); 
    var linkExp = new RegExp(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/);

    name = all(".reportname");
    url = all(".reporturl");
    // check if empty
    for(i=0;i<6;i++){
        if ((name[i].children[1].value =="") && (url[i].children[1].value !=""))
           {
            name[i].children[1].style.border="thick solid red";
            name[i].children[1].focus();
            return false;
           }
      else  if ((name[i].children[1].value !="") && ((url[i].children[1].value =="")|| (!linkExp.test(url[i].children[1].value))))
        {
            url[i].children[1].style.border="thick solid red";
            url[i].children[1].focus();
            return false;
        }

        
       else if((!urlExp.test(url[i].children[1].value)) &&((name[i].children[1].value !="")) &&((url[i].children[1].value !=""))){
            var newURL = "http://www.";
            newURL+=url[i].children[1].value ;
            url[i].children[1].value  = newURL;
            url[i].children[1].text  = newURL;
        }
        else if((url[i].children[1].value =="") && (name[i].children[1].value =="") )
        {
            url[i].children[1].style.border="none";
             name[i].children[1].style.border="none";
          
        }



    }
    for(i=0;i<6;i++){
    url[i].children[1].style.border="none";
    name[i].children[1].style.border="none";
    }
    return true;
}
*/
/*****************************************************************************************************/
function savelinksReports () {
    var name=[];
    var url=[];
    var array=[];
    name = all(".reportname");
    url = all(".reporturl");

    var i;
    for (i=0;i<3;i++)
    {
        
        var rn = name[i].children[1].value;
        var ru = url[i].children[1].value;   
 
        array.push({
                "name":rn,
                "url":ru
        });
    
        
    }
    alert(name[0].children[1].value;);
    alert(url[0].children[1].value;);
    alert(array[0].name);
    var linkarray = JSON.parse(localStorage.getItem("linkarray"));
    if(linkarray==null)
    {
        linkarray=[];
          for (i=0;i<3;i++)
    {
        linkarray.push({
                "name":"",
                "url":""


        });
    }
    }

     for (i=0;i<3;i++)
    {
        linkarray[i].name=array[i].name;
        linkarray[i].url=array[i].url;
        
    }

    alert(linkarray[0].name);
    localStorage.setItem("linkarray" , JSON.stringify(linkarray));

        updatelinksReports();

}
/*************************************************************************************/
function updatelinksReports () {


    var flag;
    flag=0;
    var selectReports = $("#quick-reports-adress");
    var button = $("#quick-reports-expand-link");
    var setting=$("#quickreports");
     alert(selectReports.length);
    for(var i=0; i<3; i++)
    {
        selectReports.remove(selectReports.i);
    }
    var valReports = JSON.parse(localStorage.getItem("linkarray"));
            if (valReports==null) return;
        for(var i=0; i<3; i++){      
        if(valReports[i]!=null){
                var myOption = document.createElement("options");
                myOption.text = valReports[i].name;
                myOption.value = valReports[i].name;
                selectReports.appendChild(myOption);
                if(valReports[i].name=="")
                {
                    myOption.classList.add("hidden");
                    flag=flag+1;
                }
                else
                {
                    selectReports.classList.remove("hidden");

                    button.classList.remove("hidden");
                    setting.style.marginTop="0px";

                }
        }   
        else
        {
            var myOption = document.createElement("option");
                myOption.text = "";
                myOption.value = "";
                selectReports.appendChild(myOption);

                    myOption.classList.add("hidden");
                     flag=flag+1;
        }
    }
       if (flag==3)
    {
        selectReports.className+=" hidden";
        button.className+=" hidden";
        setting.style.marginTop="40px";
    }

}
/*****************************************************************************************************************/
function selectIFrame() {
    var selReports = $("#quick-reports-adress");
    var selIndex = selReports.selectedIndex;
    var newURL = JSON.parse(localStorage.getItem("linkarray"));
    var iframeWindow = $("#quickreportsiframe");
    if(newURL[selIndex]!=null){
        iframeWindow.src = newURL[selIndex].url;
        $("#quick-reports-expand-link").href = newURL[selIndex].url;
    }
}
/*****************************************************************************************************************/
function quickrports_save(){

       // if(checkinputs()==true){
            savelinksReports();
           $("#quickreports").classList.toggle('hidden');
           selectIFrame();
        
    //}

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
    document.getElementById("quickrports-save").addEventListener('click',quickrports_save);

    var all_tabs=all("#tab");
    for(var i=0;i<all_tabs.length;i++){

        all_tabs[i].addEventListener('click',active_tab)
    }
    document.addEventListener('keydown',keyEvent);


       
}

window.onLoad= start_page();