# c++ template
```c++
#include<bits/stdc++.h>

using namespace std;

int main(){
    Solution s;
    return 0;
}
```

# 06-14
https://www.liuchuo.net/archives/2161<br>
题目大意：给一串构成树的序列，已知该树是完全二叉搜索树，求它的层序遍历的序列
分析：总得概括来说，已知中序，从根节点开始中序遍历，按中序数组给出的顺序依次将值填入level数组对应的下标中，输出level数组可得层序遍历。
1. 因为二叉搜索树的中序满足：是一组序列的从小到大排列，所以只需将所给序列排序即可得到中序数组in
2. 假设把树按从左到右、从上到下的顺序依次编号，根节点为0，则从根结点root = 0开始中序遍历，root结点的左孩子下标是root * 2 + 1，右孩子下标是root * 2 + 2
3. 因为是中序遍历，所以遍历结果与中序数组in中的值从0开始依次递增的结果相同，即in[t++]（t从0开始），将in[t++]赋值给level[root]数组
4. 因为树是按从左到右、从上到下的顺序依次编号的，所以level数组从0到n-1的值即所求的层序遍历的值，输出level数组即可～
```c++
#include <iostream>
#include <algorithm>
using namespace std;
int in[1010], level[1010], n, t = 0;
void inOrder(int root) {
    if (root >= n) return ;
    inOrder(root * 2 + 1);
    level[root] = in[t++];
    inOrder(root * 2 + 2);
}
int main() {
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        scanf("%d", &in[i]);
    sort(in, in + n);
    inOrder(0);
    printf("%d", level[0]);
    for (int i = 1; i < n; i++)
        printf(" %d", level[i]);
    return 0;
}
```

# 6-19
```c++
class Solution {
public:
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    int n = nums.size();
    for (int i = 0; i < (1 << n); i++) {  // Loop through all possible subsets
        vector<int> subset;
        for (int j = 0; j < n; j++) {     // Check each bit
            if (i & (1 << j)) {           // If j-th bit is set, include nums[j]
                subset.push_back(nums[j]);
            }
        }
        result.push_back(subset);         // Add subset to result
    }
    return result;
}
};
```

1482. Minimum Number of Days to Make m Bouquets
```c++
class Solution {
public:
    // Return the number of maximum bouquets that can be made on day mid.
    int getNumOfBouquets(vector<int>& bloomDay, int mid, int k) {
        int numOfBouquets = 0;

        int count = 0;
        for (int i = 0; i < bloomDay.size(); i++) {
            // If the flower is bloomed, add to the set. Else reset the count.
            if (bloomDay[i] <= mid) {
                count++;
            } else {
                count = 0;
            }

            if (count == k) {
                numOfBouquets++;
                count = 0;
            }
        }

        return numOfBouquets;
    }

    int minDays(vector<int>& bloomDay, int m, int k) {
        int start = 0;
        int end = 0;
        for (int day : bloomDay) {
            end = max(end, day);
        }

        int minDays = -1;
        while (start <= end) {
            int mid = (start + end) / 2;

            if (getNumOfBouquets(bloomDay, mid, k) >= m) {
                minDays = mid;
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }

        return minDays;
    }
};
```

