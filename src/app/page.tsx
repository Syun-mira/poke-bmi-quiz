"use client";
import { useEffect, useState } from "react";
import { getRandomPokemon } from "./utils/pokemon";


export default function Home() {
  type PokemonDetails = {
    id: number;
    name: string;
    image: string;
    heightInMeters: number; // 小数点以下2桁にフォーマットされた身長
    weightInKg: number; // 小数点以下2桁にフォーマットされた体重
    bmi: number; // 小数点以下2桁にフォーマットされたBMI
  };

  const [loading, setLoading] = useState(false);
  const [pokemonDataFirst, setPokemonDataFirst] = useState<PokemonDetails>();
  const [pokemonDataSecond, setPokemonDataSecond] = useState<PokemonDetails>();
  const [userIsCorrect, setUserIsCorrect] = useState<boolean | null>(null); // null 初期化
  const [checkAnswer, setCheckAnswer] = useState<boolean>(false);

  useEffect(() => {
    getRandomTwoPokemon();
  }, []);

  const getRandomTwoPokemon = async () => {
    setLoading(true);
    setCheckAnswer(false);
    setUserIsCorrect(null); // 状態をリセット
    try {
      const firstPokemon = await getRandomPokemon();
      let secondPokemon;

      // 2体目のポケモンを取得し、1体目と異なるまでループ
      do {
        secondPokemon = await getRandomPokemon();
      } while (secondPokemon.id === firstPokemon.id);

      setPokemonDataFirst(firstPokemon);
      setPokemonDataSecond(secondPokemon);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  };

  const handleChoice = (choice: "first" | "second") => {
    if (!pokemonDataFirst || !pokemonDataSecond) return;

    const isFirstCorrect = pokemonDataFirst.bmi > pokemonDataSecond.bmi;
    const isCorrect = (choice === "first" && isFirstCorrect) || (choice === "second" && !isFirstCorrect);

    setCheckAnswer(true);
    setUserIsCorrect(isCorrect);
  };

  return (
    <div>
      {loading ? (
        <h1>ロード中...</h1>
      ) : (
        <div className="flex flex-col items-center mt-8">
          <button
            onClick={getRandomTwoPokemon}
            className="px-4 py-2 text-lg bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            次の問題へ
          </button>

          <h1 className="text-2xl font-bold mt-4 text-gray-400">BMIが高いのはどっち？</h1>

          {/* クイズ結果を表示 */}
          {userIsCorrect !== null && (
            <h2
              className={`text-xl font-semibold mt-4 ${userIsCorrect ? "text-green-600" : "text-red-600"
                }`}
            >
              {userIsCorrect ? "正解！" : "不正解..."}
            </h2>
          )}

          <div className="flex justify-center gap-8 mt-6">
            {/* ポケモン1 */}
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
              <img src={pokemonDataFirst?.image} alt={pokemonDataFirst?.name} className="w-32 h-32" />
              <p className="text-xl font-semibold mt-2 text-gray-800">{pokemonDataFirst?.name}</p>
              {checkAnswer && (
                <>
                  <p className="text-lg font-medium text-gray-700">高さ: {pokemonDataFirst?.heightInMeters} m</p>
                  <p className="text-lg font-medium text-gray-700">重さ: {pokemonDataFirst?.weightInKg} kg</p>
                  <p className="text-lg font-medium text-gray-700">BMI: {pokemonDataFirst?.bmi}</p>
                </>
              )}
              {!checkAnswer && (
                <>
                  <button
                    onClick={() => handleChoice("first")}
                    className="mt-4 px-4 py-2 bg-green-500 text-black rounded-lg shadow-md hover:bg-green-600"
                  >
                    このポケモン
                  </button>
                </>
              )}
            </div>

            {/* ポケモン2 */}
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
              <img src={pokemonDataSecond?.image} alt={pokemonDataSecond?.name} className="w-32 h-32" />
              <p className="text-xl font-semibold mt-2 text-gray-800">{pokemonDataSecond?.name}</p>
              {checkAnswer && (
                <>
                  <p className="text-lg font-medium text-gray-700">高さ: {pokemonDataSecond?.heightInMeters} m</p>
                  <p className="text-lg font-medium text-gray-700">重さ: {pokemonDataSecond?.weightInKg} kg</p>
                  <p className="text-lg font-medium text-gray-700">BMI: {pokemonDataSecond?.bmi}</p>
                </>
              )}
              {!checkAnswer && (
                <>
                  <button
                    onClick={() => handleChoice("second")}
                    className="mt-4 px-4 py-2 bg-green-500 text-black rounded-lg shadow-md hover:bg-green-600"
                  >
                    このポケモン
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
