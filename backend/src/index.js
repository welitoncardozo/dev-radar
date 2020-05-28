const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
mongoose.connect('mongodb+srv://weliton:weliton@weliton-cluster-z7m5c.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);