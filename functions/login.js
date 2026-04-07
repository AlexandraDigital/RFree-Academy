import bcrypt from 'bcryptjs';
import teachers from './teachers.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  const user = teachers.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = Buffer.from(email + ':' + Date.now()).toString('base64');
  return res.status(200).json({ token, role: user.role, email: user.email });
}