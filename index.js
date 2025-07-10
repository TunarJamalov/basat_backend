import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123456';
const MOCKAPI_URL = 'https://68582b6721f5d3463e575b61.mockapi.io/products';

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Login successful' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(MOCKAPI_URL);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const response = await axios.post(MOCKAPI_URL, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${MOCKAPI_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${MOCKAPI_URL}/${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 