
# Roadmap – CEE (OVH Web PaaS + PDF + e‑signature)

Dernière mise à jour : 2025-11-16 00:45

## 🎯 Objectifs
- Déployer un MVP en production sur **OVHcloud Web PaaS (Platform.sh)** avec **PostgreSQL** et **Chrome headless**.
- Générer des **PDF** (Puppeteer) et envoyer en **signature électronique** (**Yousign v3** recommandé, **DocuSign**/**Universign** en alternative).
- Évoluer par itérations sans bloquer la rédaction (agents = conseils non bloquants).

---

## Phase 1 – Mise en ligne MVP (Semaine 1)
**Livrables**
- Backend NestJS opérationnel (endpoints MVP) :
  - `POST /api/contrats-cee` (brouillon)
  - `POST /api/contrats-cee/:id/pdf` (PDF Puppeteer)
  - `POST /api/contrats-cee/:id/esign` (Yousign par défaut)
- Frontend React affichant un squelette (à étoffer en phase 3).
- Déploiement **OVH Web PaaS** : `.platform/*` (routes `/` et `/api`), **PostgreSQL**, **chrome‑headless**.
- CI GitHub Actions (build back/front).

**Actions**
- Renseigner `.env` (JWT, CORS, SMIC, e‑signature sandbox).
- Pousser le repo → build & provision auto.
- Test smoke : création contrat → PDF → envoi e‑signature (sandbox).

---

## Phase 2 – Moteur de règles CEE & clauses (Semaines 2–3)
**Livrables**
- Règles **déterministes** (80 jours/12 mois, repos/logement, rémunération min. **4,30× SMIC/j** à compter du **01/05/2025**).
- **Observations non bloquantes** (Info/Attention/Critique) + journal d’audit.
- **Clauses Markdown** + gabarit HTML (Handlebars) pour PDF.

**Actions**
- Modéliser schéma Prisma (contrats, signataires, observations, pièces, audit).
- Brancher conversions Markdown → HTML → PDF.
- Couvrir cas logé/non logé (repos compensateur) et mentions obligatoires.

---

## Phase 3 – Front‑end applicatif (Semaines 3–4)
**Livrables**
- Formulaire complet CEE (rôles animateur/directeur/formateur).
- Sélecteur d’employeur (multi‑tenant) + tableau de bord contrats.
- Éditeur de **clauses Markdown** (prévisualisation PDF).
- **Lexique** consultable.

**Actions**
- State management (React Query/Redux au choix).
- Upload pièces (S3‑compatible) + calculs auto (jours, repos, rémunération min.).

---

## Phase 4 – E‑signature PROD & webhooks (Semaines 4–5)
**Livrables**
- Passage **production** e‑signature :
  - **Yousign v3** (UE/eIDAS, RGPD) – clés prod, webhooks statuts.
  - Option **DocuSign** (OAuth Quickstart) ou **Universign** (Transactions).
- Archivage **PDF signé** + empreinte **SHA‑256**.

**Actions**
- Mettre en place **webhooks** (callback statuts) → MAJ contrat + relances.
- Journal WORM (immutabilité des événements critiques).

---

## Phase 5 – Qualité, Sécurité & Observabilité (Semaines 5–6)
**Livrables**
- Tests **unitaires/intégration** (back/front) + lint/format.
- Alerting/logs, politiques **backups** & **rétention**.
- Durcissement CORS, secrets, scopes API e‑signature, rôles/permissions.

**Actions**
- Pipeline CI : tests + build + déploiement auto (gated by status).
- Plan de sauvegarde et politique de purge/anonymisation (RGPD).

---

## Backlog (à prioriser)
- Programme indicatif (calendrier drag&drop) + annexe repos.
- Export pack dossier (PDF signé + rapport conformité + JSON d’audit).
- Multi‑signataires (ordre, relances, escalades) + modèles d’envoi.
- Traductions (FR → EN), accessibilité (a11y).

---

## Gouvernance & cadence
- **Rituels** : point hebdo 30 min, revue de sprint, backlog grooming.
- **Livraisons** : fin de phase = lot testable en sandbox + check RGPD.

---

## Références (cadrage technique)
- **OVH Web PaaS (Platform.sh)** : Node.js, CI/CD, RGPD/Gaia‑X, services managés.
- **Puppeteer** : téléchargement Chromium, config via fichier/env, PDF headless.
- **Yousign v3** : API UE/eIDAS + sandbox + Postman officiel.
- **DocuSign** : `createEnvelope`, Quickstart OAuth.
- **Universign** : Transactions (documents, champs, signers).
