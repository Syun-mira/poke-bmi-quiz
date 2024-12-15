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
  const [pokemonDataFirst, setPokemonDataFirst] = useState<PokemonDetails>();
  const [pokemonDataSecond, setPokemonDataSecond] = useState<PokemonDetails>();

  useEffect(() => {
  }, []);

  const getRandomTwoPokemon = async () => {
    setLoading(true);
    try {
      const getPokemonDataFirst = await getRandomPokemon();
      setPokemonDataFirst(getPokemonDataFirst);

      const getPokemonDataSecond = await getRandomPokemon();
      setPokemonDataSecond(getPokemonDataSecond);

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
          <button onClick={getRandomTwoPokemon} style={{ padding: "10px 20px", fontSize: "16px" }}>
            ランダムなポケモンを取得
          </button>
          <h1>ランダムなポケモン</h1>
          <ul>
            <li key={pokemonDataFirst?.id} style={{ margin: "20px 0" }}>
              <img src={pokemonDataFirst?.image} alt={pokemonDataFirst?.name} />
              <p>名前: {pokemonDataFirst?.name}</p>
              <p>高さ: {pokemonDataFirst?.heightInMeters}</p>
              <p>重さ: {pokemonDataFirst?.weightInKg}</p>
              <p>BMI: {pokemonDataFirst?.bmi}</p>
            </li>
          </ul>
          <ul>
            <li key={pokemonDataSecond?.id} style={{ margin: "20px 0" }}>
              <img src={pokemonDataSecond?.image} alt={pokemonDataSecond?.name} />
              <p>名前: {pokemonDataSecond?.name}</p>
              <p>高さ: {pokemonDataSecond?.heightInMeters}</p>
              <p>重さ: {pokemonDataSecond?.weightInKg}</p>
              <p>BMI: {pokemonDataSecond?.bmi}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
