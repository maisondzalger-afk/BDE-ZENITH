# Zénith – ESAA

Plateforme de cours et fiches de révision du BDE Zénith.

## Mise en ligne sur Vercel
1. Crée un dépôt GitHub avec le contenu de ce dossier, puis sur vercel.com : Add New > Project > importe le dépôt > Deploy.
2. Dans le projet Vercel : Storage > Create > Blob. Choisis l'accès **Public** et connecte-le au projet.
3. Settings > Environment Variables : ajoute `ADMIN_PASSWORD` avec la valeur souhaitée (par défaut `002` si tu ne le fais pas).
4. Deployments > Redeploy (pour que les variables et le stockage soient pris en compte).

Le mot de passe est vérifié côté serveur et n'apparaît pas dans le code de la page.
