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

注意力q,v

$$q^{1} = W^{q} \alpha^{1}$$
$$q^{2} = W^{q} \alpha^{2}$$
$$q^{3} = W^{q} \alpha^{3}$$
$$q^{i} = W^{q} \alpha^{i}$$
</br>

$$k^{1} = W^{k} \alpha^{1}$$
$$k^{2} = W^{k} \alpha^{2}$$
$$k^{3} = W^{k} \alpha^{3}$$
$$k^{i} = W^{k} \alpha^{i}$$

注意力分数

$$e_{ij} = \mathbf{a}_i^\top \mathbf{a}_j$$

注意力权重

$$\alpha_{ij} = \frac{\exp(e_{ij})}{\sum_{k=1}^3 \exp(e_{ik})}$$

输出向量

$$\alpha_i = \sum_{j=1}^3 \alpha_{ij} \mathbf{a}_j$$

总结公式

$$\alpha_i = \sum_{j=1}^3 \left( \frac{\exp(\mathbf{a}_i^\top \mathbf{a}_j)}{\sum_{k=1}^3 \exp(\mathbf{a}_i^\top \mathbf{a}_k)} \right) \mathbf{a}_j$$

</br></br>