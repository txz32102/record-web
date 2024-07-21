# 7-10

昨天加上今天基本在看排队论了......

前一个人走了才能轮到后一个人，或者说，这两个人的时间是接着的

https://leetcode.com/problems/average-waiting-time/description/?envType=daily-question&envId=2024-07-09

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

# 7-14

https://leetcode.com/problems/number-of-atoms/?envType=daily-question&envId=2024-07-14

一天两个hard，男泵

```c++
#include <iostream>
#include <vector>
#include <map>
#include <stack>
#include <algorithm>

using namespace std;

class Solution {
public:
    string countOfAtoms(string formula) {
        stack<map<string, int>> stk;
        map<string, int> current;
        int size = formula.size();
        
        for (int i = 0; i < size;) {
            if (formula[i] == '(') {
                stk.push(current);
                current.clear();
                i++;
            } else if (formula[i] == ')') {
                int j = i + 1;
                while (j < size && isdigit(formula[j])) j++;
                int multiplier = j > i + 1 ? stoi(formula.substr(i + 1, j - i - 1)) : 1;
                i = j;
                
                if (!stk.empty()) {
                    map<string, int> top = stk.top();
                    stk.pop();
                    for (auto &p : current) {
                        top[p.first] += p.second * multiplier;
                    }
                    current = top;
                }
            } else {
                int j = i + 1;
                while (j < size && islower(formula[j])) j++;
                string name = formula.substr(i, j - i);
                i = j;
                while (j < size && isdigit(formula[j])) j++;
                int count = j > i ? stoi(formula.substr(i, j - i)) : 1;
                i = j;
                current[name] += count;
            }
        }

        vector<pair<string, int>> elements(current.begin(), current.end());
        sort(elements.begin(), elements.end());
        
        string res;
        for (auto &element : elements) {
            res += element.first;
            if (element.second > 1) res += to_string(element.second);
        }

        return res;
    }
};

int main() {
    string formula = "(OH)2";
    Solution s;
    string result = s.countOfAtoms(formula);
    cout << result << endl;
    map<string, int> data = {{"abc", 1}, {"cbd", 2}};
    cout << data["abc"] << endl;
    return 0;
}
```

https://leetcode.com/problems/robot-collisions/?envType=daily-question&envId=2024-07-13

```c++
struct robot {
    int position;
    int health;
    int direction;
    int index;
};

bool cmp(robot a, robot b) {
    return a.position < b.position;
}

class Solution {
public:
    vector<int> survivedRobotsHealths(vector<int>& positions, vector<int>& healths, string directions) {
        vector<int> res;
        int size = positions.size();
        vector<robot> data(size);

        for (int i = 0; i < size; i++) {
            data[i].position = positions[i];
            data[i].health = healths[i];
            data[i].direction = (directions[i] == 'L') ? 0 : 1;
            data[i].index = i;
        }

        sort(data.begin(), data.end(), cmp);

        vector<robot> stack;
        bool collisionHappened = false;

        for (int i = 0; i < size; i++) {
            if (stack.empty() || data[i].direction == 1 || (data[i].direction == 0 && stack.back().direction == 0)) {
                stack.push_back(data[i]);
            } else {
                collisionHappened = true;
                while (!stack.empty() && stack.back().direction == 1 && stack.back().health < data[i].health) {
                    data[i].health--;
                    stack.pop_back();
                }
                if (!stack.empty() && stack.back().direction == 1 && stack.back().health == data[i].health) {
                    stack.pop_back();
                } else if (!stack.empty() && stack.back().direction == 1) {
                    stack.back().health--;
                } else {
                    stack.push_back(data[i]);
                }
            }
        }

        if (!collisionHappened) {
            return healths;
        }

        for (const auto& robot : stack) {
            res.push_back(robot.health);
        }

        sort(stack.begin(), stack.end(), [](const robot &a, const robot &b) {
            return a.index < b.index;
        }); 

        res.clear();
        for (const auto& robot : stack) {
            res.push_back(robot.health);
        }

        return res;
    }
};
```

# 7-19

脑子不清醒做不出来的题目~

```c++
/*
https://leetcode.com/problems/lucky-numbers-in-a-matrix/description/?envType=daily-question&envId=2024-07-19
*/
// indexing值得一看，脑子不清醒的话是做不出来的~
// 90
#include<bits/stdc++.h>

using namespace std;

class Solution {
public:
    vector<int> luckyNumbers (vector<vector<int>>& matrix) {
    	vector<int> res;
        int rows = matrix.size(), cols = matrix[0].size();
        for(int i = 0; i < rows; i ++){
        	int row_min_val = matrix[i][0];
        	int col_max = 0;
        	for(int i0 = 1; i0 < cols; i0 ++){
        		if(row_min_val > matrix[i][i0]){
        			row_min_val = matrix[i][i0];
        			col_max = i0;
				}
			}
			
			int j = 0;
			for(j = 0; j < rows; j ++){
				if(row_min_val < matrix[j][col_max])
					break;
			}
			if(j == rows)
				res.push_back(row_min_val);
    	}
    	return res;
	}
};	

int main(){
	Solution s;	
	vector<int> data;
	vector<vector<int>> res = {{3, 7, 8}, {9, 11, 13}, {15, 16, 17}};
	data = s.luckyNumbers(res);
	for(int i = 0; i < data.size(); i ++)
		cout << data[i] << " ";
	return 0;
} 
```