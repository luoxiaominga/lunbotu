//根据id获取元素对象
function my$(id) {
    return document.getElementById(id);
}
//动画函数
function animate(element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = 10;
        step = current < target ? step : -step;
        current += step;
        if (Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            element.style.left = target + "px";
            clearInterval(element.timeId);
        }
    }, 10);
    return true;

}