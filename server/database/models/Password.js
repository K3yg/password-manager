const Sequelize = require('sequelize')
const sequelize = require('../db.js')
const { encrypt } = require('../../controllers/password_controller.js')


const Password = sequelize.define('password', {
    key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('value', encrypt(value))
        }
    }

})

module.exports = Password