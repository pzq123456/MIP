# 基于 Vue 的前端
> 前端项目就是 `MIP_project` 文件夹中的内容，这一块的文档日后可能会挪到 `MIP_project` 文件夹中。
根据功能划分成如下功能模块，每一个模块都必须测试通过，尽可能实现易于理解、易于扩展、易于维护的代码。

## 3D 视图查看器 : (3DViewer)
- 将使用 VTK.js 进行渲染。
- 这一部分的代码需要支持多种渲染方式，比如：体素渲染、线框渲染、透明渲染等。
- 对于可重用性以及可扩展性要求较高，因为后期可能会有其他的渲染需求会调用该模块。

## Segmentation Label 标注 : (SegmentationEditor)
这一块就是对某一图层的不同组织进行标注。`例如`:

    骨骼组织标注为 1，
    肌肉组织标注为 2，
    脂肪组织标注为 3，等等

* 这一块标注数据的存储方式，肯定是在原来的数据之外新建一个利于处理的数据结构，然后在这个数据结构上进行操作。可以考虑使用 [Undo/Redo](https://en.wikipedia.org/wiki/Undo) 的方式，也可以考虑使用 [Diff](https://en.wikipedia.org/wiki/Diff) 的方式。肯定是在原来的数据之外新建一个利于处理的数据结构，然后在这个数据结构上进行操作。
* 比赛要求标注能渲染成三维的，这里不难，就是重用一下 3D 分割结果渲染 的代码。

## 2D 视图查看器 : (2DViewer)
这一块将采用 [cornerstone](https://www.cornerstonejs.org/) 进行开发，与 Segmentation Label 标注 结合紧密，可能在实现的时候就是将 Segmentation Label 部分的功能逻辑作为 2DViewer 的一个插件。
- 需要实现量测、标注等功能。这些功能的大部分都是基于 [cornerstone](https://www.cornerstonejs.org/) 的插件实现的，所以这一块的开发难度不大。