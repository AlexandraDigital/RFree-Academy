export default async function handler(req, res) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: 'Forbidden' });
  return res.status(200).json({ message: 'Course added successfully' });
}