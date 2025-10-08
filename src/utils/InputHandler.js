class InputHandler {
    static validatePin(pin) {
        return /^\d{4}$/.test(pin);
    }

    static validateAmount(amount) {
        const num = parseInt(amount);
        return !isNaN(num) && num > 0;
    }

    static validateLogin(login) {
        return login && login.length >= 3 && /^[a-zA-Z0-9]+$/.test(login);
    }

    static validateName(name) {
        return name && name.length >= 2;
    }

    static sanitizeInput(input) {
        return input.trim();
    }

    static formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount) + ' руб.';
    }

    static formatDate(date) {
        return date.toLocaleString('ru-RU');
    }

    static generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

module.exports = InputHandler;