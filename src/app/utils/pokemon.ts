export const getRandomPokemon = async () => {
    const index = Math.floor(Math.random() * 151) + 1;
    const url = "https://pokeapi.co/api/v2/pokemon/" + index;

    try {
        const response = await fetch(url);
        const pokemonData = await response.json();

        // 必要なデータを計算して返す
        return calculateBodyFatPercentage(
            pokemonData.id,
            pokemonData.name,
            pokemonData.sprites.front_default, // 画像URL
            pokemonData.height,
            pokemonData.weight
        );
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        throw error;
    }
};

export const calculateBodyFatPercentage = (
    id: number,
    name: string,
    image: string,
    height: number,
    weight: number
) => {
    // 身長 (m) と 体重 (kg) に変換
    const heightInMeters = height / 10; // dm -> m
    const weightInKg = weight / 10; // hg -> kg

    // BMI を計算
    const bmi = weightInKg / (heightInMeters ** 2);

    // 必要な数値を返す
    return {
        id,
        name,
        image,
        heightInMeters: parseFloat(heightInMeters.toFixed(2)),
        weightInKg: parseFloat(weightInKg.toFixed(2)),
        bmi: parseFloat(bmi.toFixed(2)),
    };
};
