import express from 'express';
import search from './routes/search';

const app = express();
app.use(express.json());

app.use('/search', search);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server is running on port ' + port);
});
