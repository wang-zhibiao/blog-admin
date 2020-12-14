//函数防抖（debounce）
let timeout = null
let timer = null
let start = 0
export const debounce = (func, delay) => {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(func, delay)
}
//函数节流(Throttle)
export const Throttle = (func, wait, trailing) => {
    let now = new Date()
    if ((now - start) >= wait) {
        timer && clearTimeout(timer)
        timer = null
        start = now
        return func()
    } else if (!timer && trailing) {
        timer = setTimeout(() => {
            timer = null
            return func
        }, wait)
    }
}

// 解决数字键盘可以输入输入多个小数点问题
export const limitDecimal = (newVal, oldVal) => {
    let number = newVal
    if (newVal == "" && oldVal.toString().indexOf(".") > 0) {
        return number = oldVal;
    }
    // 保留两位小数
    if (newVal) {
        newVal = newVal.toString();
        var pointIndex = newVal.indexOf(".");
        //不出现两位小数点
        if (newVal.toString().lastIndexOf(".") > pointIndex) {
            return number = oldVal;
        }
        if (pointIndex > 0 && newVal.length - pointIndex > 3) {
            return number = oldVal;
        }
    }
    return number
}