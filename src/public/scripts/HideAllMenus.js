/**
 * Created by User on 16.12.2016.
 */
function HideAllMenus(elem) {
    document.getElementById("menuAbout").hidden = true;
    document.getElementById("menuCourses").hidden = true;
    document.getElementById("menuPractice").hidden = true;
    document.getElementById("menuTest").hidden = true;
    //elem.className = 'a active';
    //var menu = document.getElementsByTagName('a');
    var menu = document.getElementsByClassName('c');
    for(var i = 0; i < menu.length; i++)
    {
        menu[i].className = 'c';
    }
    elem.className = 'c active';
}

function SetActive(elem) {
    elem.className += ' active';
}