# 6-20
binary search
```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Set the left and right boundaries
        int left = 0, right = int(nums.size()) - 1;
        
        // Under this condition
        while (left <= right) {
            // Get the middle index and the middle value.
            int mid = left + (right - left) / 2;
            
            // Case 1, return the middle index.
            if (nums[mid] == target) {
                return mid;
            } 
            // Case 2, discard the smaller half.
            else if (nums[mid] < target) {
                left = mid + 1;   
            } 
            // Case 3, discard the larger half.
            else {
                right = mid - 1;
            }
        }
        
        // If we finish the search without finding target, return -1.
        return -1;
    }
};
```
https://leetcode.com/problems/magnetic-force-between-two-balls/description/?envType=daily-question&envId=2024-06-20
```c++
class Solution {
public:
    // Check if we can place 'm' balls at 'position'
    // with each ball having at least 'x' gap.
    bool canPlaceBalls(int x, vector<int> &position, int m) {
        // Place the first ball at the first position.
        int prevBallPos = position[0];
        int ballsPlaced = 1;

        // Iterate on each 'position' and place a ball there if we can place it.
        for (int i = 1; i < position.size() && ballsPlaced < m; ++i) {
            int currPos = position[i];
            // Check if we can place the ball at the current position.
            if (currPos - prevBallPos >= x) {
                ballsPlaced += 1;
                prevBallPos = currPos;
            }
        }
        // If all 'm' balls are placed, return 'true'.
        return ballsPlaced == m;
    }

    int maxDistance(vector<int> &position, int m) {
        int answer = 0;
        int n = position.size();
        sort(position.begin(), position.end());

        // Initial search space.
        int low = 1;
        int high = ceil(position[n - 1] / (m - 1.0));
        while (low <= high) {
            int mid = low + (high - low) / 2;
            // If we can place all balls having a gap at least 'mid',
            if (canPlaceBalls(mid, position, m)) {
                // then 'mid' can be our answer,
                answer = mid;
                // and discard the left half search space.
                low = mid + 1;
            } else {
                // Discard the right half search space.
                high = mid - 1;
            }
        }
        return answer;
    }
};
```

# 6-21
A binary tree is uni-valued if every node in the tree has the same value.</br>
Given the root of a binary tree, return true if the given tree is uni-valued, or false otherwise.</br>
Input: root = `[1,1,1,1,1,null,1]`</br>
Output: `true`</br>
Input: root = `[2,2,2,5,2]`</br>
Output: `false`</br>
```c++
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    TreeNode* createTree(){
        TreeNode* root = new TreeNode(3);
        root->left = new TreeNode(3);
        root->right = new TreeNode(2);
        return root;
    }

    bool isUnivalTree(TreeNode* root) {
        if(root == nullptr)
            return true;
        return check(root, root->val);
        
    }

    bool check(TreeNode* root, int val){
        if(root == nullptr)
            return true;
        if(root->val != val)
            return false;
        return check(root->left, val) && check(root->right, val); 
    }
};
```
https://www.liuchuo.net/archives/1890
```c++
#include <iostream>
using namespace std;
int main() {
    float c[1001] = {0};
    int m, n, t;
    float num;
    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        scanf("%d%f", &t, &num);
        c[t] += num;
    }
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d%f", &t, &num);
        c[t] += num;
    }
    int cnt = 0;
    for (int i = 0; i < 1001; i++) {
        if (c[i] != 0) cnt++;
    }
    printf("%d", cnt);
    for (int i = 1000; i >= 0; i--) {
        if (c[i] != 0.0)
            printf(" %d %.1f", i, c[i]);
    }
    return 0;
}
```
dijkstra

