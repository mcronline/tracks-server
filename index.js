require('./models/Users');
require('./models/Tracks');

const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://trackdbuser:powerl00@cluster0-76dgr.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser : true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo DB instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo DB instance\n',err);
});

app.get('/', requireAuth, (req,res) => {
    res.send("User Email is: "+req.user.email);
});

app.listen(3000, () => {
    console.log('Listening on port 3000! GREAT!');
});