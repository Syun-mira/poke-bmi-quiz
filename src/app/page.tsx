"use client";

import { useEffect, useState } from "react";
import { getRandomPokemon } from "./utils/pokemon.js";

export default function Home() {

  type PokemonDetails = {
    id: number;
    name: string;
    image: string; // sprites.front_default に相当
    heightInMeters: number; // 小数点以下2桁にフォーマットされた身長
    weightInKg: number; // 小数点以下2桁にフォーマットされた体重
    bmi: number; // 小数点以下2桁にフォーマットされたBMI
  };

  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<PokemonDetails>();

  useEffect(() => {
  }, []);

  const getRandomThreePokemon = async () => {
    setLoading(true);
    try {
      const getPokemonData = await getRandomPokemon();
      setPokemonData(getPokemonData);
      console.log(pokemonData);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <h1>ロード中...</h1>
      ) : (
        <div>
          <button onClick={getRandomThreePokemon} style={{ padding: "10px 20px", fontSize: "16px" }}>
            ランダムなポケモンを取得
          </button>
          <h1>ランダムなポケモン</h1>
          <ul>
            <li key={pokemonData?.id} style={{ margin: "20px 0" }}>
              <img src={pokemonData?.image} alt={pokemonData?.name} />
              <p>名前: {pokemonData?.name}</p>
              <p>高さ: {pokemonData?.heightInMeters}</p>
              <p>重さ: {pokemonData?.weightInKg}</p>
              <p>BMI: {pokemonData?.bmi}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
