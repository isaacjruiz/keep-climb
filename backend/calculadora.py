niveles = [
    {"nivel": "Nivel de Entrada", "sueldo_anual": 144000, "costo_rotacion_pct": 0.3, "proporcion": 0.9002},
    {"nivel": "Gerentes y Administrativos", "sueldo_anual": 412219, "costo_rotacion_pct": 0.4, "proporcion": 0.0683},
    {"nivel": "Gerentes Senior / Directores", "sueldo_anual": 569838, "costo_rotacion_pct": 0.75, "proporcion": 0.0248},
    {"nivel": "Vice Presidentes", "sueldo_anual": 2250000, "costo_rotacion_pct": 0.75, "proporcion": 0.0059},
    {"nivel": "CEO y Comité Directivo", "sueldo_anual": 2856000, "costo_rotacion_pct": 1.0, "proporcion": 0.0007}
]

def calcular_ahorro(numero_empleados, rotacion_actual, rotacion_deseada):
    total_por_punto_porcentual = 0
    total_nomina_anual = 0

    for nivel in niveles:
        sueldo = nivel["sueldo_anual"]
        costo_pct = nivel["costo_rotacion_pct"]
        proporcion = nivel["proporcion"]

        costo = sueldo * costo_pct
        costo_rot_actual = costo * proporcion * rotacion_actual
        costo_rot_deseada = costo * proporcion * rotacion_deseada

        total_por_punto_porcentual += (costo_rot_actual - costo_rot_deseada)
        total_nomina_anual += sueldo * proporcion

    ahorro_anual = numero_empleados * total_por_punto_porcentual
    nomina_total = numero_empleados * total_nomina_anual
    ahorro_pct = ahorro_anual / nomina_total if nomina_total else 0

    return {
        "ahorro_anual": round(ahorro_anual),
        "ahorro_porcentaje": round(ahorro_pct * 100, 2),
        "nomina_total": round(nomina_total)
    }