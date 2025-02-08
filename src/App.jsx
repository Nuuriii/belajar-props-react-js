import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPokeApi = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10000"
      );
      setPokemonData(response.results);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokeApi();
  }, []);

  return (
    <div className="bg-sky-500 p-8 rounded-lg shadow-lg">
      {error ? (
        <h1 className="text-red-500 text-center">ada error nihh</h1>
      ) : loading ? (
        <div className="bg-yellow-500 flex justify-center items-center p-8 rounded-lg">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-lg font-bold text-center">Pokemon Data</h1>
          <div className="flex flex-wrap justify-center gap-5 p-4">
            {pokemonData.map((nama, index) => (
              <div
                key={index}
                className="border-2 flex flex-col items-center bg-blue-200 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h1 className="text-lg font-bold">{index + 1}</h1>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`}
                  className="w-20 h-20"
                />
                <h1 className="text-lg font-bold">{nama.name}</h1>
                <button
                  class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Link : {nama.url}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
