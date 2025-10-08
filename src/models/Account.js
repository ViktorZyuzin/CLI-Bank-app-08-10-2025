const InputHandler = require('../utils/InputHandler');

class Account {
    constructor(accountNumber, userId, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.userId = userId;
        this.balance = initialBalance;
        this.transactions = [];
        this.createdAt = new Date();
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount) {
        if (!InputHandler.validateAmount(amount)) {
            throw new Error('Неверная сумма для пополнения');
        }

        this.balance += amount;
        this.transactions.push({
            type: 'deposit',
            amount: amount,
            date: new Date(),
            balanceAfter: this.balance
        });
        return true;
    }

    withdraw(amount) {
        if (!InputHandler.validateAmount(amount)) {
            throw new Error('Неверная сумма для снятия');
        }

        if (amount > this.balance) {
            throw new Error('Недостаточно средств на счете');
        }

        this.balance -= amount;
        this.transactions.push({
            type: 'withdrawal',
            amount: amount,
            date: new Date(),
            balanceAfter: this.balance
        });
        return true;
    }

    getTransactionHistory() {
        return this.transactions.slice().reverse(); // возвращаем последние транзакции первыми
    }

    getLastTransactions(count = 5) {
        return this.transactions.slice(-count).reverse();
    }

    getAccountInfo() {
        return {
            accountNumber: this.accountNumber,
            balance: this.balance,
            createdAt: this.createdAt,
            totalTransactions: this.transactions.length
        };
    }

    // Генерация номера счета (можно расширить логику)
    static generateAccountNumber() {
        return 'ACC' + Date.now() + Math.floor(Math.random() * 1000);
    }
}

module.exports = Account;