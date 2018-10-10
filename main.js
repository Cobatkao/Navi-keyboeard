// nivagation_web

var keys = {
  '0': ['q','w','e','r','t','y','u','i','o','p'],
  '1': ['a','s','d','f','g','h','j','k','l'],
  '2': ['z','x','c','v','b','n','m'],
  'length': 3
}
var hash = {
  'q': 'http://www.qq.com/',
  'w': 'https://weibo.com/',
  'e': 'http://es6.ruanyifeng.com/',
  'r': 'https://www.runoob.com//',
  't': 'https://www.ted.com/',
  'y': 'https://youtube.com/',
  'u': 'http://juejin.im/',
  'i': 'http://www.iqiyi.com/',
  'o': 'https://www.apple.com/',
  'p': 'http://javascript.ruanyifeng.com/',
  'a': 'https://www.autohome.com.cn/',
  's': 'https://segmentfault.com/',
  'd': 'http://www.dytt8.net/',
  'f': 'https://www.facebook.com/',
  'g': 'https://github.com/',
  'h': 'http://www.huodongxing.com/',
  'j': 'https://www.jd.com/',
  'k': undefined,
  'l': 'https://www.lagou.com/',
  'z': 'https://www.zhihu.com/',
  'x': 'https://xiedaimala.com/',
  'c': 'http://www.chinadaily.com.cn/',
  'v': 'https://www.v2ex.com/',
  'b': 'https://www.bilibili.com/',
  'n': 'https://www.taobao.com/',
  'm': 'https://www.microsoft.com/'
}

// 取出localstorage并覆盖hash
var hashInLocalStorage = JSON.parse(localStorage.getItem("temptHash") || 'null')
if(hashInLocalStorage) {  // 更新hash数据
  hash = hashInLocalStorage
}

var main = document.getElementById('main')
var i = 0

while(i < keys.length) {
  var div = document.createElement('div')
  div.setAttribute('class', 'line')
  main.appendChild(div)
  row = keys[i] // 对应某一行
  
  var t = 0
  while(t < row.length) {
    var outerDiv = document.createElement('div')
    outerDiv.setAttribute('class', 'key')
    div.appendChild(outerDiv)
    var kbd = document.createElement('kbd')
    var span = document.createElement('span')
    span.className = "text"
    span.textContent = row[t] // 为每个kbd添加对应字母

    // 用户编辑自定义
    var button = document.createElement('button')
    button.textContent = '自定义'
    button.id = row[t]
    var img = document.createElement('img')
    if(hash[row[t]]) {
      img.src = hash[row[t]] + 'favicon.ico' // 获取icon网址
    } else {
      img.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png"
    }
    
    button.addEventListener('click', function(eventObj) {
      var key = eventObj.target.id // 获取点击的对应字母给key
      var input = prompt('大哥，给我一个网址呗：）')
      hash[key] = input // 把默认的hash值替换为自定义url
      localStorage.setItem('temptHash', JSON.stringify(hash)) // hash一旦变化，就储存到localstorage
      console.log(hash[key]); // 打印出自定义网址
      
    })
    outerDiv.appendChild(kbd)
    kbd.appendChild(span)
    kbd.appendChild(img)
    kbd.appendChild(button)
    t += 1
  }
  i += 1
}

// 点击时打开新页面
document.addEventListener("keypress", function(eventObj) {
  var presskey = eventObj.key // 事件对象的属性
  var website = hash[presskey]
  window.open(website, '_blank')
})