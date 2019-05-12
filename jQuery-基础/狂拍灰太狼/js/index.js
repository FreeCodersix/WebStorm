$(function () {
    //1.监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });

    //2.监听关闭按钮的点击
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });

    //3.监听开始按钮的点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //调用处理灰太狼动画的方法
        startWolfAnimation();
    });

    //4.监听重新开始按钮的点击
    $(".restart").click(function () {
        $(".mask").stop().fadeOut(100);

        //调用处理进度条的方法
        progressHandler();

        //调用处理灰太狼动画的方法
        startWolfAnimation();

    });

    //定义一个专门处理进度条的方法
    function progressHandler() {
        //重新设置进度条的宽度
        $(".progress").css({
            width: 180
        });

        //开启定时器处理进度条
        var timer = setInterval(function () {
            //拿到进度条当前的宽度
            var progressWidth = $(".progress").width();

            //减少当前的宽度
            progressWidth -= 1;

            //重新给进度条设置宽度
            $(".progress").css({
                width: progressWidth
            });

            //监听进度条是否走完
            if(progressWidth <= 0){
                //关闭定时器
                clearInterval(timer);

                // 显示mask
                $(".mask").stop().fadeIn(100);

                //停止灰太狼动画
                stopWolfAnimation();
            }
        },100);
    }
    var wolfTimer;
    //定义一个处理灰太狼动画的方法
    function startWolfAnimation() {
        //定义两个数组分别保存灰太狼和小灰灰的图片
        var wolf_1 = ['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h5.png','./images/h5.png','./images/h5.png','./images/h5.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2 = ['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x5.png','./images/x5.png','./images/x5.png','./images/x5.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];

        //2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        //3.创建一个图片
        var wolfImage = $("<img src='' class='wolfImage'>");

        //随机获取图片的位置
        var posIndex = Math.round(Math.random()*8);

        //4.设置图片显示的位置
        wolfImage.css({
            position: "absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });

        //随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        //5.设置图片的内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 10;
        wolfTimer = setInterval(function () {
            if(wolfIndex > wolfIndexEnd){
               wolfImage.remove();
               clearInterval(wolfTimer);
               startWolfAnimation();
            }
            wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },100);

        //6.将图片添加到界面上
        $(".container").append(wolfImage);

        //7.调用处理游戏规则的方法
        gameRules(wolfImage);
    }
    
    function gameRules(wolfImage) {
        wolfImage.one("click",function () {

            window.wolfIndex = 10;
            window.wolfIndexEnd = 14;

            var src = $(this).attr("src");
            var flag = src.indexOf("h") >= 0;
            if(flag){
                $(".score").text(parseInt($(".score").text())+10);
            }else{
                $(".score").text(parseInt($(".score").text())-10);
            }
        });
    }
    
    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }
});