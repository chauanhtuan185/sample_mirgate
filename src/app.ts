import postRouter from "./routes/api";
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:3000', 'https://buildlink.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Buildinks API",
      version: "1.0.0",
      description: "Docs for Buildlink API",
    },
    servers: [
      {
        url: "localhost:3000",
      },
    ],
  },

  apis: ["./routes/*.js"],

};

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/answer', postRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
