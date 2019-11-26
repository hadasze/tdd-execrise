
# Node Platfrom introduction

## Node Basics

## Express.js

[Example](https://gist.github.com/yanivefraim/4930348959f9eeb240c337c9a4e90563):

```js
const express = require('express');

const app = express();

const reqTime = (req, res, next) => {
    req.reqTime = Date.now();
    next();
}

app.use(reqTime);

app.get('/api/games', (req, res) => {
    res.send('hello world ' + req.reqTime);
});

app.get('*', (req, res) => {
    res.send('my page ' + req.reqTime);
});

app.listen(3000);
```

## Yoshi server architecture



