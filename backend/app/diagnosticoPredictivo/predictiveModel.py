import pandas as pd
import mysql.connector
from sklearn.feature_extraction import DictVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import os
from sklearn.ensemble import RandomForestClassifier
from scipy.sparse import hstack
import joblib
carpeta_actual = os.path.dirname(os.path.abspath(__file__))

# Configuración base de datos - ajustá según tu entorno
DB_CONFIG = {
    'host': 'gestionreparaciones',
    'user': 'root',
    'password': 'root',
    'database': 'gestionreparaciones'
}

# 1. Conectar y traer datos de la vista
conn = mysql.connector.connect(**DB_CONFIG)
query = """
SELECT 
    idDiagnostico,
    preguntas_con_respuestas,
    observaciones,
    diagnosticoFinal  -- Cambiado aquí
FROM vista_diagnosticos_modelo
"""
df = pd.read_sql(query, conn)
conn.close()

# 2. Parsear campo preguntas_con_respuestas a diccionario
def parsear_respuestas(texto):
    dicc = {}
    if texto:
        for item in texto.split(", "):
            if ": " in item:
                k, v = item.split(": ", 1)
                dicc[k.strip()] = v.strip()
    return dicc

df["respuestas_dict"] = df["preguntas_con_respuestas"].apply(parsear_respuestas)

# 3. Vectorizar preguntas y observaciones
vect_preg = DictVectorizer(sparse=True)
vect_obs = TfidfVectorizer(max_features=50)

X_preg = vect_preg.fit_transform(df["respuestas_dict"])
X_obs = vect_obs.fit_transform(df["observaciones"].fillna(""))

X = hstack([X_preg, X_obs])

# Limpieza
df = df.dropna(subset=["preguntas_con_respuestas", "diagnosticoFinal"])
df["observaciones"] = df["observaciones"].fillna("")

# Parsear
df["respuestas_dict"] = df["preguntas_con_respuestas"].apply(parsear_respuestas)

# Vectorizar
X_preg = vect_preg.fit_transform(df["respuestas_dict"])
X_obs = vect_obs.fit_transform(df["observaciones"])

X = hstack([X_preg, X_obs])
y = df["diagnosticoFinal"]


# 4. Entrenar modelo
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Entrenar
model.fit(X, y)


# 5. Guardar modelo y vectorizadores
joblib.dump(model, os.path.join(carpeta_actual, "modelo.pkl"))
joblib.dump(vect_preg, os.path.join(carpeta_actual, "vector_preguntas.pkl"))
joblib.dump(vect_obs, os.path.join(carpeta_actual, "vector_observaciones.pkl"))

print("✅ Modelo entrenado y guardado correctamente.")
#python -m app.diagnosticoPredictivo.predictiveModel