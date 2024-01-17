import express from 'express';
import routes from './routes';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());

app.use(routes)




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app started ${PORT}`)
})
