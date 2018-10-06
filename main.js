// nivagation_web

var keys = {
  '0': ['1','2','3','4','5','6','7','8','9','0',],
  '1': ['q','w','e','r','t','y','u','i','o','p'],
  '2': ['a','s','d','f','g','h','j','k','l'],
  '3': ['z','x','c','v','b','n','m'],
  'length': 4
}
var hash = {
  'q': 'http://www.qq.com/',
  'w': 'https://weibo.com',
  'e': 'http://es6.ruanyifeng.com/',
  'r': 'https://www.reddit.com/',
  't': 'https://www.ted.com/',
  'y': 'https://youtube.com/',
  'u': 'http://www.youku.com/',
  'i': 'http://www.iqiyi.com/',
  'o': 'https://playoverwatch.com/',
  'p': 'https://pan.baidu.com/',
  'a': 'https://www.autohome.com.cn/',
  's': 'https://segmentfault.com/',
  'd': 'dytt8.net',
  'f': 'https://www.facebook.com/',
  'g': 'https://github.com/',
  'h': 'http://www.huodongxing.com/',
  'j': 'https://www.jd.com/',
  'k': undefined,
  'l': 'https://www.lagou.com/',
  'z': 'https://www.zhihu.com/',
  'x': 'https://xiedaimala.com/',
  'c': 'https://www.cnblogs.com/',
  'v': 'https://www.v2ex.com/',
  'b': 'https://www.bilibili.com/',
  'n': 'https://www.npmjs.com/',
  'm': 'https://www.microsoft.com/'
}

// 取出localstorage并覆盖hash
var hashInLocalStorage = JSON.parse(localStorage.getItem("temptHash") || 'null')
if(hashInLocalStorage) {
  hash = hashInLocalStorage
}

var main = document.getElementById('main')
var i = 0

while(i < keys.length) {
  var div = document.createElement('div')
  main.appendChild(div)
  row = keys[i] // 对应具体一行
  
  var t = 0
  while(t < row.length) {
    var kbd = document.createElement('kbd')
    kbd.textContent = row[t] // 为每个kbd添加对应字母
    div.appendChild(kbd)

    // 用户编辑自定义
    var button = document.createElement('button')
    button.textContent = '编辑'
    button.id = row[t]
    button.addEventListener('click', function(eventObj) {
      var key = eventObj.target.id // 获取点击的对应字母hash
      var input = prompt('大哥，给我一个网址呗：）')
      hash[key] = input
      localStorage.setItem('temptHash', JSON.stringify(hash)) // hash一旦变化，就储存到localstorage
      console.log(hash[key]); // 打印出自定义网址
      
    })
    kbd.appendChild(button)
    t += 1
  }
  i += 1
}

document.addEventListener("keypress", function(eventObj) {
  var presskey = eventObj.key // 事件对象的属性
  var website = hash[presskey]
  window.open(website, '_blank')
})