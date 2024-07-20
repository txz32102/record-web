# 06-23
bfs
```cpp
// https://www.youtube.com/watch?v=7fujbpJ0LB4
n = number of nodes in the graph;
g = adjacenct list representing;
visited = [false, ..., false] ;// size n
function dfs(at):
    if visited[at]: return;
    visited[at] = true;

    neighbours = graph[at];
    for(auto next : neighbours){
        dfs(next);
    }

start_node = 0
dfs(satrt_node)
```

```c++
// Sample graph represented as an adjacency list
vector<vector<int>> graph = {
    {1, 2},     // Neighbors of node 0
    {0, 3, 4},  // Neighbors of node 1
    {0, 5},     // Neighbors of node 2
    {1},        // Neighbors of node 3
    {1},        // Neighbors of node 4
    {2}         // Neighbors of node 5
};

void dfs(int current, const vector<vector<int>>& graph, vector<bool>& visited) {
    if (visited[current]) return;
    visited[current] = true;
    cout << "DFS visited node: " << current << endl;

    // Get all the neighbors of the current node
    for (int next : graph[current]) {
        dfs(next, graph, visited);
    }
}

void bfs(int start_node, const vector<vector<int>>& graph) {
    int n = graph.size(); // Number of nodes in the graph
    vector<bool> visited(n, false); // Visited array to keep track of visited nodes
    queue<int> q; // Queue for BFS

    q.push(start_node);
    visited[start_node] = true;

    while (!q.empty()) {
        int current = q.front();
        q.pop();
        cout << "Visited node: " << current << endl;

        // Get all the neighbors of the current node
        for (int next : graph[current]) {
            if (!visited[next]) {
                q.push(next);
                visited[next] = true;
            }
        }
    }
}
```