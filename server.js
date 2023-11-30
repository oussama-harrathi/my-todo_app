// server.js
import { handler } from './build/handler.js'; 
import express from 'express';

const app = express();

app.use(handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
