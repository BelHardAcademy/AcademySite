function getJason(url) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://192.168.41.21:85/API/course');
    request.onreadystatechange = function(e) {
        if (this.readyState = 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                // тут ченибудь делаем с объектом
            }
            else {
                // тут сообщаем о сетевой ошибке
            }
        }
    }
    request.send(null);
    alert(request.responseText);
}

function getJasonObject(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if (request.status != 200) {
        alert('Error ' + request.statusText);
    }
    var obj = JSON.parse(request.responseText);

    return obj;
}

function sendJason(url, data, crypto)
{
    /*var request = new XMLHttpRequest();
    request.open('Post', url, false);
    var captchaObj = {
        "data" : data,
        "crypto" : crypto
    };
    var jsonString = JSON.stringify(captchaObj);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    alert(jsonString);
    request.send(jsonString);
    alert(request.responseText);*/
    jQuery.ajax({
            type: 'post',
            datatype: 'json',
        data: {data:data, crypto:crypto},
        url: url,
        success: function(data) {alert(data);}
        }


    )
}