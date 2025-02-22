var sum_to_n_a = function(n) {
  if (n === 0) return 0;
  let totalSum = n + sum_to_n_a(n - 1);
  return totalSum;
};

/*
  Time Complexity: O(n) - The function calls itself n times.
  Space Complexity: O(n) - Due to the recursion stack.
  Efficiency: Not great for large n because of the function call overhead. 
  Can even cause a stack overflow if n is too large.
*/

var sum_to_n_b = function(n) {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
};

/*
  Time Complexity: O(n) - Simple loop from 0 to n.
  Space Complexity: O(1) - Only uses a single variable.
  Efficiency: Much better than recursion. No stack overhead, runs smoothly for large n.
*/

var sum_to_n_c = function(n) {
  return Array.from({ length: n }).map((_, idx) => idx + 1).reduce((acc, curr) => acc + curr, 0);
};

/*
  Time Complexity: O(n) - Both .map() and .reduce() iterate over n elements.
  Space Complexity: O(n) - Creates an entire array, which is unnecessary.
  Efficiency: The worst of the three because it wastes memory by creating an array.
*/

var sum_to_n_optimized = function(n) {
  return (n * (n + 1)) / 2;
};

/*
  Time Complexity: O(1) - Just a single arithmetic operation.
  Space Complexity: O(1) - Only uses a few variables.
  Efficiency: The best possible solution. No loops, no recursion, super fast.
*/
