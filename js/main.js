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



function checkinputs(){
    var names=[];
    var url=[];
    
    names = all(".reportname");
    url = all(".reporturl");
    for(var i=0;i<3;i++){
        if ((names[i].children[1].value =="") && (url[i].children[1].value !=""))
           {
            names[i].children[1].style.border="thick solid red";
            names[i].children[1].focus();
            return false;
           }
      else  if ((names[i].children[1].value !="") && (url[i].children[1].value ==""))
        {
            url[i].children[1].style.border="thick solid red";
            url[i].children[1].focus();
            return false;
        }
        else if((url[i].children[1].value =="") && (names[i].children[1].value =="") )
        {
            url[i].children[1].style.border="none";
             names[i].children[1].style.border="none";
          
        }
    }
    for(var i=0;i<3;i++){
    url[i].children[1].style.border="none";
    names[i].children[1].style.border="none";
    }
    return true;
}

/***********************************************************************************/
function folderScheckinputs(){
    var names=[];
    var url=[];
    
    names = all(".foldername");
    url = all(".folderurl");
    for(var i=0;i<3;i++){
        if ((names[i].children[1].value =="") && (url[i].children[1].value !=""))
           {
            names[i].children[1].style.border="thick solid red";
            names[i].children[1].focus();
            return false;
           }
      else  if ((names[i].children[1].value !="") && (url[i].children[1].value ==""))
        {
            url[i].children[1].style.border="thick solid red";
            url[i].children[1].focus();
            return false;
        }
        else if((url[i].children[1].value =="") && (names[i].children[1].value =="") )
        {
            url[i].children[1].style.border="none";
             names[i].children[1].style.border="none";
          
        }
    }
    for(var i=0;i<3;i++){
    url[i].children[1].style.border="none";
    names[i].children[1].style.border="none";
    }
    return true;
}
/*****************************************************************************************************/
function savelinksReports () {
    var names=[];
    var url=[];
    var array=[];
    names = all(".reportname");
    url = all(".reporturl");

    
    for (var i=0;i<3;i++)
    {
        
        var rn = names[i].children[1].value;
        var ru = url[i].children[1].value;
       // if(rn!=""&&ru!=""){   
            array.push({
                    "name":rn,
                    "url":ru
            });
        //}
        
    }
    var linkarray = JSON.parse(localStorage.getItem("linkarray"));
    if(linkarray==null){
        linkarray=[];
        for (i=0;i<3;i++)
        {
        linkarray.push({
                "name":"",
                "url":""

        });
        }
    }
    $("#quick-reports-adress").innerHTML="";
     for (i=0;i<3;i++)
    {
        linkarray[i].name=array[i].name;
        linkarray[i].url=array[i].url;
        if(array[i].name!="" && array[i].url!="" ){
            $("#quick-reports-adress").innerHTML+="<option value='"+linkarray[i].url+"'>"+linkarray[i].name+"</option>";
        }
    }
    localStorage.setItem("linkarray" , JSON.stringify(linkarray));
    setReportAdress();
    //var link = JSON.parse(localStorage.getItem("linkarray"));
        //updatelinksReports();

}




function savelinksFolders(){
    var names=[];
    var url=[];
    var array=[];
    names = all(".foldername");
    url = all(".folderurl");

    
    for (var i=0;i<3;i++)
    {
        
        var rn = names[i].children[1].value;
        var ru = url[i].children[1].value;
       // if(rn!=""&&ru!=""){   
            array.push({
                    "name":rn,
                    "url":ru
            });
        //}
        
    }
    var foldersarray = JSON.parse(localStorage.getItem("foldersarray"));
    if(foldersarray==null){
        foldersarray=[];
        for (i=0;i<3;i++)
        {
        foldersarray.push({
                "name":"",
                "url":""

        });
        }
    }
    $("#my-team-folder-adress").innerHTML="";
     for (i=0;i<3;i++)
    {
        foldersarray[i].name=array[i].name;
        foldersarray[i].url=array[i].url;
        if(array[i].name!="" && array[i].url!="" ){
            $("#my-team-folder-adress").innerHTML+="<option value='"+foldersarray[i].url+"'>"+foldersarray[i].name+"</option>";
        }
    }
    localStorage.setItem("foldersarray" , JSON.stringify(foldersarray));
    setFoldersAdress();
    //var link = JSON.parse(localStorage.getItem("linkarray"));
        //updatelinksReports();

}
/*************************************************************************************/

/*****************************************************************************************************************/

/*****************************************************************************************************************/
function quickrports_save(){

       if(checkinputs()==true){
           savelinksReports();
           $("#quickreports").classList.toggle('hidden');
       
    }

}
function folders_save(){
          if(folderScheckinputs()==true){
           savelinksFolders();
           $("#my-team-folders-form").classList.toggle('hidden');
       
    } 
}
/*************************************************************************************************************/
function setReportAdress() {
    var el=document.getElementById("quick-reports-adress");
    if(el.options[el.selectedIndex]!=null){
        $('#quick-reports-expand-link').href=el.options[el.selectedIndex].value;
        $('#quickreportsiframe').src=el.options[el.selectedIndex].value;
        $("#quick-reports-adress").classList.remove('hidden');
        $("#quick-reports-expand-link").classList.remove('hidden');
    }
    else{
        $('#quickreportsiframe').src="";
        $("#quick-reports-adress").classList.add('hidden');
        $("#quick-reports-expand-link").classList.add('hidden');
    }
        return false;
}

 function setFoldersAdress(){

     var el=document.getElementById("my-team-folder-adress");
     if(el.options[el.selectedIndex]!=null){
        $('#folders-expand-link').href=el.options[el.selectedIndex].value;
        $('#my-folders-src').src=el.options[el.selectedIndex].value;
        $("#my-team-folder-adress").classList.remove('hidden');
        $("#folders-expand-link").classList.remove('hidden');
        }
      else{
        $('#my-folders-src').src="";
        $("#my-team-folder-adress").classList.add('hidden');
        $("#folders-expand-link").classList.add('hidden');
        }
    return false;
}
/*************************************************************************************************************/
function updatePage (config) {
        updateNotifications(config.notification);
        updateActionList(config.quickActions);
}
/***********************************************************************************************************/
function start_page(){
    UTILS.ajax("data/config.json" , {done: updatePage});       

    document.getElementById("quick-reports-options-putton").addEventListener('click',function(e){
        $("#quickreports").classList.toggle('hidden');

    });
 /// check if there is data in the array
    $("#quick-reports-adress").classList.add('hidden');
    $("#quick-reports-expand-link").classList.add('hidden');
     $('#quick-reports-adress').addEventListener('change',setReportAdress);
    $('#my-team-folder-adress').addEventListener('change',setFoldersAdress);
    
    document.getElementById("folder-options-putton").addEventListener('click',function(e){
        $("#my-team-folders-form").classList.toggle('hidden');

    });
     document.getElementById("quickreports-cancel").addEventListener('click',function(e){
        $("#quickreports").classList.toggle('hidden');

    });
     document.getElementById("folders-cancel").addEventListener('click',function(e){
        $("#my-team-folders-form").classList.toggle('hidden');

    });
    document.getElementById("quickrports-save").addEventListener('click',quickrports_save);
    document.getElementById("folders-save").addEventListener('click',folders_save);

    var all_tabs=all("#tab");
    for(var i=0;i<all_tabs.length;i++){

        all_tabs[i].addEventListener('click',active_tab)
    }
    document.addEventListener('keydown',keyEvent);


       
}

window.onLoad= start_page();