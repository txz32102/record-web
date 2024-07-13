# 7-10

昨天加上今天基本在看排队论了......

前一个人走了才能轮到后一个人，或者说，这两个人的时间是接着的

`https://leetcode.com/problems/average-waiting-time/description/?envType=daily-question&envId=2024-07-09`

```c++
class Solution {
public:
    double averageWaitingTime(vector<vector<int>>& customers) {
        double res = 0;
        int start_time = 0; 
        int end_time = 0;
        int size = customers.size();
        for(int i = 0; i < size; i ++){
			if(end_time > customers[i][0]){
				start_time = end_time;
				end_time = start_time + customers[i][1];
				res = res + end_time - customers[i][0];
			}
			else{
				start_time = customers[i][0];
				end_time = start_time + customers[i][1];
        		res = res + end_time - customers[i][0];
			}
		}
		return res / size;
	}
};
```

# 7-12


https://leetcode.com/problems/maximum-score-from-removing-substrings/description/?envType=daily-question&envId=2024-07-12

这一题看了一下就知道无缘做出来了

https://leetcode.com/problems/maximum-score-from-removing-substrings/editorial/?envType=daily-question&envId=2024-07-12

看解析就是......

然后尝试做一下PAT，做了三四个小时，过了一个点，真牛！不过这个排序可以学习一下下(尽管记不住，悲......)

```c++
#include<iostream>
#include<algorithm>
#include<vector>
#include<stdio.h>

using namespace std;

int main(){
    int people, tasks, records;
    scanf("%d%d%d", &people, &tasks, &records);
    vector<int> score(tasks);
    for(int i = 0; i < tasks; i ++)
        scanf("%d", &score[i]);
    vector<vector<int>> data(records, vector<int>(3, -2));
    for(int i = 0; i < records; i ++){
        scanf("%d%d%d", &data[i][0], &data[i][1], &data[i][2]);
    }
    // for(int i = 0; i < records; i++) {
    //     printf("%d %d %d\n", data[i][0], data[i][1], data[i][2]);
    // }

    vector<vector<int>> res(people, vector<int>(tasks + 3, -2));


    for(int i = 0; i < records; i ++){
        res[data[i][0] - 1][tasks] = data[i][0];
        if(data[i][2] > res[data[i][0] - 1][data[i][1] - 1]){
            res[data[i][0] - 1][data[i][1] - 1] = data[i][2];
        }
    }

    for(int i = 0; i < people; i ++){
        int sum = 0;
        for(int j = 0; j < tasks; j ++){
            if(res[i][j] > 0)
                sum = sum + res[i][j];
        }
        res[i][tasks + 1] = sum;
    }

    for(int i = 0; i < people; i ++)
        res[i][tasks + 2] = 0;
    for(int i = 0; i < people; i ++){
        for(int j = 0; j < tasks; j ++){
            if(res[i][j] == score[j])
                res[i][tasks + 2] ++;
        }
    }

        std::sort(res.begin(), res.end(), [tasks](const std::vector<int>& a, const std::vector<int>& b) {
        if (a[tasks + 1] != b[tasks + 1]) {
            return a[tasks + 1] > b[tasks + 1]; // Primary sort by tasks + 1 in descending order
        }
        if (a[tasks + 2] != b[tasks + 2]) {
            return a[tasks + 2] > b[tasks + 2]; // Secondary sort by tasks + 2 in descending order
        }
        return a[tasks] < b[tasks]; // Tertiary sort by tasks in descending order
    });

    // for(int i = 0; i < people; i ++){
    //     for(int j = 0; j < tasks + 2; j ++)
    //         printf("%d ", res[i][j]);
    //     printf("\n\n");
    // }

    // for(int i = 0; i < people; i ++){
    //     for(int j = 0; j < tasks + 3; j ++)
    //         printf("%d ", res[i][j]);
    //     printf("\n");
    // }

    int exclude = 0;
    for(int i = 0; i < people; i ++){
        int if_exclude = 0;
        for(int j = 0; j < tasks; j ++){
            if(res[i][j] > 0)
                if_exclude = 1;
        }
        if(if_exclude == 0)
            exclude ++;
    }

    // printf("exclude is %d", exclude);

    people = people - exclude;
    
    int rank = 1;
    for(int i = 0; i < people; i ++){
        if(i > 0){
            if(res[i][tasks + 1] != res[i - 1][tasks + 1]){
                rank ++;
            }
        }
        int if_printed = 0;
        if(i > 0)
            if(res[i][tasks + 1] != res[i - 1][tasks + 1]){
                printf("%d %05d %d ", i + 1, res[i][tasks], res[i][tasks + 1]);
                if_printed = 1;
            }
        if(if_printed == 0)
            printf("%d %05d %d ", rank, res[i][tasks], res[i][tasks + 1]);
        for(int j = 0; j < tasks - 1; j ++){
            if(res[i][j] == -2 || res[i][j] == -1)
                printf("- ");
            else
                printf("%d ", res[i][j]);
        }
        if(res[i][tasks - 1] == -2 || res[i][tasks - 1] == -1)
            printf("-");
        else
            printf("%d", res[i][tasks - 1]);
        if(i != people - 1)
            cout << endl;
    }
    
    return 0;
}
```

# 7-13

1004_Counting Leaves
```c++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <string>

using namespace std;

void printTree(const unordered_map<string, vector<string>>& tree) {
    for (const auto& pair : tree) {
        cout << "Node " << pair.first << ": ";
        for (const auto& child : pair.second) {
            cout << child << " ";
        }
        cout << endl;
    }
}

int main() {
    int N, M;
    cin >> N >> M; 
    unordered_map<string, vector<string>> tree;
    for (int i = 0; i < M; ++i) {
        string ID;
        int K;
        cin >> ID >> K;
        vector<string> children(K);
        for (int j = 0; j < K; ++j) {
            cin >> children[j];
        }
        tree[ID] = children;
    }
	
//	printTree(tree);
    
    queue<pair<string, int>> q;
    unordered_map<int, int> leafCount;
    
    q.push(make_pair("01", 0));
    
    while (!q.empty()) {
        pair<string, int> nodeLevel = q.front();
        q.pop();
        
        string node = nodeLevel.first;
        int level = nodeLevel.second;
        
        if (tree.find(node) == tree.end()) {
            // It's a leaf node
//            if (leafCount.find(level) == leafCount.end()) {
//                leafCount[level] = 0;
//            }
            leafCount[level]++;
        } else {
            // It's a non-leaf node, push its children to the queue
            for (size_t i = 0; i < tree[node].size(); ++i) {
                q.push(make_pair(tree[node][i], level + 1));
            }
        }
    }
    
    int maxLevel = 0;
    for (unordered_map<int, int>::iterator it = leafCount.begin(); it != leafCount.end(); ++it) {
        if (it->first > maxLevel) {
            maxLevel = it->first;
        }
    }
    
    for (int i = 0; i <= maxLevel; ++i) {
        if (i > 0) cout << " ";
        if (leafCount.find(i) != leafCount.end()) {
            cout << leafCount[i];
        } else {
            cout << "0";
        }
    }
    cout << endl;
    
    return 0;
}

/*
6 3
01 2 02 03
03 3 02 05 06
04 1 07
*/

```

https://www.liuchuo.net/archives/2229