# 7-21

## cross entropy and cross entropy loss

https://en.wikipedia.org/wiki/Cross-entropy

$$H(p, q)=-\operatorname{E}_p[\log q]$$

$$H(p,q)=−(0⋅\log0.1+0⋅\log0.2+1⋅\log0.7)$$

$$\mathbb{E}_p [\ell] = - \mathbb{E}_p \left[ \frac{\ln q(x)}{\ln(2)} \right] = - \mathbb{E}_p [\log_2 q(x)] = - \sum_{x_i} p(x_i) \log_2 q(x_i) = - \sum_{x} p(x) \log_2 q(x) = H(p, q).$$

# 7-24

A bottleneck layer is a layer that contains few nodes compared to the previous layers. 

https://stats.stackexchange.com/questions/262044/what-does-a-bottleneck-layer-mean-in-neural-networks

今天算是正式看CLIP的第一天（慢慢来吧

https://www.pinecone.io/learn/series/image-search/clip/

(7-26补充链接)

# 7-25

what is linear probing?


Zero-Shot Classification

https://huggingface.co/tasks/zero-shot-classification

# 7-26

VGG

VERY DEEP CONVOLUTIONAL NETWORKS FOR LARGE-SCALE IMAGE RECOGNITION

R-CNN

https://blog.roboflow.com/what-is-r-cnn/#:~:text=Region%2Dbased%20Convolutional%20Neural%20Network,networks%20and%20region%2Dbased%20approaches.

YOLO

https://www.datacamp.com/blog/yolo-object-detection-explained

# 7-27

scaling laws

https://en.wikipedia.org/wiki/Neural_scaling_law
</br></br>

Masked language models

https://www.techtarget.com/searchenterpriseai/definition/masked-language-models-MLMs#:~:text=How%20do%20Masked%20Language%20Models,to%20predict%20the%20masked%20tokens.

https://huggingface.co/docs/transformers/en/tasks/masked_language_modeling
</br></br>

self-attention (当天看的hung yi lee的视频，非常有帮助)

https://www.youtube.com/watch?v=hYdO9CscNes
</br></br>

（没看完）

https://slds-lmu.github.io/seminar_nlp_ss20/attention-and-self-attention-for-nlp.html 
</br></br>

（没看）（7.28，补着看了，multi head attention啥的讲的还是比较清楚的）

https://sebastianraschka.com/blog/2023/self-attention-from-scratch.html
</br></br>

# 7-28

(看完了，讲的很有帮助，self attention是rnn和cnn的superset，还讲了一些paper值得一看)

https://www.youtube.com/watch?v=gmsMY5kc-zw

视频里面提及了三篇论文，非常粗略地看了一下下，论文如下：

An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale [https://arxiv.org/abs/2010.11929]

Long Range Arena: A Benchmark for Efficient Transformers [https://arxiv.org/abs/2011.04006]

Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention [https://arxiv.org/abs/2006.16236]
</br></br>

Word2Vec 

https://en.wikipedia.org/wiki/Word2vec#:~:text=Word2vec%20is%20a%20group%20of,reconstruct%20linguistic%20contexts%20of%20words.

https://www.analyticsvidhya.com/blog/2021/07/word2vec-for-word-embeddings-a-beginners-guide/ 
(这个写的不怎么好)
</br></br>

encoder decoder 

https://medium.com/@ahmadsabry678/a-perfect-guide-to-understand-encoder-decoders-in-depth-with-visuals-30805c23659b

</br></br>

bert gpt
