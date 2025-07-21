import joblib
import os
from scipy.sparse import hstack

carpeta_actual = os.path.dirname(os.path.abspath(__file__))

# Cargar modelos y vectores
model = joblib.load(os.path.join(carpeta_actual, "modelo.pkl"))
vect_preg = joblib.load(os.path.join(carpeta_actual, "vector_preguntas.pkl"))
vect_obs = joblib.load(os.path.join(carpeta_actual, "vector_observaciones.pkl"))

def parsear_respuestas(texto):
    dicc = {}
    if texto:
        for item in texto.split(", "):
            if ": " in item:
                k, v = item.split(": ", 1)
                dicc[k.strip()] = v.strip()
    return dicc

def predecir_reparacion(respuestas: str, observaciones: str):
    dict_preg = parsear_respuestas(respuestas)
    X_preg = vect_preg.transform([dict_preg])
    X_obs = vect_obs.transform([observaciones or ""])
    X = hstack([X_preg, X_obs])
    pred = model.predict(X)
    pred_proba = model.predict_proba(X)

    # Obtener etiquetas y probabilidades
    clases = model.classes_
    proba_dict = dict(zip(clases, pred_proba[0]))

    # Ordenar las reparaciones más probables (top 2 por ejemplo)
    top_reparaciones = sorted(proba_dict.items(), key=lambda x: x[1], reverse=True)[:2]

    mensaje = f"Según lo analizado, probablemente el diagnóstico sea: {pred[0]}."
    
    return {
        "mensaje": mensaje,
        "reparaciones_probables": [{"reparacion": rep, "probabilidad": round(prob, 2)} for rep, prob in top_reparaciones]
    }


respuestas = "¿Enciende?: false, ¿Da imagen?: true"
observaciones = "Se cayó y no da imagen, vibra pero no muestra imagen"

resultado = predecir_reparacion(respuestas, observaciones)

print("🧪 Resultado del modelo:")
print(resultado)