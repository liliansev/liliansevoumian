export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    '';

  const response = await fetch('https://datafa.st/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': req.headers['user-agent'] || '',
      'Origin': req.headers['origin'] || '',
      'x-datafast-real-ip': clientIp,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.text();
  res.status(response.status).setHeader('Content-Type', 'application/json').send(data);
}
