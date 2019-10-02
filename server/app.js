const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');


const schema = require('./schema/schema');
const app = express();
app.use(cors());
const port = 9003;

mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb+srv://admin:123@ciklum-cards-iwv8w.mongodb.net/graphql-test?retryWrites=true&w=majority',
    {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`listen port: ${port}`)
});

//https://cloud.mongodb.com