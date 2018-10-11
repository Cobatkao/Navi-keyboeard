
// 1.初始化数据
var func_hash = data_init()
var keys = func_hash['keys']
var hash = func_hash['hash']

// 2.生成键盘
generateKeyBoard(keys, hash)


// 3.监听用户
listenToUser(hash)


// 工具函数
function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || 'null')
}

function produceTag(tagName, attr) {
  var element = document.createElement(tagName)
  for(var m in attr) {
    element[m] = attr[m]
  }
  return element
}

function createImage(domain) {
  var img = produceTag('img')
  if(domain) {
    // 获取icon地址
    img.src = domain + 'favicon.ico'
  } else {
    img.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  // 图片请求失败处理
  img.addEventListener('error', function(e) {
    e.target.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
  })
  return img
}

function listenToUser(hash) {
  document.addEventListener("keypress", function(eventObj) {
    var website = hash[presskey]
    window.open(website, '_blank')
  })
}

function data_init() {
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
  return {
    keys: keys,
    hash: hash
  }
}

function generateKeyBoard(keys, hash) {
  var main = document.getElementById('main')

  for(var i = 0; i < keys.length; i++) {
    var div = produceTag('div', {className: 'line'})
    main.appendChild(div)
    // 对应keys某一行
    row = keys[i] 
    
    for(var t = 0; t < row.length; t++) {
      var outerDiv = produceTag('div', {className: 'key'})
      div.appendChild(outerDiv)

      // 为每个kbd添加对应字母
      var span = produceTag('span', {className: 'text', textContent: row[t]})

      // 创建图片
      var img = createImage(hash[row[t]])

      // 创建按钮
      var button = produceTag('button', {textContent: '自定义', id: row[t]})

      // 编辑功能
      button.addEventListener('click', function(eventObj) {
        var btn_click = eventObj.target
        var img_custom = btn_click.previousSibling
        // 获取点击的对应字母给key
        var key = btn_click.id
        var input = prompt('大哥，给我一个网址呗：）')
        // 把默认的hash值替换为自定义url
        hash[key] = input 
        img_custom.src = 'https://' + input + '/favicon.ico'
        img_custom.addEventListener('error', function(e) {
          e.target.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
        })
        // hash一旦变化，就储存到localstorage      
        localStorage.setItem('temptHash', JSON.stringify(hash)) 
      })
      
      var kbd = produceTag('kbd')
      kbd.appendChild(span)
      kbd.appendChild(img)
      kbd.appendChild(button)

      outerDiv.appendChild(kbd)
    }
  }
  return outerDiv
}