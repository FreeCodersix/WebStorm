$(function () {

    //监听内容的实时输入，必须用事件委托
    $("body").delegate(".comment", "propertychange input", function () {

        //判断是否输入了内容
        if ($(this).val().length > 0) {

            //让按钮可用
            $(".send").prop("disabled", false);
        } else {

            //让按钮不可用
            $(".send").prop("disabled", true);
        }
    });

    //监听发布按钮的点击
    $(".send").click(function () {

        //拿到用户输入的内容
        var text = $(".comment").val();

        //根据内容创建节点
        var weibo = createEle(text);

        //添加节点
        $(".messageList").prepend(weibo);
    });

    //监听顶点击，必须用事件委托
    $("body").delegate(".infoTop", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
    });

    //监听顶点击，必须用事件委托
    $("body").delegate(".infoDown", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
    });

    //监听删除点击，必须用事件委托
    $("body").delegate(".infoDel", "click", function () {
        $(this).parents(".info").remove();
    });

    //创建节点的方法
    function createEle($text) {
        var time = formatDate();
        var weibo = $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">" + $text + "</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\"> " + time + "</span>\n" +
            "                <span class=\"infoHandle\">\n" +
            "                    <a href=\"javascript:;\" class='infoTop'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDown'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDel'>删除</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>");
        return weibo;
    }

    //生成时间的方法
    function formatDate() {
        var date = new Date().getFullYear();
        var date1 = new Date().getMonth() + 1;
        var date2 = new Date().getDate();
        var date3 = new Date().getHours();
        var date4 = new Date().getMinutes();
        var date5 = new Date().getSeconds();
        var date0 = date + "-" + date1 + "-" + date2 + " " + date3 + ":" + date4 + ":" + date5;
        return date0;
    }
});