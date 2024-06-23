# tree basic

# leetcode
https://leetcode.com/problems/same-tree/
```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(!p && !q)
            return true;
        if(p && q && q->val == p->val)
            return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
        return false; 
    }
};
```
https://leetcode.com/problems/symmetric-tree/solutions/3290112/easy-solutions-in-java-python-and-c-look-at-once/

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).</br>
Input: root = [1,2,2,3,4,4,3]</br>
Output: true</br>
Input: root = [1,2,2,null,3,null,3]</br>
Output: false</br>
```c++
class Solution {
public:
    bool isMirror(TreeNode* left, TreeNode* right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        return (left->val == right->val) && isMirror(left->left, right->right) && isMirror(left->right, right->left);
    }

    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        return isMirror(root->left, root->right);
    }

};
```