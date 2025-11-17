
# Phase 1 — Déployer sur **Render** pas‑à‑pas (débutant)

## 0) Créer ton compte et lier GitHub
- Inscris‑toi sur **render.com** et connecte **GitHub**.  
- Sur le dashboard, clique **New** puis **Blueprint**.  
> Réf. : *Your First Render Deploy* (types de services : Web Service vs Static Site).

## 1) Utiliser le Blueprint fourni (`render.yaml`)
- Sélectionne ton repo GitHub → Render lit `render.yaml` et propose **3 ressources** :
  1) **cee-backend** (Web Service Node) – écoute `process.env.PORT` (ici 10000)  
  2) **cee-frontend** (Static Site) – build Vite → `dist`  
  3) **cee-db** (PostgreSQL managé) – URL injectée dans `DATABASE_URL`  
> Réf. : *Blueprint YAML Reference* ; *Render Postgres*.

## 2) Configurer les variables (Backend)
Dans **cee-backend → Environment** :
- `JWT_SECRET` (génère une valeur forte)
- `SMIC_JOURNALIER` = `90.00`
- `PIVOT_REMUNERATION` = `2025-05-01`
- `CORS_ORIGINS` = `https://<ton-frontend>.onrender.com`
- `ESIGN_PROVIDER` = `yousign` (par défaut)
- `YOUSIGN_API_KEY` = `<clé sandbox>` (ou variables DocuSign/Universign)

## 3) Déployer
- Clique **Apply** (ou **Deploy**). Render **build** puis **start**.
- Attends les URLs :
  - Backend : `https://cee-backend.onrender.com`
  - Frontend : `https://cee-frontend.onrender.com`

## 4) Smoke test (copie/colle)
Remplace `<BACKEND>` par l’URL du backend :

**Créer un contrat**
```bash
curl -X POST https://<BACKEND>/api/contrats-cee   -H 'Content-Type: application/json'   -d '{"salarie":{"nom":"Dupont","prenom":"Camille"},"dateDebut":"2025-07-01","dateFin":"2025-07-05","logeSurPlace":true,"remunerationJour":400,"joursPrevus":5}'
```
**Générer le PDF**
```bash
curl -X POST https://<BACKEND>/api/contrats-cee/<ID>/pdf   -H 'Content-Type: application/json'   -d '{"salarie":{"nom":"Dupont","prenom":"Camille"}}'
```
**Envoyer en e‑signature (Yousign sandbox)**
```bash
curl -X POST https://<BACKEND>/api/contrats-cee/<ID>/esign   -H 'Content-Type: application/json'   -d '{"recipients":[{"email":"signer@example.org","firstName":"Camille","lastName":"Dupont"}],"pdfBase64":"<pdf-encodé-base64>"}'
```

## 5) Dépannage rapide
- **Puppeteer** : si Chrome non trouvé, garde `puppeteer.config.cjs` (cache). Ajoute `--no-sandbox`.  
- **PORT** : ne le fixe pas en dur; Render fournit `process.env.PORT`.  
- **CORS** : ajoute l’URL front exacte.  
- **DB** : `DATABASE_URL` arrive automatiquement depuis la ressource **cee-db**.  

> Réfs : *Deploy Node/Express*, *Static Sites*, *Postgres*, *Deploy Puppeteer with Node*, *StackOverflow fix cache*, *Vite deployment notes*.

_MAJ : 2025-11-16 23:17_
