let pool = require('./db.js');

function User(user){
    this.uid = user.uid;
    this.username = user.username;
    this.password = user.password;
};


module.exports = User;