<svg
   width="160mm"
   height="130mm"
   viewBox="0 0 160 130"
   version="1.1"
   id="svg1"
   inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
   sodipodi:docname="绘图.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="0.69575617"
     inkscape:cx="396.6907"
     inkscape:cy="216.31141"
     inkscape:window-width="1920"
     inkscape:window-height="991"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg1" />
  <defs
     id="defs1" />
  <g
     transform="matrix(0.26458333,0,0,0.26458333,-78.562382,-22.949417)"
     id="g13">
    <path
       d="m 545,152 c 0,-24.301 21.266,-44 47.5,-44 26.234,0 47.5,19.699 47.5,44 0,24.301 -21.266,44 -47.5,44 -26.234,0 -47.5,-19.699 -47.5,-44 z"
       stroke="#042433"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="#156082"
       fill-rule="evenodd"
       id="path1" />
    <text
       fill="#ffffff"
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="59px"
       transform="translate(576.849,171)"
       id="text1">0</text>
    <path
       d="m 324,307.5 c 0,-24.024 21.266,-43.5 47.5,-43.5 26.234,0 47.5,19.476 47.5,43.5 0,24.024 -21.266,43.5 -47.5,43.5 -26.234,0 -47.5,-19.476 -47.5,-43.5 z"
       stroke="#042433"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="#156082"
       fill-rule="evenodd"
       id="path2" />
    <text
       fill="#ffffff"
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="59px"
       transform="translate(355.43,326)"
       id="text2">1</text>
    <path
       d="m 747,299 c 0,-24.301 21.266,-44 47.5,-44 26.234,0 47.5,19.699 47.5,44 0,24.301 -21.266,44 -47.5,44 -26.234,0 -47.5,-19.699 -47.5,-44 z"
       stroke="#042433"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="#156082"
       fill-rule="evenodd"
       id="path3" />
    <text
       fill="#ffffff"
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="59px"
       transform="translate(779.172,318)"
       id="text3">2</text>
    <path
       d="m 516,508 c 0,-24.301 21.266,-44 47.5,-44 26.234,0 47.5,19.699 47.5,44 0,24.301 -21.266,44 -47.5,44 -26.234,0 -47.5,-19.699 -47.5,-44 z"
       stroke="#042433"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="#156082"
       fill-rule="evenodd"
       id="path4" />
    <text
       fill="#ffffff"
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="59px"
       transform="translate(547.43,527)"
       id="text4">3</text>
    <path
       d="M 0,0 140.359,124.333"
       stroke="#156082"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="none"
       fill-rule="evenodd"
       transform="matrix(-1,0,0,1,545.359,152)"
       id="path5" />
    <path
       d="M 515.516,507.387 371,351"
       stroke="#156082"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="none"
       fill-rule="evenodd"
       id="path6" />
    <path
       d="M 0,0 184.258,165.161"
       stroke="#156082"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="none"
       fill-rule="evenodd"
       transform="matrix(-1,0,0,1,795.258,343)"
       id="path7" />
    <path
       d="M 794.839,254.71 640,152"
       stroke="#156082"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="none"
       fill-rule="evenodd"
       id="path8" />
    <path
       d="M 0,0 328.774,8.77417"
       stroke="#156082"
       stroke-width="2"
       stroke-miterlimit="8"
       fill="none"
       fill-rule="evenodd"
       transform="matrix(-1,0,0,1,747.774,299)"
       id="path9" />
    <text
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="53px"
       transform="translate(452.955,238)"
       id="text9">7</text>
    <text
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="53px"
       transform="translate(720.826,221)"
       id="text10">3</text>
    <text
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="53px"
       transform="translate(564.955,299)"
       id="text11">1</text>
    <text
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="53px"
       transform="translate(428.181,464)"
       id="text12">2</text>
    <text
       font-family="Aptos, Aptos_MSFontService, sans-serif"
       font-weight="400"
       font-size="53px"
       transform="translate(727.019,405)"
       id="text13">0</text>
  </g>
</svg>

https://www.freecodecamp.org/news/dijkstras-algorithm-explained-with-a-pseudocode-example/

这个写的不错


```c++
void dijkstra(vector<vector<int>> data, vector<int> weights){
    vector<vector<int>> matrix(nodes, vector<int>(nodes));

    for(int i = 0; i < nodes; i ++){
        for(int j = 0; j < nodes; j ++){
            matrix[i][j] = INT_MAX;
        }
    }

    for(int i = 0; i < nodes; i ++){
        matrix[i][i] = 0;
    }

    for(int i = 0; i < data.size(); i ++){
        matrix[data[i][0] - 1][data[i][1] - 1] = weights[i];
        matrix[data[i][1] - 1][data[i][0] - 1] = weights[i];
    }

    for (int src = 0; src < nodes; src++) {
        vector<int> dist(nodes, INT_MAX);
        dist[src] = 0;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, src});

        while (!pq.empty()) {
            int u = pq.top().second;
            pq.pop();

            for (int v = 0; v < nodes; v ++) {
                if (matrix[u][v] != INT_MAX) {
                    int weight = matrix[u][v];
                    if (dist[u] + weight < dist[v]) {
                        dist[v] = dist[u] + weight;
                        pq.push({dist[v], v});
                    }
                }
            }
        }

        for (int i = 0; i < nodes; i++) {
            matrix[src][i] = dist[i];
        }
    }

    print(matrix);
}
```

