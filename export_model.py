import tensorflow as tf
import os

# Chemin où votre modèle Keras actuel est sauvegardé
KERAS_MODEL_PATH = "models/model_3.keras"

# Chemin de base où le SavedModel sera exporté (à la racine de 'training')
SERVING_MODEL_DIR = "tf_serving_model/potato_disease_model"

# Numéro de version (important pour TF Serving)
VERSION = 1

# --- 1. Charger le Modèle Keras ---
try:
    model = tf.keras.models.load_model(KERAS_MODEL_PATH)
    print(f"Modèle Keras chargé depuis : {KERAS_MODEL_PATH}")
except Exception as e:
    print(f"Erreur lors du chargement du modèle Keras: {e}")
    exit()

# --- 2. Définir le Chemin d'Exportation Final ---
export_path = os.path.join(SERVING_MODEL_DIR, str(VERSION))

# Créer le dossier s’il n’existe pas
os.makedirs(export_path, exist_ok=True)

# --- 3. Exporter au Format SavedModel ---
print(f"Exportation du SavedModel vers : {export_path}")

# ⚠️ NOUVELLE méthode Keras 3 — évite l’erreur TypeError: _DictWrapper
model.export(export_path)

print("Exportation SavedModel terminée.")
