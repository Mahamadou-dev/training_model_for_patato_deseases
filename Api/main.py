from io import BytesIO
import tensorflow as tf
import numpy as np
import uvicorn
from PIL import Image
from fastapi import FastAPI, UploadFile, File
# import requests # Ligne supprimée (plus besoin de requêtes HTTP externes)
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration CORS (InchAngée)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # L'adresse de production ACI sera ajoutée ici
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# NOUVEAU : Chargement du modèle Keras directement au démarrage de l'API
# Le chemin doit correspondre à l'emplacement dans le conteneur (/app/models/model_3.keras)
try:
    MODEL_PATH = "/app/models/model_3.keras"
    MODEL = tf.keras.models.load_model(MODEL_PATH)
    print("Modèle Keras chargé avec succès dans l'API FastAPI.")
except Exception as e:
    print(f"ERREUR : Impossible de charger le modèle Keras. {e}")
    MODEL = None  # Pour éviter que l'API plante complètement

# Ancienne URL TF_SERVING_URL retirée
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


@app.get("/")
async def root():
    return {"message": "Hello Rabi - API Monolithe d'Urgence (Azure ACI)"}  # Mis à jour pour vérification


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)).resize((256, 256)))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if MODEL is None:
        return {"error": "Le modèle n'a pas pu être chargé au démarrage du service."}

    image = read_file_as_image(await file.read())
    # Ajout de la dimension de batch (1, 256, 256, 3)
    img_batch = np.expand_dims(image, axis=0)

    # --- Ancien code de Requête à TensorFlow Serving RETIRÉ ---

    # NOUVEAU : Prédiction directe avec le modèle Keras chargé
    try:
        prediction_list = MODEL.predict(img_batch)[0]
        prediction = np.array(prediction_list)

        predicted_class_index = np.argmax(prediction)
        predicted_class_name = CLASS_NAMES[predicted_class_index]
        confidence = np.max(prediction)

        return {
            'class': predicted_class_name,
            'confidence': float(confidence)
        }
    except Exception as e:
        return {"error": "Erreur lors de la prédiction locale.", "details": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)