pseudocode

```txt
 1  function Dijkstra(Graph, source):
 2      
 3      for each vertex v in Graph.Vertices:
 4          dist[v] ← INFINITY
 5          prev[v] ← UNDEFINED
 6          add v to Q
 7      dist[source] ← 0
 8      
 9      while Q is not empty:
10          u ← vertex in Q with min dist[u]
11          remove u from Q
12          
13          for each neighbor v of u still in Q:
14              alt ← dist[u] + Graph.Edges(u, v)
15              if alt < dist[v]:
16                  dist[v] ← alt
17                  prev[v] ← u
18
19      return dist[], prev[]
```

# 6-22
<h2>prefix sum! 前缀和！这些题目基本都是prefix sum相关的，直接b站搜，还行</h2>
https://leetcode.com/problems/count-number-of-nice-subarrays/editorial/?envType=daily-question&envId=2024-06-22</br>
</br>
Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.Return the number of nice sub-arrays.</br>
</br>

Example 1:
Input: nums = `[1,1,2,1,1]`, k = `3`</br>
Output: `2`</br>
Explanation: The only sub-arrays with 3 odd numbers are `[1,1,2,1]` and `[1,2,1,1]`.
```c++
class Solution {
public:
    int numberOfSubarrays(vector<int>& nums, int k) {
        int currSum = 0, subarrays = 0;
        unordered_map<int, int> prefixSum;
        prefixSum[currSum] = 1;

        for (int i = 0; i < nums.size(); i++) {
            currSum += nums[i] % 2;
            // Find subarrays with sum k ending at i.
            if (prefixSum.find(currSum - k) != prefixSum.end()) {
                subarrays = subarrays + prefixSum[currSum - k];
            }
            // Increment the current prefix sum in hashmap.
            prefixSum[currSum]++;
        }

        return subarrays;
    }
};
```
</br>
974.Subarray_Sums_Divisible_by_K.cc

```txt
Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

A subarray is a contiguous part of an array.

Example 1:

Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
Example 2:

Input: nums = [5], k = 9
Output: 0
```
 
```c++
/*https://leetcode.com/problems/subarray-sums-divisible-by-k/description/?envType=daily-question&envId=2024-06-09*/

// 0
// 想复杂了，但还是超时了
// 下面是解答
// https://leetcode.com/problems/subarray-sums-divisible-by-k/solutions/5281639/faster-less-mem-detailed-approach-prefix-sum-python-java-c/?envType=daily-question&envId=2024-06-09
class Solution {
public:
    int subarraysDivByK(std::vector<int>& nums, int k) {
        // Initialize count of subarrays, prefix sum, and hash map for remainders
        int count = 0;
        int prefixSum = 0;
        std::unordered_map<int, int> prefixMap;
        prefixMap[0] = 1; // To handle subarrays that start from the beginning

        for (int num : nums) {
            // Update prefix sum
            prefixSum += num;
            
            // Calculate the remainder of the prefix sum divided by k
            int mod = prefixSum % k;
            
            // Adjust negative remainders to be positive
            if (mod < 0) {
                mod += k;
            }
            
            // If this remainder has been seen before, it means there are subarrays ending here that are divisible by k
            if (prefixMap.find(mod) != prefixMap.end()) {
                count += prefixMap[mod];
                prefixMap[mod] += 1;
            } else {
                prefixMap[mod] = 1;
            }
        }
        
        return count; // Total number of subarrays divisible by k
    }
};
```

