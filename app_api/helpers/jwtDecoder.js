const atob = require('atob');
const getUser = (token) => {
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
}

module.exports = {
    getUser
}
