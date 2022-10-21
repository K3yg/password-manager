const Sequelize = require('sequelize')
const sequelize = require('../db.js')

const {hash} = require('../../controllers/password_controller.js')


const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(password) {
            this.setDataValue('password', hash(password, 14))
        }
    }
})

module.exports = User