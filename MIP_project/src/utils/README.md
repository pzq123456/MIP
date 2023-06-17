# 通用工具函数 `Utils`
> 在该文件夹下，我们参考 `helpers` 文件夹下的有关工具写法，编写一系列通用工具函数用以支撑一般页面的构建。
## 思路
参考 `Vue` 的生命周期概念，任何一个页面（组件）都有从创建到移除的生命周期。结合这个模型，我们可以将一系列构建页面的重复步骤都封装成方法以达到代码的重用。
- init : 代表初始化阶段，一般是引入依赖包，注册工具等操作。对于通用工具方法而言，我们这里只需要引入大的依赖即可。在具体的工具组件中，它的初始化会引入具体的工具。
- destory : 代表组件销毁阶段，一般是移除 DOM 节点，清空缓存等操作。
- manipulation : 代表 DOM 操作，一般包括创建节点，绑定事件等。 `helpers` 里面都是原生 DOM 操作，我们可以改写成 Vue 的相关 DOM 操作，并将 Element-Plus 组件库中的组件结合进来。

## Example 
这里我具体以 `ToolBar` 的实现思路来讲解。这里我们的输入是一个 JS 对象列表，输出则是根据该列创建包含合适 Icon 的工具条。如下:
- input
```js
[
    {
        "ToolName": "...",
        "Icon":"...",
        "others":"..."
    },
    {
        "ToolName": "...",
        "Icon":"...",
        "others":"..."
    },
]
```
- output: 除了将以下内容添加代页面外，还需要绑定对应的方法。
```html
<div class="ToolBar" id="toolbar01">
    <el-icon><icon /></el-icon>
    <el-icon><icon /></el-icon>
    <el-icon><icon /></el-icon>
</div>
```
