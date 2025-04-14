const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const postsRouter = require('./routers/posts');
const logger = require('./middlewares/logger')
const serverError = require('./middlewares/serverError')
const error_404 = require('./middlewares/error_404')

app.use(express.json());
app.use(express.static('public'))

app.use(logger)

app.get('/', (req, res) => {
  res.send('welcome to our server');
});

app.use("/api/v1/posts", postsRouter);

app.use(serverError)

app.use(error_404)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})



