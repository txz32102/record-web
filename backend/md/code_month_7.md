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