console.log("Working!");

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 151);
  fetchData(random);
});

const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    const pokemon = {
      name: data.name,
      id: data.id,
      img: data.sprites.other.dream_world.front_default,
      types: data.types,
      //   hp: data.stats[0].base_stat,
      //   xp: data.base_experience,
      //   ataque: data.stats[1].base_stat,
      //   defensa: data.stats[2].base_stat,
      //   velocidad: data.stats[5].base_stat,
    };

    paintCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const paintCard = (pokemon) => {
  const flex = document.querySelector(".main-flex");
  const template = document.querySelector(".template-card").content;
  //cloneNode
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone.querySelector(".pokemon__picture img").setAttribute("src", pokemon.img);
  clone.querySelector(".pokemon__head h1").innerHTML = `${pokemon.name}`;
  clone.querySelector(".pokemon__head h3").innerHTML = "#" + pokemon.id;
  clone.querySelector(".pk-types__type").innerHTML = pokemon.types[0].type.name;
  fragment.appendChild(clone);

  flex.appendChild(fragment);
};
