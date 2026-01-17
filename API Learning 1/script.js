// fetch("https://pokeapi.co/api/v2/pokemon/spomgebob")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Could not fetch resource");
//         } 
//         return response.json();
//     })
//     .then(data => console.log(data.id))
//     .catch(error => console.error(error));

async function fetchData() {
    try{
        const pokemonName = document.getElementById("pokemon-name").value.toLowerCase();
        const pokeImage = document.getElementById("pokemon-sprite");
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Resource could not be found");
        }
        const data = await response.json();
        const image = data.sprites.front_default;
        pokeImage.src = image;
        pokeImage.style.display = "block";
    } catch(error) {
        console.error(error);
    }
}