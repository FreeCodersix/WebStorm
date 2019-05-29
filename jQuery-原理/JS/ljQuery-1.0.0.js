(function (window, undefined) {
    var ljQuery = function (selector) {
        return new ljQuery.prototype.init(selector);
    };
    ljQuery.prototype = {
        constructor: ljQuery,
        init: function (selector) {

            selector = ljQuery.trim(selector);

            //1.传入 '' null undefined NaN  0  false, 返回空的jQuery对象
            if (!selector) {
                return this;
            }

            //2.函数
            else if (ljQuery.isFunction(selector)) {
                ljQuery.ready(selector);
            }

            //3.字符串:
            //代码片段:会将创建好的DOM元素存储到jQuery对象中返回
            // 选择器: 会将找到的所有元素存储到jQuery对象中返回
            else if (ljQuery.isString(selector)) {
                //2.1判断是否是代码片段
                if (ljQuery.isHTML(selector)) {
                    //1.根据传入的代码片段创建所有的元素
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    //2.将创建好的一级元素添加到jQuery当中
                    // for(var i = 0;i < temp.children.length; i++){
                    //     this[i] = temp.children[i];
                    // }
                    //3.给jQuery对象添加length属性
                    // this.length = temp.children.length;

                    //可以用这一句替代2和3
                    [].push.apply(this, temp.children);

                    //4.返回加工好的this(jQuery)
                    // return this;
                }
                //2.2判断是否是选择器
                else {
                    //1.根据传入的选择器找到对应的元素
                    var res = document.querySelectorAll(selector);
                    //2.将找到的元素添加到ljQuery上
                    [].push.apply(this, res);
                    //3.返回加工上的this
                    // return this;
                }

            }

            //4.数组
            else if (ljQuery.isArray(selector)) {
                //3.1真数组
                if (({}).toString.apply(selector) === "[object Array]") {
                    [].push.apply(this, selector);
                }
                //3.2伪数组
                else {

                    //自定义的伪数组转伪数组时，先将自定义的伪数组转换为真数组
                    var arr = [].slice.call(selector);
                    //再将真数组转换为伪数组
                    [].push.apply(this, arr);
                    return this;
                }
            }

            //5.除上述类型以外的:
            //会将传入的数据存储到jQuery对象中返回
            else {
                this[0] = selector;
                this.length = 1;
            }

            return this;
        }

    };

    ljQuery.extend = ljQuery.prototype.extend = function (obj) {
        for (var key in obj){
            this[key] = obj[key];
        }
    };
    
    ljQuery.extend({
        isString: function (str) {
            return typeof str === "string";
        },
        isHTML: function (str) {
            return (str.charAt(0) == "<" && str.charAt(str.length - 1) == ">" && str.length >= 3);
        },
        isObject: function (str) {
            return typeof str === "object";
        },
        isWindow: function (str) {
            return str === window;
        },
        isArray: function (str) {
            if (ljQuery.isObject(str) && !ljQuery.isWindow(str) && "length" in str) {
                return true;
            }
            return false;
        },
        isFunction: function (str) {
            return typeof str === "function";
        },
        ready: function (fn) {
            //判断DOM元素是否加载完毕
            /*
            onload事件会等到DOM元素加载完毕，并且还会等到资源也加载完毕才会执行；
            DOMContentLoaded事件只会等到DOM元素加载完毕就会执行回调
             */
            /*document.addEventListener("DOMContentLoaded",function () {
                var res = document.querySelectorAll("div");
                console.log(res);
            });*/
            /*
            document.readyState属性有如下的状态：
            uninitialized - 还未开始载入
            loading - 载入中
            interactive - 已加载，文档与用户可以开始交互
            complete - 载入完成

            onreadystatechange事件就是专门用于监听document.readyState属性的改变的
             */
            if(document.readyState === "complete"){
                fn();
            }else if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",function () {
                    fn();
                })
            }else{
                document.attachEvent("onreadystatechange",function () {
                    if(document.readyState === "complete"){
                        fn();
                    }
                });
            }
        }
    });

    //去除字符串两端的空格
    ljQuery.trim = function (str) {
        if (!ljQuery.isString(str)) {
            return str;
        }
        //判断是否支持trim方法
        if (str.trim) {
            return str.trim();
        } else {
            return str.replaceAll(/^\s+|\s+$/, "");
        }
    };
    ljQuery.prototype.init.prototype = ljQuery.prototype;
    window.ljQuery = window.$ = ljQuery;
})(window);

