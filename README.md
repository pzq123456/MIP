# A3-基于百度飞桨的 3D 医疗数据解析平台 SKDDX20 组
> - 项目地址 https://github.com/pzq123456/MIP
> - http://www.cnsoftbei.com/plus/view.php?aid=796
> - https://aistudio.baidu.com/aistudio/competition/detail/889/0/introduction


## 赛事流程（根据去年经验）
- `算法打榜`预选赛（截止2023年5月1，打榜赛，根据算法成绩决定晋级区域赛；5月31针对未晋级区域赛的同学，开展复活赛，仅考核软件，考核方式为提交软件演示录制视频即可，不答辩）要点：
- * 基于`飞桨框架`的算法，一般有Baseline，可以直接使用。主要是在百度[AI Studio](https://aistudio.baidu.com/aistudio/index)上训练模型，然后提交推理结果交由平台打分。全国分区，每个区域赛前xx名晋级总决赛（去年预选赛我们是东部赛区第16名）。训练模型主要是修改超参数，调整网络结构，数据增强等。每天一个团队可提交六次。
- `软件开发+文档编写`区域赛（2023年6月、7月。综合考虑算法30%+软件70%）
- 注：
- * `算法部分`（20%）：本次比赛要求选手将算法结果/模型提交至AI Studio进行自动评测。要求选手基于PaddlePaddle，在官方指定数据集上进行打榜，实现在验证集上，给定任一3D医疗数据，准确地完成医学数据的分割任务。 
- * `软件部分`（80%）：本次比赛要求选手基于web技术实现。要求选手实现基于WEB的3D医疗数据解析平台，其中包含医疗数据的导入、分割、可视化和数据分析功能四大基础功能，且飞桨模型可在本地或云端部署进行推理。选手可设计更多相关场景的附加功能，通过稳定的软件功能和优秀的人机交互，为非AI专业人员提供良好用户体验。


## 软件部分（80%） 详细要求
1. 3D数据读取与推理：包括导入数据、加载模型和分割预测
- `导入数据`:图像支持格式包含nii、nii.gz、mhd、raw、dcm 等常见格式
- `加载模型`:支持模型的介绍、选择与加载
- `分割预测`:基于导入模型，对任一测试数据进行推理分割并将分割后的结果保存为标签
- `标签管理`:支持标签的增删、修改和颜色的切换；支持标签的导出保存，导出的标签格式和输入图像格式一致；（通常来说，图像分割的输入是一张图像，输出也是一张图像，每个像素点都对应一个标签。）

2. 预测展示；

2.1 原图和标签支持3D可视化；
- 三视图展示原图和标签显示，每个视图支持鼠标拖动进行切片切换、鼠标拖动带动3D原点的变化，视图支持缩放和窗宽窗位调整
- 支持使用`笔刷`、`橡皮擦`、`提取最大连通域`等方式对模型推理分割结果进行优化，并将结果在三视图和 `3D 渲染效果`中展示

2.2 数据分析：包括测量、计数、自定义数据分析和统计结果展示
- `测量`:基于 spacing 等参数，获取测量分割目标在x, y, z切面上的直径、面积和目标体积等结果
- `计数`:基于现有分割结果，统计不同类别数据的个数，例如某类病灶的计数
- `自定义数据分析`:基于用户上传的后处理脚本返回结果进行合理的展示和分析（可以规定后处理的返回内容和方式）
- `统计结果展示`:针对用户上传的所有医疗数据进行上述分析，并对分析结果进行图标展示；并支持显示所有符合筛选要求的数据索引

1. 其他创新附加功能。（10%）

如根据各类分割及分析结果，自动生成高质量病例报告。




## 已知的资源
https://ohif.org/
https://www.cornerstonejs.org/
https://www.orthanc-server.com/

## 项目管理开发工具

### 团队管理工具
- `git`：代码管理工具
- `github`：代码托管平台
### 文档管理工具
- `jsdoc`：文档生成工具
- `pydoc`：文档生成工具

### 技术栈
- `python`：后端开发语言
- * `flask`：后端框架(接口封装)
- * `paddle`：飞桨框架(算法)
- * `数据库操作库`：数据库也可能用js写
- `WebDicom Sever`：Dicoms数据库(Orthanc...)
- `Radis`：缓存数据库(用以实现进度条等功能)
- `javascript`：前端开发语言
- * `vue`：前端框架
- * `three.js`：3D可视化库
- * `cornerstone`：2D可视化库
- ...

## 信息

- 成员信息
```
    潘志清 18352874270 
    于嘉烨 19506151951
    韦立楠 16688089588
    覃仕锋 18077287271
```

- 老师信息
```
    刘冰
    13780686818
    LB@sdust.edu.cn
    计算机科学与工程学院，测绘与空间信息学院
    智慧城市，GIS应用与开发
    副教授
```