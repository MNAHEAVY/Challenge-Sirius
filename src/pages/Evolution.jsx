import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Evolution = () => {
  const { id } = useParams();
  const [evolutionData, setEvolutionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Realiza una llamada a la API de PokeAPI para obtener datos de evolución basados en el "id"
    fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvolutionData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos de evolución:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Detalles de la Evolución</h1>
      {/* Muestra la información de la evolución, puedes personalizar cómo muestras estos datos */}
      <div>
        {/* Por ejemplo, puedes acceder a la información de las Evolutiones aquí */}
        <pre>{JSON.stringify(evolutionData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Evolution;
