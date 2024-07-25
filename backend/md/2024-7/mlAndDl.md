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