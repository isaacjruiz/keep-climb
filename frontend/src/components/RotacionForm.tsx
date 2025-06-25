import { useState } from 'react';
import './RotacionForm.css';

export default function RotacionForm() {
  const [empleados, setEmpleados] = useState(100);
  const [actual, setActual] = useState(15);
  const [deseada, setDeseada] = useState(10);
  const [resultado, setResultado] = useState<null | {
    ahorro_anual: number;
    ahorro_porcentaje: number;
    nomina_total: number;
  }>(null);

  const calcular = async () => {
    const res = await fetch('https://keep-climb-production.up.railway.app/api/calcular', {
      method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    empleados: Number(empleados),
    rotacion_actual: Number(actual),
    rotacion_deseada: Number(deseada),
  }),
});
    const data = await res.json();
    setResultado(data);
  };

  return (
    <section className="main-container">
      <div className="form-box">
        <h1 className="form-title">Calculadora de ahorro por rotación</h1>

        <form onSubmit={(e) => { e.preventDefault(); calcular(); }}>
          <div className="form-group">
            <label>Número de empleados de su empresa</label>
            <input
              type="number"
              value={empleados}
              onChange={(e) => setEmpleados(Number(e.target.value))}
              placeholder="Ejemplo: 100"
            />
          </div>

          <div className="form-group">
            <label>Porcentaje de rotación actual</label>
            <input
              type="number"
              value={actual}
              onChange={(e) => setActual(Number(e.target.value))}
              placeholder="Ejemplo: 15"
            />
          </div>

          <div className="form-group">
            <label>Porcentaje de rotación deseado</label>
            <input
              type="number"
              value={deseada}
              onChange={(e) => setDeseada(Number(e.target.value))}
              placeholder="Ejemplo: 10"
            />
          </div>

          <button type="submit" className="btn-calculate">Calcular ahorro</button>
        </form>

        {resultado && (
          <div className="resultado">
            <h3>Resultado</h3>
            <p>Ahorro anual esperado: <span className="resaltado">${resultado.ahorro_anual.toLocaleString()}</span></p>
            <p>Ahorro porcentual sobre nómina: <strong>{resultado.ahorro_porcentaje}%</strong></p>
            <p>Nómina total anual estimada: <strong>${resultado.nomina_total.toLocaleString()}</strong></p>
          </div>
        )}
      </div>
    </section>
  );
}