const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize to configure it
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/database.sqlite',
    logging: false
});


// Run a sequelize method to test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({force:false});
        // console.log(result)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}) ();

module.exports = sequelize;