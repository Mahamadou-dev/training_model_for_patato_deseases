# 📈 Documentation Évolutive - Agri-Scan Niger

Ce document sert à suivre l'évolution technique, les améliorations prévues et la feuille de route du projet **Agri-Scan Niger**.

## 📅 État Actuel (Décembre 2024)

### ✅ Réalisations
- **Modèle IA** : Modèle Keras (`model_3.keras`) opérationnel pour la Pomme de Terre (Early Blight, Late Blight, Healthy).
- **Backend** : API FastAPI stable avec support CORS et prédiction directe.
- **Mobile** : Application React Native avec flux complet (Sélection -> Capture -> Diagnostic).
- **Frontend** : Interface web de base pour les prédictions.
- **DevOps** : Conteneurisation Docker terminée et configuration Azure ACI prête.

## 🚀 Feuille de Route & Améliorations Futures

### 1. Extension du Modèle IA (Court Terme)
- [ ] **Nouveaux Crop Types** : Entraîner et intégrer les modèles pour la **Tomate**, le **Maïs** et le **Piment** (déjà présents dans l'UI mobile).
- [ ] **Optimisation de la Précision** : Fine-tuning des modèles sur des jeux de données locaux au Niger.
- [ ] **Réduction du Poids** : Conversion des modèles vers le format TensorFlow Lite (.tflite) pour une exécution on-device sur mobile.

### 2. Application Mobile (Moyen Terme)
- [ ] **Mode Hors-Ligne** : Intégration de l'inférence locale (TFLite) pour fonctionner sans connexion internet.
- [ ] **Historique Local** : Sauvegarde des diagnostics passés sur le téléphone de l'utilisateur.
- [ ] **Support Multi-langue** : Ajout des langues nationales (Hausa, Zarma, etc.) pour une meilleure accessibilité.

### 3. Backend & Dashboard (Moyen Terme)
- [ ] **Gestion des Comptes** : Système d'authentification pour les techniciens agricoles.
- [ ] **Collecte de Données** : Système de feedback pour permettre aux utilisateurs de confirmer ou infirmer un diagnostic (Data Loop).
- [ ] **Cartographie** : Visualisation géographique des zones touchées par les maladies détectées.

### 4. Infrastructure & Pipeline (Long Terme)
- [ ] **CI/CD** : Déploiement automatique vers Azure/AWS via GitHub Actions.
- [ ] **Monitoring** : Mise en place de Prometheus/Grafana pour surveiller la charge de l'API et la latence des prédictions.

## 🛠️ Journal des Modifications (Log)

- **24/12/2024** : Restructuration complète de la documentation, finalisation du README professionnel et création de la documentation évolutive.
- **20/12/2024** : Migration de l'API vers un modèle monolithe pour déploiement d'urgence sur Azure ACI.

---
*Document maintenu par l'équipe GremahTech.*
