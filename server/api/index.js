import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: 'https://instructor-cfb29vz51-breea-toomeys-projects.vercel.app'
}));

app.get('/', (req, res) => {
      res.send('Backend server is deployed.')
})

app.listen(8080, () => {
      console.log('server listening on port 8080')
})