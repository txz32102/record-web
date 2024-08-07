# 8-1

Cosine Similarity

https://www.benmayersohn.com/2022/09/cosine-similarity-not-for-probabilities/

# 8-3

awesome ai papers

https://github.com/aimerou/awesome-ai-papers
</br></br>

try to download ms coco dataset
</br></br>

clip详细解释

https://www.bilibili.com/video/BV1SL4y1s7LQ/?spm_id_from=333.337.search-card.all.click&vd_source=2c06d8f7a039fb65ceceed80d72ee1c2
</br></br>

How to Train Really Large Models on Many GPUs?

https://lilianweng.github.io/posts/2021-09-25-train-large/
</br></br>

# 8-5

clip for object detection

https://www.pinecone.io/learn/series/image-search/zero-shot-object-detection-clip/
</br></br>

torch.jit.load

https://pytorch.org/docs/stable/generated/torch.jit.load.html
</br></br>

F.multi_head_attention_forward
/home/musong/python/CLIP/clip/model.py, line 72

https://github.com/pytorch/pytorch/blob/main/torch/nn/functional.py
</br></br>

重听attention 20：52开始

https://www.youtube.com/watch?v=hYdO9CscNes

我的总结：

输入向量

$$\mathbf{a}_1, \mathbf{a}_2, \mathbf{a}_3 \in \mathbb{R}^n$$

可学习参数q,k,v

$$q^{1} = W^{q} \alpha^{1}$$
$$q^{2} = W^{q} \alpha^{2}$$
$$q^{3} = W^{q} \alpha^{3}$$
$$q^{i} = W^{q} \alpha^{i}$$
</br>

$$k^{1} = W^{k} \alpha^{1}$$
$$k^{2} = W^{k} \alpha^{2}$$
$$k^{3} = W^{k} \alpha^{3}$$
$$k^{i} = W^{k} \alpha^{i}$$
</br>

$$v^{1} = W^{v} \alpha^{1}$$
$$v^{2} = W^{v} \alpha^{2}$$
$$v^{3} = W^{v} \alpha^{3}$$
$$v^{i} = W^{v} \alpha^{i}$$



注意力分数

$$\alpha_{1,1}=q^1k^1$$

$$\alpha_{1,2}=q^1k^2$$

$$\alpha_{1,3}=q^1k^3$$

$$\alpha_{1,i}=q^1k^i$$

$$\alpha_{1, i}' = \frac{e^{\alpha_{1,i}}}{\sum_{j} e^{\alpha_{i,j}}}$$

最终输出

$$b^1 = {\sum_{i}}\alpha_{1,i}'v^i $$

</br></br>


![示意图](https://raw.githubusercontent.com/txz32102/record-web/main/backend/md/2024-8/attention.png)


# 8-6

try to understand masked multi-head attention

https://stackoverflow.com/questions/58127059/how-to-understand-masked-multi-head-attention-in-transformer

</br></br>

# 8-7

cross attention

https://vaclavkosar.com/ml/cross-attention-in-transformer-architecture