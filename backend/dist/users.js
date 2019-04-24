"use strict";
// To simulate user to login
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return (another !== undefined
            && another.email === this.email
            && another.password === this.password);
    };
    return User;
}());
exports.User = User;
// Listagem de usuários indexados pelo seu e-mail
exports.users = {
    'juliana@gmail.com': new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    'amanda@gmail.com': new User('amanda@gmail.com', 'Amanda', 'Amanda21')
};
// Tipagem de objeto do tipo chave/valor
// {[Key: string]: User}
