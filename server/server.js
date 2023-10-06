const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(PORT, () => console.log("Connected to backend!"));