/**
 * Created by StudentTC on 18.12.2016.
 */
function getCaptcha() {
    var obj = getJasonObject(getServerIp()+'/API/captcha?width=100&height=40&len=4');
    str = '<img src= ' + obj.data + '>';
    return obj;
}

function renewCaptcha(){
    var captcha = document.getElementById("captcha");
    alert(captcha.innerText);
    var str = getCaptcha();
    captcha.innerHTML;

}

function socialRegister(token){
    alert(location.toString());
    $.getJSON("//ulogin.ru/token.php?host=" +
        encodeURIComponent(location.toString()) + "&token=" + token + "&callback=?",
        function(data)
        {
            data=$.parseJSON(data.toString());
            if(!data.error)
            {
                alert("Привет, "+data.first_name+" "+data.last_name+"!");
            }
        });
}