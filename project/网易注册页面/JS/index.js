window.onload = function () {
    var allLis = document.getElementsByClassName("lis");
    console.log(allLis.length);
    var Divs = document.getElementsByClassName("content_body_left_main_bottom");
    var ul = document.getElementById("ul1");
    var IMG = document.getElementById("IMG");
    for (var i = 0; i < allLis.length; i++) {
        var li = allLis[i];
        li.index = i;
        li.onclick = function () {
            for(var j = 0;j<allLis.length;j++){
                Divs[j].style.display="none";
                allLis[j].style.color = "#555";
            }
            ul.style.background = 'url("Images/tab'+(this.index)+ '.jpg")';
            Divs[this.index].style.display = "block";
            this.style.color="white";
            // console.log(this.index);
            if(this.index===2){
                IMG.setAttribute("src","Images/reg_vip_163.jpg");
                IMG.className = "TWO";
            }else{
                IMG.setAttribute("src","Images/wy_right.jpg");
                IMG.className = "ONE";
            }
        }
    }
};