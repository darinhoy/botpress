const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory store for demo / development
const loans = [];
let nextId = 1;

app.get('/', (req, res) => res.json({ ok: true, message: 'Loan backend running' }));

app.post('/api/loan', (req, res) => {
  const { botpress_user_id, name, phone, amount, salary } = req.body;
  if (!botpress_user_id) return res.status(400).json({ message: 'botpress_user_id required' });

  const loan = {
    id: nextId++,
    botpress_user_id,
    name: name || null,
    phone: phone || null,
    amount: amount != null ? Number(amount) : null,
    salary: salary != null ? Number(salary) : null,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  loans.push(loan);
  console.log('New loan received:', loan);
  return res.json({ message: 'Loan request received', loanId: loan.id });
});

app.get('/api/loan-status', (req, res) => {
  const userId = req.query.botpress_user_id;
  if (!userId) return res.status(400).json({ message: 'botpress_user_id query required' });

  const userLoans = loans.filter(l => l.botpress_user_id === userId);
  if (userLoans.length === 0) return res.status(404).json({ message: 'No loan found' });

  const last = userLoans[userLoans.length - 1];
  return res.json({ status: last.status, loanId: last.id });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
