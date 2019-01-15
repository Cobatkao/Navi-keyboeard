# navi_keyboard | 项目小结

![navi-keyboard.jpg](https://i.loli.net/2018/10/13/5bc208bfd42a9.jpg)

> a simple and helpful navigation homepage via plain javascript

**keyword**: plain javascript、localStorage、favicon、onerror。

# 简述

实用原生JS实现一个键盘导航。访问地址：https://cobatkao.github.io/Navi-keyboeard/index.html
- 支持输入关键词百度搜索
- 按下键盘导航至默认键位对应的站点
- 编辑并绑定自定义网站

# 细节
1. 数据使用locationStorage实现了用户输入url保存到客户端的功能；
2. 组装url+`favicon.ico`请求获取对应网站图标；
3. 事件绑定与失败处理：图片加载失败使用`error`对图片节点进行监听，触发后返回默认给定的图片。
   ```javascript
   img.addEventListener('error', function(e) {
    e.target.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
   })
   ```
# 知识点

## localStorage

`localStorage`对象是web端存储API，通过它可以在浏览器端跨对话的存储键值对数据。需要特别注意，存储的数据类型是字符串，代表着它也可以存储字符串化的JSON数据，因此相比于cookie，locaStorage能存储更复杂的数据。

### 用法

```javascript
// 使用方法存储数据
locaStorage.setItem("name", "Srtian")
// 使用属性存储数据
locaStorage.say = "Hello world"
// 使用方法读取数据
const name = locaStorage.getItem("name")
// 使用属性读取数据
const say = locaStorage.say
// 删除数据
locaStorage.removeItem("name")
```

### 存储有效期

通过locaStorage存储的数据时永久性的，除非我们使用removeItem来删除或者用户通过设置浏览器配置来删除，负责数据会一直保留在用户的电脑上，永不过期。

###  项目实践

```javascript
// hash一旦变化，就储存 
localStorage.setItem('temptHash', JSON.stringify(hash))

// 更新hash列表
var hashInLocalStorage = JSON.parse(localStorage.getItem("temptHash") || 'null')
  if(hashInLocalStorage) {  // 更新hash数据
    hash = hashInLocalStorage
  }
  return {
    keys: keys,
    hash: hash
  }

// 封装函数
function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || 'null')
}
```

如上，在获取数据时需要全部转换为字符串格式，然后再进行存储；等再获取值的时候也别忘了将其转化回来。

### 应用场景

应用场景（用户第一次登录网页会提示“网页即将改版”，第二次登录就不会提示了）

```javascript
let already = localStorage.getItem('已经提示过了')
if（！already）{
   alert('网页即将改版了')
    localStorage.setItem('已经提示过了',true)
}
```

## error

onerror事件会在文档或图像加载过程中发生错误时被触发。因为我们要获取logo，若获取失败，我们可以插入一个事先准备好的图片。

```javascript
img_custom.addEventListener('error', function(e) {
          e.target.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
        })
```

### 拓展

error针对不同类型的事件目标，如dom元素，windowd触发Error事件。

例如，检测动态脚本加载是否失败
```javascript
var script = document.createElement('script');
script.src = './test.js';
document.getElementsByTagName('head')[0].appendChild(script);
script.onerror = function(e){
    console.log('File Loaded Error');
};
```
错误事件e中包含包含有关事件和错误的所有信息。

## 兄弟DOM操作

本项目中用到了`previousSibling`属性来获取同级的上一个紧邻元素。相似的DO API如下：

获取兄弟元素：

```javascript
node.previousSibling  //找xxx的前面一个兄弟元素
node.nextSibling  //找xxx的后面一个兄弟元素
node.parentElement //找xxx的父元素
node.firstChild //找xxx的第一个子元素，也可以是last子元素
```

获取元素

```javascript
document.getElementsByName('some')
document.getElementsByClassName('some')
document.getElementById('some')
document.querySelector('some')
document.querySelectorAll('some')
```

上面二者有区别：
- W3C规范：前者属于DOM API，后者则是Selector API
- 参数：querySelector接收css选择器，而getElementsBy系列接收的参数只能是单一的className、tagName和name；
- 返回值：querySelector**返回静态node节点**，而getElementsBy系列的返回的是一个**动态Node List**；

# 待完成

- 按键带音效或可以整体切换至鼓点键盘 
