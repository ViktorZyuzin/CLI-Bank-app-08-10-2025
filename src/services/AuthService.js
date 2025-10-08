const InputHandler = require('../utils/InputHandler');

class AuthService {
    constructor() {
        this.users = new Map();
        // Добавляем тестового пользователя
        this.addUser('test', 'Test User', '1234', 100000);
    }

    addUser(login, name, pin, initialBalance = 0) {
        if (!InputHandler.validateLogin(login) || 
            !InputHandler.validateName(name) || 
            !InputHandler.validatePin(pin)) {
            return false;
        }

        if (this.users.has(login)) {
            return false;
        }
        
        const User = require('../models/User');
        this.users.set(login, new User(login, name, pin, initialBalance));
        return true;
    }

    authenticate(login, pin) {
        const user = this.users.get(login);
        if (user && user.validatePin(pin)) {
            return user;
        }
        return null;
    }

    userExists(login) {
        return this.users.has(login);
    }
}

module.exports = AuthService;