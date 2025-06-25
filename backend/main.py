import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from calculadora import calcular_ahorro

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    empleados: int
    rotacion_actual: float
    rotacion_deseada: float

@app.post("/api/calcular")
def calcular(data: InputData):
    return calcular_ahorro(
        data.empleados,
        data.rotacion_actual / 100,
        data.rotacion_deseada / 100
    )

# Solo para ejecución directa (opcional en Railway)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))