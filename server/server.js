const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const User = require('./database/models/User.js');
const Password = require('./database/models/Password.js');

const { check_hash, decrypt } = require('./controllers/password_controller.js');

Password.create({key: 'test', value: 'test'});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } })

    if (user) {
        return check_hash(password, user.password) ?
            res.status(200).send('Login successful') : res.status(401).send('Login failed')
    } else {
        return res.status(401).send('Login failed')
    }
})



app.get('/passwords', async (req, res) => {
    const passwords = await Password.findAll();
    res.status(200).send(passwords);
})


app.listen(3000, () => {
    console.log('http://localhost:3000');
})