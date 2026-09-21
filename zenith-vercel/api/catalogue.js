import { put, head } from '@vercel/blob';

const KEY = 'zenith/catalogue.json';
const PASS = () => process.env.ADMIN_PASSWORD || '002';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const meta = await head(KEY);
      const r = await fetch(meta.url + '?t=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) throw new Error('lecture impossible');
      return res.status(200).json(await r.json());
    } catch (e) {
      // Pas encore de catalogue enregistré : la page utilisera le contenu par défaut.
      return res.status(200).json({ modules: null });
    }
  }

  if (req.method === 'POST') {
    if (req.headers['x-admin-password'] !== PASS()) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (body.check) return res.status(200).json({ ok: true });
    if (!body.data || !Array.isArray(body.data.modules)) {
      return res.status(400).json({ error: 'Données invalides' });
    }
    const json = JSON.stringify(body.data);
    if (json.length > 2_000_000) return res.status(413).json({ error: 'Catalogue trop volumineux' });
    try {
      await put(KEY, json, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 60,
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: "Enregistrement impossible. Le stockage Blob est-il bien connecté au projet ?" });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end();
}
