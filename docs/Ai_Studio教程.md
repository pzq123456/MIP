# 介绍使用 Ai Studio
> pan 23.4.7 23:00
> ### 思路 **先跑通流程（预测+上传结果）再研究提高策略**

官方教程分为两部分（训练、快速根据提供的权重推理）。我们讨论到具体命令或步骤是，以第一部分和第二部分代之（part1、part2）。

> * 数据预处理大约需要2-3小时，中间不能断开。预处理好后数据就留在该项目里不用动了。
> * 每次重启环境都需要安装一遍 python 库
> * 模型训练据说需要十个小时左右。
> * 官方提供的提分建议是跑第二阶段。五折训练：f1 f2 f3 f4 f5 
> * - 其实预测命令里，数据预处理命令后面紧跟着的就是预测 f2 这一折的命令，所以只要把 f2 改成 f1 f3 f4 f5 就可以了。

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
> 也可以用 gitee 的链接（按照视频里讲的）

- 然后运行该单元格，等待代码运行完毕，需要重命名文件夹，不然会报错，将小写的`paddleseg`改为`PaddleSeg`，如下图:
- ![image](/docs/img/2.jpg)
- 之后按照步骤运行即可，最后会生成一个提交压缩包下载下来即可。
- 然后到[提交结果](https://aistudio.baidu.com/aistudio/competition/detail/889/0/submit-result)提交即可。提交完了之后，系统会打分，打分完了之后，就可以看到自己团队的排名了。

## 2. 提高 Baseline 分数
- 本次比赛的评价指标是 Dice Coefficient，即 Dice 系数，是一种常用的二分类指标，其定义为：
$$Dice = \frac{2|X \cap Y|}{|X| + |Y|}$$

- 其中 $X$ 和 $Y$ 分别是预测结果和真实标签， $\left|X\right|$  表示 $X$ 的绝对值，即 $X$ 中的像素个数。 $|X \cap Y|$  表示  $X$  和  $Y$  的交集，即预测正确的像素个数。
- 能改的包括：模型结构、数据增强、训练策略、预处理、超参数等。
- 根据经验，Baseline 模型一般不用改，只需要调整数据增强、预测后处理以及超参数即可。
- ~~这一块我详细看过后再分配策略。~~ （见下文）

> 这次数据量大，训练时间长，建议训练的时候干点别的，但是人得看着，不然页面崩溃了训练结果就丢了。


## 3. 模型训练策略 针对 `part1`

### 命令分析
- step 6: fold2的数据集划分验证一下精度，运行一下，生成下个命令需要用的json，如果不使用后处理策略可以不运行,有的数据很大，可能导致内存溢出，可以切换A100环境预测下一阶段,
- * 可以除去`--predict_next_stage`参数，不预测该数据的下一阶段. 也就是如下命令：这样的话就直接进行数据预处理。
``` bash
%cd ~/PaddleSeg/contrib/MedicalSeg/
!python nnunet/single_fold_eval.py --config ~/configs/nnunet_fold2.yml \
        --model_path output/cascade_lowres/fold2/iter_30000/model.pdparams --val_save_folder output/cascade_lowres_val \
        --precision fp16 
```

#### predict_next_stage的作用是什么？
- cascade unet分为2阶段：
- * 第一阶段会把分辨率降低进行训练，增强模型的感受野。
- * 第二阶段会把第一阶段的模型预测结果和原始数据一起作为输入，所以训练low resolution模型后，需要预测下一阶段的输入数据。
- 也就是先得到 f0 f1 ... f5 的预测结果，然后把这些结果和原始数据一起作为输入，再训练一个模型。

#### 交叉验证和二阶段训练结合

- 一阶段交叉训练：｜20｜20｜20｜20｜20｜
- 二阶段交叉训练：
-  ｜20（concat（原始数据，一阶段预测的结果））｜
-  ｜20（concat（原始数据，一阶段预测的结果））｜
-  ｜20（concat（原始数据，一阶段预测的结果））｜
-  ｜20（concat（原始数据，一阶段预测的结果））｜
-  ｜20（concat（原始数据，一阶段预测的结果））｜
> `concat` 是把两个数据拼接在一起，这里是把原始数据和一阶段预测的结果拼接在一起，作为二阶段的输入。(pytorch 也有这个函数)

为了训练第二阶段，需要使用五个模型预测整个数据集，这样二阶段才能训练。

### 与[nnUnet](https://aistudio.baidu.com/aistudio/projectdetail/4884907?contributionType=1) 教程比较

#### 1.总览该教程
>  PS: 
> * 2D-UNet和3D-UNet的数据集处理后会大于100GB，训练一个模型的时候，把另一个的数据集删除。
> * 对于我们就不存在这个问题，个人只负责一个模型。 submit 结果保留 连带分数 模型名字 参数 一起发群里
> * 我明天试试看能不能跑通，跑通了我就写下教程发出来。大家如果有什么经验要分享的，可以写成教程发出来，我会把它放到这个文件夹里。 `/docs/ xxx.md ` 图片放在 `/docs/img/` 里面。
教程有6个步骤，分别是：
  - 1、准备工作
  - 2、2D-UNet\3D-UNet训练验证
  - 3、Cascade UNet训练、验证
  - 4、Ensemble
  - 5、预测
  - 6、部署

其实它这个库支持一堆模型的训练预测，最后把这些模型的预测结果融合起来，这样就可以提高分数，这也就是 Ensemble 的作用。最后有这么多种选择：
```
    2D-UNet
    3D-UNet
    Cascade-UNet-lowres
    Cascade-UNet-fullres
    2D-UNet + 3D-UNet
    2D-UNet + Cascade-UNet-fullres
    3D-UNet + Cascade-UNet-fullres
```
我们人多，一人挑一个模型训练，然后会得到 submit 的文件夹。然后把这些文件夹的结果融合起来，就是最后的结果。所以，现在首要任务是：
- 1、挑选模型(刚好四个人，每个人挑一个模型)
```
    2D-UNet
    3D-UNet
    Cascade-UNet-lowres
    Cascade-UNet-fullres
```
四个模型的训练都在这两步里：
```
    - 2、2D-UNet\3D-UNet训练验证
    - 3、Cascade UNet训练、验证
```
- 2、根据教程想办法把模型跑起来，然后把结果提交上去，看看分数。（最后得到的 sumit 文件千万别删，得到分数后 连带分数一起发群里。最后上分就指望这些数据了。）
> 注：
> - 模型具体的命令我还在探索，大家可以自己先试试。时间不是很充裕了，我们得赶紧把这个模型跑起来。
> - 其实不难，就是按照它的教程一步一跑，但是需要耐心。
> - 最后一定要提交数据，并且把分数发群里，这样才能知道我们的模型是否有效。
> - 模型的不同命令、训练时间都会有所不同，这个还需要探索。
> - 最后结果融合的算法应该也得自己写。大不了就求平均。