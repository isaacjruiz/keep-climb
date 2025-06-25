import { useState } from 'react';

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
    const res = await fetch('http://localhost:8000/api/calcular', {
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
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* Removed h2 title from here as it's in index.astro */}
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Calculadora de ahorro por rotación</h2> */}

      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          calcular();
        }}
      >
        {/* Campo 1: Número de empleados */}
        <div>
          <label htmlFor="empleados" className="block text-sm font-semibold text-gray-300 mb-1">
            Número de empleados de su empresa
          </label>
          <input
            id="empleados"
            type="number"
            value={empleados}
            onChange={(e) => setEmpleados(Number(e.target.value))}
            className="w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-keepclimb-logo"
            placeholder="Ej: 100"
          />
        </div>

        {/* Campo 2: Porcentaje de rotación actual */}
        <div>
          <label htmlFor="actual" className="block text-sm font-semibold text-gray-300 mb-1">
            Porcentaje de rotación actual
          </label>
          <input
            id="actual"
            type="number"
            value={actual}
            onChange={(e) => setActual(Number(e.target.value))}
            className="w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-keepclimb-logo"
            placeholder="Ej: 15"
          />
        </div>

        {/* Campo 3: Porcentaje de rotación deseado */}
        <div>
          <label htmlFor="deseada" className="block text-sm font-semibold text-gray-300 mb-1">
            Porcentaje de rotación deseado
          </label>
          <input
            id="deseada"
            type="number"
            value={deseada}
            onChange={(e) => setDeseada(Number(e.target.value))}
            className="w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-keepclimb-logo"
            placeholder="Ej: 10"
          />
        </div>

        {/* Button is not part of the grid, will be handled separately or re-integrated if design implies */}
      </form>
      
      <hr className="border-gray-500 my-8 md:my-10" />


      {/* Resultado */}
      {resultado ? (
        <div className="text-center">
          <div className="inline-block bg-transparent border-4 border-white rounded-full p-8 sm:p-10 md:p-12 mb-6">
            <span className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">${resultado.ahorro_anual.toLocaleString()}</span>
          </div>
          <p className="text-base sm:text-lg text-gray-300">
            Ahorro anual esperado por la reducción de {actual - deseada}% con {empleados} empleados
          </p>
          {/* Optional: Display more details if needed, styled for dark theme */}
          {/*
          <p className="mt-4 text-gray-400">
            Ahorro porcentual sobre nómina: <span className="font-semibold">{resultado.ahorro_porcentaje}%</span>
          </p>
          <p className="text-gray-400">
            Nómina anual total: <span className="font-semibold">${resultado.nomina_total.toLocaleString()}</span>
          </p>
          */}
        </div>
      ) : (
        <div className="text-center">
          <div className="inline-block bg-transparent border-4 border-white rounded-full p-8 sm:p-10 md:p-12 mb-6">
            <span className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">$X</span>
          </div>
          <p className="text-base sm:text-lg text-gray-300">
            Ahorro anual esperado por la reducción de x% con x empleados
          </p>
        </div>
      )}

      {/* Submit button - Placed after the form or results for clarity, or could be part of the form grid */}
      <button
        type="button" // Changed from submit as form submission is handled by onSubmit on form tag
        onClick={calcular} // Trigger calculation
        className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-8 bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition block"
      >
        Calcular ahorro
      </button>
    </div>
  );
}