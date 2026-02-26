const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const mainRouter = require('./src/route/mainRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});