import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// rotas centralizadas
app.use('/', router);

// rota de vida
app.get('/health', (_req, res) => {
  res.send('ok');
});

export default app;
