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

Masked language models

https://www.techtarget.com/searchenterpriseai/definition/masked-language-models-MLMs#:~:text=How%20do%20Masked%20Language%20Models,to%20predict%20the%20masked%20tokens.


https://huggingface.co/docs/transformers/en/tasks/masked_language_modeling

self-attention (当天看的hung yi lee的视频，非常有帮助)

https://www.youtube.com/watch?v=hYdO9CscNes

https://slds-lmu.github.io/seminar_nlp_ss20/attention-and-self-attention-for-nlp.html 

（没看完）

https://sebastianraschka.com/blog/2023/self-attention-from-scratch.html

（没看）