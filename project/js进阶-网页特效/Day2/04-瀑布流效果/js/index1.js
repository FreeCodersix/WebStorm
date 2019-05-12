window.onload = function () {
    waterFull("main", "box");

    window.onscroll = function () {
        if(checkWillLoadImage()){
            var dataArr = [
                {"src": "img04.jpg"},
                {"src": "img06.jpg"},
                {"src": "img08.jpg"},
                {"src": "img09.jpg"},
                {"src": "img10.jpg"},
                {"src": "img12.jpg"},
                {"src": "img14.jpg"},
                {"src": "img16.jpg"},
                {"src": "img18.jpg"}
            ];

            for(var i=0; i<dataArr.length; i++){
                var newBox = document.createElement("div");
                newBox.className = "box";


                var newPic = document.createElement("div");
                newPic.className = "pic";
                newBox.appendChild(newPic);

                var newImg = document.createElement("img");
                newImg.src = "images/" + dataArr[i].src;
                newPic.appendChild(newImg);

                $("main").appendChild(newBox);
            }

            waterFull("main","box");
        }
    }
};

function waterFull(parent, child) {
    var allBox = $(parent).getElementsByClassName(child);
    var boxWidth = allBox[0].offsetWidth;
    var screenW = document.documentElement.clientWidth;
    var cols = parseInt(screenW / boxWidth);
    $(parent).style.width = boxWidth * cols + 'px';
    $(parent).style.margin = "0 auto";

    var arrHeight = [], boxHeight = 0, minHeight = 0, minIndex = 0;
    for (var i = 0; i < allBox.length; i++) {
        boxHeight = allBox[i].offsetHeight;
        if (i < cols) {
            arrHeight.push(boxHeight);
        } else {
            minHeight = _.min(arrHeight);
            minIndex = getMinIndex(arrHeight, minHeight);
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minIndex * boxWidth + 'px';
            allBox[i].style.top = minHeight + 'px';
            arrHeight[minIndex] += boxHeight;
        }

    }
}

function getMinIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

function checkWillLoadImage() {
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length-1];

    var length = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    var screenH = document.body.clientHeight || document.documentElement.clientHeight;

    var scrollH = scroll().top;

    return length <= screenH + scrollH;

}