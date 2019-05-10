let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let apiRoutes = require('./routes/index');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 4200;

app.get('/', (req, res) => {
    res.send('Hello, Ekki!');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log('API server on port: ' + port);
});
