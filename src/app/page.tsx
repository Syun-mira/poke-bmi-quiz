"use client"

import { useEffect } from "react";
import {getAllPokemon} from "./utils/pokemon.js";

export default function Home() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);

  return (
    <div>hello world</div>
  );
}
