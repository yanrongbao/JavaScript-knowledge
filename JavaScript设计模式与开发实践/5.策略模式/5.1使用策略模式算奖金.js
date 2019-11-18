// 5.1.使用策略模式算奖金
var perfromanceS = function() {};
perfromanceS.prototype.calculate = function(salary) {
  return salary * 4;
};

var perfromanceA = function() {};
perfromanceA.prototype.calculate = function(salary) {
  return salary * 2;
};

var perfromanceB = function() {};
perfromanceB.prototype.calculate = function(salary) {
  return salary * 1;
};

//定义奖金类
var Bonus = function() {
  this.salary = null;
  this.strategy = null;
};
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary; //设置员工原始工资
};
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy; //设置员工原始工资
};
Bonus.prototype.getBonus = function() {
  return this.strategy.calculate(this.salary);
};
var money = new Bonus();
money.setSalary(10000);
money.setStrategy(new perfromanceS());
console.log(money.getBonus());
//小结  策略模式就是定义一个个策略类 算法被定封装在策略类内部的方法里  在用户需要计算时 将它作为参数保存在使用类中

