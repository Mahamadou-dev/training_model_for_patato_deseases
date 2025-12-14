# 1. Utiliser Python 3.12-slim comme image de base
FROM python:3.12-slim

# 2. Définir le répertoire de travail
WORKDIR /app

# 3. Copier les dépendances de l'API et les installer
COPY Api/requirements.txt .
# S'assurer que TensorFlow s'installe correctement
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copier l'ensemble du code de l'API et le dossier des modèles
# Le modèle est nécessaire pour le mode Monolithe
COPY Api /app/Api
COPY models /app/models

# 5. Définir les variables d'environnement
ENV PYTHONPATH=/app/Api

# 6. Exposer le port par défaut de l'API
EXPOSE 8000

# 7. Commande de démarrage
CMD ["uvicorn", "Api.main:app", "--host", "0.0.0.0", "--port", "8000"]