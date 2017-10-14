/**
 * Created by StudentTC on 10.12.2016.
 */
function createCoursesTable(course) {

    var id = window.location.search.replace( '?', '');
    var table = document.getElementById('courcesTable');
    //Тестовый JSON
    //var course = JSON.parse('[{"id":1,"name":"course1","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":2,"name":"course2","subname":"level1","descr":"course2. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":3,"name":"course3","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":4,"name":"course4","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":5,"name":"course5","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":6,"name":"course6","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":7,"name":"course7","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":8,"name":"course8","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}, {"id":9,"name":"course9","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg"}]');
    //alert(course.length);
    var j = 1;
    var i = 0;
    //if() Если из URl не получаем параметр id, то выводим все курсы, иначе показывем информацию о выбранном курсе
    if(id != 0)
    {
        // выбрали курс

        //json с сервера.
        var json = jQuery.getJSON(getServerIp() + '/API/course/' + id , {} , function(data) {
            alert(data[0].name + ' ' + data[0].descr);
            var items = [];
            alert(items[0].name);
            jQuery.each(data, function(key, val) {
                items.push(key + ' ' + val);
            });
        });

        //тестовый json
        var selectedCourse = JSON.parse('{"purpose":"dsf","program":"sdfasdf","id":1,"name":"course1","subname":"level1","descr":"course1. level1","pictLink":"/Content/img/pict2.jpg","direct":{"id":1,"name":"Бизнес-анализ","descr":"Бизнес-анализ - очень классный и полезный курс","pictLink":"/Content/img/pict2.jpg"}}');
        selectedCourse.purpose;
        selectedCourse.program;
        selectedCourse.id;
        selectedCourse.name;
        selectedCourse.subname;
        selectedCourse.descr;
        selectedCourse.pictLink;
        selectedCourse.direct; // Объект
        var text = '<a href="Courses.html?'+ course[id-1].id + '\"><img src="' + course[id-1].pictLink.slice(1) + '\" height=\"600px\" width=\"600px\"><a/>';
        var tr = document.createElement('tr');
        table.appendChild(tr);
        table.rows[0].appendChild(document.createElement('td'));
        table.rows[0].innerHTML += text;
        table.rows[0].innerHTML += '<p>' + course[id-1].name + '</p>';
        table.rows[0].innerHTML += '<p>' + course[id-1].descr + '</p>';
        //alert(selectedCourse.direct.id);
    }
    else
    {
        // Выводим список всех курсов
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (var m = 0; m < course.length; m++) {
            //Свойства объекта
            //course[i].id;
            //course[i].name;
            //course[i].subname;
            //course[i].descr;
            //course[i].pictLink;
            // Создаем для каждого объекта элемент таблицы
            // html текст для ячейки таблицs
            /*var text = '<a class="d" href="Courses.html?' + course[m].id + '\"><img src="'+ getServerIp() + '/' + course[m].pictLink.slice(1) + '\" height=\"200px\" width=\"150px\"><a/>';

            table.rows[j - 1].appendChild(document.createElement('td'));
            alert(table.rows[j - 1].innerHTML);
            table.rows[j - 1].innerHTML += text;
            //table.rows[j-1].cells[i].innerHTML = text;
            table.rows[j - 1].innerHTML += '<p>' + course[m].name + '</p>';
            table.rows[j - 1].innerHTML += '<p>' + course[m].descr + '</p>';
            i++;            */
            //alert(table.rows[0].cells[i].innerHTML);
            //var elem = document.createElement('td');
            //Если вывели 3 записи, то переходим на следующую строку таблицы
            var text = '<a href="Courses.html?' + course[m].id + '\"><img src="'+ getServerIp() + '/' + course[m].pictLink.slice(1) + '\" height=\"100px\" width=\"100px\"><a/>';
            table.rows[j - 1].appendChild(document.createElement('td'));
            table.rows[j - 1].cells[i].className = 'courseTD';
            table.rows[j - 1].cells[i].innerHTML = text;

            table.rows[j - 1].cells[i].innerHTML += '<p>' + course[m].name + '</p>';
            i++;

            if ((m + 1) % 4 == 0 && m < course.length - 1) {
                var tr = document.createElement('tr');
                table.appendChild(tr);
                i = 0;
                //alert(m);
                j++;
            }
        } 
    }
}

function showAllCourses() {
    //var table = document.getElementById('courcesTable');
    var requestString = getServerIp() + '/API/course';
    alert(requestString);
    var courses = getJasonObject(requestString);
    var tr = document.getElementsByTagName("tr");
    for(var i = 0; i < tr.length; i++)
    {
        tr[i].innerHTML = "";
    }
    createCoursesTable(courses);
}