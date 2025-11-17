# Roadmap – CEE (Render + PDF + e‑signature)

Dernière mise à jour : 2025-11-12 01:17 (UTC+1)

## 🎯 Objectifs
- Déployer un MVP sur **Render** :
  - **Backend** Node/NestJS (Web Service)
  - **Frontend** React/Vite (Static Site via CDN)
  - **PostgreSQL managé** (Render Postgres)
- Génération **PDF** via **Puppeteer** (Chrome headless).
- Envoi **e‑signature** : **Yousign v3** (UE/eIDAS), **DocuSign** ou **Universign**.

## Phase 1 – Mise en ligne MVP (Semaine 1)
**Livrables**
- Infra via **Blueprint** `render.yaml` : `cee-backend`, `cee-frontend`, `cee-db`.
- Variables d’environnement définies (JWT, CORS, SMIC, provider e‑signature).
- Smoke test :
  - `POST /api/contrats-cee` → crée un brouillon
  - `POST /api/contrats-cee/:id/pdf` → PDF ok
  - `POST /api/contrats-cee/:id/esign` → envoi Yousign sandbox

**Actions**
- Lier GitHub → Render (**New → Blueprint**) et **Apply**.
- Renseigner les **env vars** du backend :
  - `JWT_SECRET`, `SMIC_JOURNALIER=90.00`, `PIVOT_REMUNERATION=2025-05-01`,
    `CORS_ORIGINS=https://<front>.onrender.com`,
    `ESIGN_PROVIDER=yousign`, `YOUSIGN_API_KEY=<clé sandbox>`
- Ajuster `VITE_API_BASE` côté front vers l’URL du backend `/api`.

> Réf. : Déployer un **Web Service** Node (build/start) et un **Static Site** (publish `dist`) ; Postgres managé ; premiers pas Render (création de service, auto‑deploy sur push).  
> Docs : Render Node/Express Quickstart, Static Sites, Postgres, Your First Deploy.  

## Phase 2 – Moteur de règles CEE & Clauses (Semaines 2–3)
**Livrables**
- Règles déterministes : **80 j / 12 mois**, repos (logé/non logé),
  rémunération mini **4,30× SMIC/j** (applicable au **01/05/2025**).
- Observations **non bloquantes** (Info/Attention/Critique) + journal d’audit.
- Clauses **Markdown → HTML → PDF** (gabarit Handlebars).

**Actions**
- Modéliser Prisma (contrats, signataires, observations, pièces, audit).
- Pipeline Markdown → HTML → PDF (Puppeteer).
- Tests unitaires du moteur de règles.

## Phase 3 – Front applicatif (Semaines 3–4)
**Livrables**
- Formulaire complet CEE (animateur/directeur/formateur).
- Multi‑employeurs (sélection) + tableau de bord contrats.
- Éditeur de clauses Markdown (prévisualisation PDF) + lexique.

**Actions**
- State management (React Query/Redux).
- Upload pièces (S3‑compatible) ; calculs auto (jours, repos, minima).

## Phase 4 – E‑signature PROD & webhooks (Semaines 4–5)
**Livrables**
- Passage production e‑signature :
  - **Yousign v3** (UE/eIDAS) ou **DocuSign**/**Universign**.
- Webhooks de statut → MAJ contrat (signé/échoué/expiré).
- Archivage **PDF signé** + empreinte **SHA‑256** (traçabilité).

**Actions**
- Configurer les webhooks (endpoint sécurisé).
- Journal WORM (immutabilité des événements critiques).

## Phase 5 – Qualité, Sécurité & Observabilité (Semaines 5–6)
**Livrables**
- Tests **unitaires/IT**, lint/format, CI GitHub Actions.
- Stratégies **backups/rétention** DB, durcissement CORS/secrets/scopes.
- RBAC / rôles & permissions.

**Actions**
- Pipeline : tests → build → déploiement Render “auto‑deploy on push”.
- Plan de purge/anonymisation (RGPD).

## Backlog (à prioriser)
- Calendrier/annexes repos, export “pack dossier” (PDF signé + rapport + JSON audit).
- Multi‑signataires (ordre, relances), modèles d’envoi.
- Internationalisation (FR/EN), accessibilité (a11y).

## Références (Render & outils)
- **Your First Deploy** : création d’un **Web Service** / **Static Site**, auto‑deploy sur push.
- **Node/Express sur Render** : build/start, PORT dynamique.
- **Static Sites** : build `dist`, CDN mondial, rewrites/redirects.
- **Render Postgres** : DB managée (backups, HA, extensions).
- **Puppeteer headless** sur Render : déploiement et cache binaire Chrome.
