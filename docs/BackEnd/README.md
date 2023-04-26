# 后端开发文档

## 1. 独立运行的 WebDICOM 服务
  为了演示的方便，这一块会在服务器上进行开发。具体也不难，只要能 CURD dicom数据就可以了。这一块应该尽快开发，大概一周左右就可以了。 可以直接想办法运行现成的 [NeurDICOM](https://github.com/reactmed/neurdicom) 服务，然后在上面进行修改。当然，如果实在跑不起来，也可以直接自己写一个后端。因为都是重复性的增删查改，写起来很快的。

## 2. 后端算法模块
### 1. 实体数据管理模块 : (EntityDataManager)
* 实体指的是 DICOM 数据，以及 DICOM 数据的分割结果。该模块是在宏观层面对数据进行管理，维护数据的一致性，唯一性。就是说，已经有的数据不能重复传入。
* 这一块有些功能与 WebDICOM 服务 有重叠，可能需要合并。
### 2. 功能算法模块 : (FunctionAlgorithmManager)
* 这一块是对前端算法的补充，需要前后端协调后共同开发。

### 3. AI模型模块 : (AIModelManager)
* 如果能在百度上部署就不用本地部署了，这样就不用考虑模型的部署问题了。