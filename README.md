# MVVM-VDOM-DIFF
MVVM,数据劫持。。。。
```
简易的VistrulDom和DIFF算法实现，MVVM数据双向绑定，观察者模式，语法解析器等；
```
>compile.js
初始化模版语法，data内数据渲染页面
>observe.js
数据劫持，为每个数据设置get,set方法，触发数据修改后事件通知
>watch.js
获取数据改变前后新值和旧值，callback函数使编译器重新渲染页面
>element.js
虚拟DOM，使用CreateElement(tagName,Props,Children)形式创建虚拟DOM，例如React语法createElement("li",{className:'cj',name:'cj'},["textNode"]);
>diff.js
深度遍历节点，生成新旧节点的补丁对象patches,
patches(补丁)-----数组类型
例:{ATTR:"ATTRS",attrs:{className:'list',style:'background:red'}};
TYPE：INSERT(插入) insertNode:节点元素或文本节点(虚拟DOM，需要render函数转换为真是DOM并插入到父节点。....
TYPE:ATTRS(属性更改)，attrs:新属性值
>patch.js
根据生成的补丁包对旧的节点进行补丁，避免浏览器重绘重排所带来的性能消耗
