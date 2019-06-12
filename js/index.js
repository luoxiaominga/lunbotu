
//封装动画函数----匀速的
//任意的一个元素移动到任意的目标位置

//获取所有需要的元素
//最外面的div
var box = my$("box");
//获取相框
var screen = box.children[0];
//相框的宽度
var imgWidth = screen.offsetWidth;
//获取ul
var ulObj = screen.children[0];
//获取ul中所有的li
var list = ulObj.children;
//获取ol
var olObj = screen.children[1];
//左右焦点的div
var arr = my$("arr");
//左按钮
var left = my$("left");
//右按钮
var right = my$("right");

var pic = 0; //这个变量中存储的就是鼠标进入ol中li的那个索引===============================
//创建li加入到ol中,根据ul中的li的个数创建
for (var i = 0; i < list.length; i++) {
  var liObj = document.createElement("li");
  liObj.innerHTML = (i + 1); //li中显示的数字
  //添加自定义属性存储索引的值======================================================
  liObj.setAttribute("index", i);
  //加入到ol中
  olObj.appendChild(liObj);
  //为每个ol中的li添加鼠标进入的事件
  liObj.onmouseover = function () {
    //1---设置当前鼠标进入的li有背景颜色
    for (var j = 0; j < olObj.children.length; j++) {
      olObj.children[j].removeAttribute("class");
    }
    this.className = "current";
    //2---移动ul
    //获取当前鼠标进入的li的索引=================================================
    pic = this.getAttribute("index");
    //移动ul
    animate(ulObj, -pic * imgWidth);
  }; //end mouseover
} //end for
//设置ol中第一个li有默认的类样式========================================
olObj.children[0].className = "current";
//把ul中第一个li复制一个,追加到ul中所有的li的最后
ulObj.appendChild(ulObj.children[0].cloneNode(true));

//自动移动
var timeId = setInterval(clickHandle, 1000);
//鼠标进入最外面的box显示左右焦点的div
box.onmouseover = function () {
  arr.style.display = "block";
  clearInterval(timeId);
};
//鼠标离开最外面的box隐藏左右焦点的div
box.onmouseout = function () {
  arr.style.display = "none";
  timeId = setInterval(clickHandle, 1000);
};

//right按钮点击
pic = 0;
right.onclick = clickHandle;

function clickHandle() {
  //list是ul中所有的li
  if (pic == list.length - 1) { //如果pic的索引值和ul中的所有的li的个数减1一样---5
    //显示的是第6张图(实际上用户会认为是第1个,再点击按钮,用户应该看到第2个图)
    pic = 0; //索引为0
    ulObj.style.left = -pic * imgWidth + "px"; //直接把第6个图变成了第1个图
  }
  pic++;
  animate(ulObj, -pic * imgWidth); //移动到了第二个图了

  //pic最大的值是5,
  if (pic == list.length - 1) { //pic====>5
    olObj.children[0].className = "current"; //ol中第一个li有类样式
    //ol中最后一个li去掉类演示
    olObj.children[olObj.children.length - 1].className = "";
  } else {
    //把ol中所有的li的类样式全部干掉
    for (var i = 0; i < olObj.children.length; i++) {
      olObj.children[i].className = "";
    }
    olObj.children[pic].className = "current";
  }
}
//left按钮点击
left.onclick = function () {
  if (pic == 0) {
    pic = list.length - 1; //5
    ulObj.style.left = -pic * imgWidth + "px";
  }
  pic--;
  animate(ulObj, -pic * imgWidth);
  //设置按钮的样式同步
  for (var i = 0; i < olObj.children.length; i++) {
    //先把ol中的所有的li的类样式去掉
    olObj.children[i].className = "";
  }
  olObj.children[pic].className = "current";
};
