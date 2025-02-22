var sum_to_n_a = function(n) {
  if(n === 0) return 0
  let totalSum = n + sum_to_n_a(n-1)
  return totalSum
};

var sum_to_n_b = function(n) {
  let total = 0
  for(let i = 0; i<=n; i++){
    total+= i
  }
  return total
};

var sum_to_n_c = function(n) {
  return Array.from({length:n}).map((_,idx)=>idx+1).reduce((acc,curr)=> acc+curr,0)
};

