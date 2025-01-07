
# 🚀 Ladorée - Blockchain Concept Store

Bienvenue sur le dépôt GitHub de **Ladorée**, un concept store innovant basé sur la blockchain. Ce projet vise à révolutionner le commerce d'œuvres d’art et de créations locales grâce à des technologies modernes comme les NFT, les tokens fongibles, et l’indexation des données via **The Graph**.

---

## 📝 Présentation du Projet

Ladorée permet :
- Aux **créateurs locaux** de vendre leurs œuvres avec une certification d’authenticité via des NFT.
- Aux **acheteurs** de profiter d’avantages uniques grâce à un système de tokens.

### Fonctionnalités principales :
1. **NFT pour la certification** : Chaque œuvre vendue est associée à un NFT garantissant son authenticité.
2. **Token fongible $LDR** : Les utilisateurs reçoivent des $LDR chaque mois, qu'ils peuvent dépenser pour obtenir des réductions.
3. **Gestion avec The Graph** : Indexation des événements on-chain pour un accès rapide et efficace aux données.
4. **Système de royalties** : Redistribution automatique des royalties aux créateurs lors des reventes.

---

## 🌟 Objectifs du Projet

- **Faciliter les échanges** entre créateurs et acheteurs.
- **Automatiser la transparence** et la traçabilité des transactions grâce à la blockchain.
- Offrir une **expérience utilisateur fluide** en combinant paiements en euros avec des avantages blockchain.

---

## 📂 Structure du Projet

### Contrats intelligents
- **AuthenticityNFT** : Certifie chaque création avec un NFT.
- **LDRToken** : Gère le token fongible $LDR pour les réductions et récompenses.
- **Marketplace** : Plateforme pour acheter, vendre et revendre des œuvres.
- **TokenDistribution** : Assure la répartition des tokens et des royalties.
- **UserManager** : Gère les informations des utilisateurs.

### Technologies utilisées
- **Solidity** (v0.8.27)
- **Hardhat**
- **The Graph**
- **Stripe**

---

## 🚧 État du Projet

Le projet est encore en cours de développement. Prochaines fonctionnalités à intégrer :
- Page d’accueil avec statistiques (meilleurs artistes, acheteurs, royalties générées).
- Système de recherche et de filtres pour les œuvres.
- Redistribution automatique des paiements aux vendeurs et des royalties aux créateurs.

---

## 💻 Installation et Déploiement

### Prérequis
- Node.js (v16 ou supérieur)
- Hardhat
- Compte Stripe
- API pour The Graph

### Étapes
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/<votre-username>/ladoree-web3.git
   cd ladorée
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Configurer les variables d’environnement dans un fichier `.env`.
4. Déployer les contrats sur un testnet.
5. Mettre à jour The Graph avec les nouvelles adresses.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce projet :
1. Forkez ce dépôt.
2. Créez une branche pour vos modifications (`git checkout -b feature/nom-feature`).
3. Soumettez une pull request.

---

## 📜 Licence

Ce projet est sous licence MIT. Vous êtes libre de l’utiliser, de le modifier et de le distribuer.

---

**Merci de votre intérêt pour Ladorée !**  
*Ensemble, redéfinissons le commerce local avec la blockchain.* 💎
