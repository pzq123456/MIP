# 介绍使用 Ai Studio
> pan 23.4.7 23:00
> ### 思路 **先跑通流程（预测+上传结果）再研究提高策略**

## 1. 跑通 Baseline
> https://aistudio.baidu.com/aistudio/competition/detail/889/0/datasets
- 点开连接
- 点击 [Baseline](https://aistudio.baidu.com/aistudio/projectdetail/5836342)
- 点击`运行一下`，选择 GPU 运行项目，点击`进入环境`，进入如下页面:
- ![image](/docs/img/aistudio.jpg)
> - 当前打开的是一个名为`main.ipynb`的 Jupyter Notebook 文件，里面每一个单元格都可以单独运行。
> - 第一次只需要跑通 BaseLine，不需要修改任何代码。
- `main.ipynb`文件中由两部分组成，第一部分涉及模型训练，我们先跳过。第二部分直接调用给定的参数推理结果，我们只需要运行第二部分即可。
> !注意：依据提示运行该单元格下的代码
> ## nnunet高精度模型 推理-提交全流程
> 使用提供的权重，快速进行推理提交
- 首先看第一个单元格:
- ![image](/docs/img/cell1.jpg)
- 将红框中的代码替换为: (这是我截的图，原来不是这个，是github的链接巨慢，所以我把代码复制到了gitlab上，然后用gitlab的链接)
```
    !git clone https://gitlab.com/pzq123456/paddleseg.git
```
- 然后运行该单元格，等待代码运行完毕，需要重命名文件夹，不然会报错，将小写的`paddleseg`改为`PaddleSeg`，如下图:
- ![image](/docs/img/2.jpg)
- 之后按照步骤运行即可，最后会生成一个提交压缩包下载下来即可。
- 然后到[提交结果](https://aistudio.baidu.com/aistudio/competition/detail/889/0/submit-result)提交即可。提交完了之后，系统会打分，打分完了之后，就可以看到自己团队的排名了。

## 2. 提高 Baseline 分数
- 本次比赛的评价指标是 Dice Coefficient，即 Dice 系数，是一种常用的二分类指标，其定义为：
$$ Dice = \frac{2|X \cap Y|}{|X| + |Y|} $$
- 其中 $X$ 和 $Y$ 分别是预测结果和真实标签，$|X|$ 表示 $X$ 中元素的个数，$|X \cap Y|$ 表示 $X$ 和 $Y$ 的交集中元素的个数。
- 能改的包括：模型结构、数据增强、训练策略、预处理、超参数等。
- 根据经验，Baseline 模型一般不用改，只需要调整数据增强、预测后处理以及超参数即可。
- 这一块我详细看过后再分配策略。

> 这次数据量大，训练时间长，建议训练的时候干点别的，但是人得看着，不然页面崩溃了训练结果就丢了。