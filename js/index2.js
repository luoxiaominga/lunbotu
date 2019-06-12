var Lunbo = function () {
    this.box = my$("box");
    this.screen = this.box.children[0];

    // 图片宽度
    this.imgWidth = this.screen.offsetWidth;

    // 图片部分ul
    this.ulObj = this.screen.children[0];
    this.list = this.ulObj.children;

    // 圆点部分ol
    this.olObj = this.screen.children[1];

    // 左右焦点
    this.arr = my$("arr");
    this.left = my$("left");
    this.right = my$("right");

    this.pic = 0;
    this.flag = true;
    this.init();
}

Lunbo.prototype.init = function () {
    var that = this;
    this.points();
    this.lR();
    this.ulObj.appendChild(this.ulObj.children[0].cloneNode(true));
    //复制第一张图片并添加到图片序列最后
    this.timeId = setInterval(this.clickHandle.bind(that), 1000);
    //设置自动播放，这里注意不能用call，apply来改变this指向，只会执行一次
}

//圆点的方法
Lunbo.prototype.points = function () {
    for (var i = 0; i < this.list.length; i++) {
        var liObj = document.createElement("li");
        liObj.innerHTML = (i + 1);
        liObj.setAttribute("index", i);
        this.olObj.appendChild(liObj);
        var that = this;
        liObj.onmouseover = function () {
            for (var j = 0; j < that.olObj.children.length; j++) {
                that.olObj.children[j].className = '';
            }
            this.className = "current";
            this.pic = this.getAttribute("index");
            animate(that.ulObj, -this.pic * that.imgWidth);
        }
    }
    this.olObj.children[0].className = "current";
}

//左右焦点的方法
Lunbo.prototype.lR = function () {
    var that = this;
    this.box.onmouseover = function () {
        that.arr.style.display = "block";
        clearInterval(that.timeId);
    };
    //鼠标离开最外面的box隐藏左右焦点的div
    this.box.onmouseout = function () {
        that.arr.style.display = "none";
        that.timeId = setInterval(that.clickHandle.bind(that), 1000);
    };
    this.pic = 0;
    this.right.onclick = function () {
        console.log(that.flag);
        if (that.flag) {
            that.flag = false;
            that.clickHandle.call(that);
            setTimeout(function () {
                that.flag = true;
            }, 600)
        }
    }
    this.left.onclick = function () {
        console.log(that.flag);

        if (that.flag) {
            that.flag = false;
            if (that.pic == 0) {
                that.pic = that.list.length - 1; //5
                that.ulObj.style.left = -that.pic * that.imgWidth + "px";
            }
            that.pic--;
            animate(that.ulObj, -that.pic * that.imgWidth);
            //设置按钮的样式同步
            for (var i = 0; i < that.olObj.children.length; i++) {
                //先把ol中的所有的li的类样式去掉
                that.olObj.children[i].className = "";
            }
            that.olObj.children[that.pic].className = "current";
            setTimeout(function () {
                that.flag = true;
            }, 600)
        }
    };
}

Lunbo.prototype.clickHandle = function () {
    //list是ul中所有的li
    if (this.pic == this.list.length - 1) { //如果pic的索引值和ul中的所有的li的个数减1一样---5
        //显示的是第6张图(实际上用户会认为是第1个,再点击按钮,用户应该看到第2个图)
        this.pic = 0; //索引为0
        this.ulObj.style.left = -this.pic * this.imgWidth + "px"; //直接把第6个图变成了第1个图
    }
    this.pic++;
    animate(this.ulObj, -this.pic * this.imgWidth); //移动到了第二个图了

    //pic最大的值是5,
    if (this.pic == this.list.length - 1) { //pic====>5
        this.olObj.children[0].className = "current"; //ol中第一个li有类样式
        //ol中最后一个li去掉类演示
        this.olObj.children[this.olObj.children.length - 1].className = "";
    } else {
        //把ol中所有的li的类样式全部干掉
        for (var i = 0; i < this.olObj.children.length; i++) {
            this.olObj.children[i].className = "";
        }
        this.olObj.children[this.pic].className = "current";
    }
}

new Lunbo();