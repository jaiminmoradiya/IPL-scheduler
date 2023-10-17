const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/main');

app.use(cors());



app.use('/', routes);

app.listen(5566, () => {
    console.log("Server is running on port 5566");
});