560.Subarray_Sum_Equals_K.cc

https://leetcode.com/problems/subarray-sum-equals-k/solutions/1759909/c-full-explained-every-step-w-dry-run-o-n-2-o-n-two-approaches/

```txt
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
```

```c++
class Solution {
public:
    int subarraySum(vector<int>& arr, int k) {
        int n = arr.size(); // take the size of the array
        
        int prefix[n]; // make a prefix array to store prefix sum
        
        prefix[0] = arr[0]; // for element at index at zero, it is same
        
        // making our prefix array
        for(int i = 1; i < n; i++)
        {
            prefix[i] = arr[i] + prefix[i - 1];
        }
        
        unordered_map<int,int> mp; // declare an unordered map
        
        int ans = 0; // to store the number of our subarrays having sum as 'k'
        
        for(int i = 0; i < n; i++) // traverse from the prefix array
        {
            if(prefix[i] == k) // if it already becomes equal to k, then increment ans
                ans++;
            
            // now, as we discussed find whether (prefix[i] - k) present in map or not
            if(mp.find(prefix[i] - k) != mp.end())
            {
                ans += mp[prefix[i] - k]; // if yes, then add it our answer
            }
            
            mp[prefix[i]]++; // put prefix sum into our map
        }
        
        return ans; // and at last, return our answer
    }
};
```
# 6-23

https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/editorial/?envType=daily-question&envId=2024-06-23

说是medium题目，但我感觉难度偏高，意义不大，今天看得多的还是树相关的

# 6-26
因为短学期，几天没刷leetcode了

# 6-29

bfs

```c++
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Graph {
    int V; // Number of vertices
    vector<vector<int>> adj; // Adjacency list

public:
    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    void addEdge(int v, int w) {
        adj[v].push_back(w);
    }

    void BFSUtil(queue<int> &queue, vector<bool> &visited) {
        if (queue.empty()) return;

        int vertex = queue.front();
        cout << vertex << " ";
        queue.pop();

        for (auto i = adj[vertex].begin(); i != adj[vertex].end(); ++i) {
        	cout << "in for loop now, i is (" << *i << ")" << endl;
            if (!visited[*i]) {
                visited[*i] = true;
                queue.push(*i);
            }
        }

        BFSUtil(queue, visited);
    }

    void BFS(int start) {
        vector<bool> visited(V, false);
        queue<int> queue;

        visited[start] = true;
        queue.push(start);

        BFSUtil(queue, visited);
    }
};

int main() {
    Graph g(7);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 5);
    g.addEdge(1, 6);
    g.addEdge(2, 6);
    g.addEdge(4, 5);

    cout << "Breadth First Traversal starting from vertex 1:\n";
    g.BFS(1);

    return 0;
}

```

dfs

```c++
#include <iostream>
#include <vector>

using namespace std;

class Graph {
    int V; // Number of vertices
    vector<vector<int>> adj; // Adjacency list

    void DFSUtil(int v, vector<bool> &visited) {
        visited[v] = true;
        cout << v << " ";

        for (auto i = adj[v].begin(); i != adj[v].end(); ++i)
            if (!visited[*i])
                DFSUtil(*i, visited);
    }

public:
    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    void addEdge(int v, int w) {
        adj[v].push_back(w);
    }

    void DFS(int start) {
        vector<bool> visited(V, false);
        DFSUtil(start, visited);
    }
};

int main() {
    Graph g(7);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
//    g.addEdge(1, 6);
    g.addEdge(2, 5);
    g.addEdge(2, 6);
//    g.addEdge(4, 5);

    cout << "Breadth First Traversal starting from vertex 2:\n";
    g.DFS(0);

    return 0;
}

```