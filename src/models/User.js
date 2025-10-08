const Account = require('./Account');

class User {
    constructor(login, name, pin, initialBalance = 0) {
        this.login = login;
        this.name = name;
        this.pin = pin;
        this.account = new Account(Account.generateAccountNumber(), login, initialBalance);
        this.createdAt = new Date();
    }

    validatePin(pin) {
        return this.pin === pin;
    }

    checkBalance() {
        return this.account.getBalance();
    }

    deposit(amount) {
        try {
            return this.account.deposit(amount);
        } catch (error) {
            console.log(`Ошибка при пополнении: ${error.message}`);
            return false;
        }
    }

    withdraw(amount) {
        try {
            return this.account.withdraw(amount);
        } catch (error) {
            console.log(`Ошибка при снятии: ${error.message}`);
            return false;
        }
    }

    getAccountInfo() {
        return this.account.getAccountInfo();
    }

    getTransactionHistory() {
        return this.account.getTransactionHistory();
    }

    getLastTransactions(count = 5) {
        return this.account.getLastTransactions(count);
    }

    getUserInfo() {
        return {
            login: this.login,
            name: this.name,
            createdAt: this.createdAt,
            account: this.getAccountInfo()
        };
    }
}

module.exports = User;