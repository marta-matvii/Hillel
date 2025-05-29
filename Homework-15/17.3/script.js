class BankAccount {
  constructor(initialBalance) {
    this.balance = initialBalance;
  }
  
  getBalance() {
    return this.balance;
  }
  
  deposit(amount) {
    this.balance += amount;
  }
  
  withdraw(amount) {
    this.balance -= amount;
  }
}

const account1 = new BankAccount(1000);

console.log(account1.getBalance());
account1.deposit(500);
console.log(account1.getBalance());
account1.withdraw(200);
console.log(account1.getBalance());

const outputElement = document.getElementById('output');

const initialBalance = document.createTextNode(`Initial balance: ${account1.getBalance()}`);
const br1 = document.createElement('br');

account1.deposit(300);
const afterDeposit = document.createTextNode(`After deposit 300: ${account1.getBalance()}`);
const br2 = document.createElement('br');

account1.withdraw(100);
const afterWithdraw = document.createTextNode(`After withdraw 100: ${account1.getBalance()}`);

outputElement.appendChild(initialBalance);
outputElement.appendChild(br1);
outputElement.appendChild(afterDeposit);
outputElement.appendChild(br2);
outputElement.appendChild(afterWithdraw);