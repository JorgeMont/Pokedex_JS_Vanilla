console.log("Working!");

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 151);
  // const random = 155;
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
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      spAtk: data.stats[3].base_stat,
      spDef: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      moves: data.moves,
    };

    paintCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const paintCard = (pokemon) => {
  const flex = document.querySelector(".main-flex");
  const template = document.querySelector(".template-card").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  const typeColors = {
    normal: "var(--normal)",
    fighting: "var(--fighting)",
    flying: "var(--flying)",
    poison: "var(--poison)",
    ground: "var(--ground)",
    rock: "var(--rock)",
    bug: "var(--bug)",
    ghost: "var(--ghost)",
    steel: "var(--steel)",
    fire: "var(--fire)",
    water: "var(--water)",
    grass: "var(--grass)",
    electric: "var(--electric)",
    psychic: "var(--psychic)",
    ice: "var(--ice)",
    dragon: "var(--dragon)",
    dark: "var(--dark)",
    fairy: "var(--fairy)",
  };

  console.log("Pokemon name: ", pokemon.name);
  clone.querySelector(".pokemon__picture img").setAttribute("src", pokemon.img);
  clone.querySelector(".pokemon__head h1").innerHTML =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  clone.querySelector(".pokemon__head h3").innerHTML = "#" + pokemon.id;
  clone.querySelector(".pk-types__type").innerHTML = pokemon.types[0].type.name;
  clone.querySelector(".hp").innerHTML = pokemon.hp;
  clone.querySelector(".atk").innerHTML = pokemon.attack;
  clone.querySelector(".def").innerHTML = pokemon.defense;
  clone.querySelector(".spAtk").innerHTML = pokemon.spAtk;
  clone.querySelector(".spDef").innerHTML = pokemon.spDef;
  clone.querySelector(".speed").innerHTML = pokemon.speed;
  clone.querySelector(".movOne").innerHTML = pokemon.moves[0].move.name;
  clone.querySelector(".movTwo").innerHTML = pokemon.moves[1].move.name;
  clone.querySelector(".movThree").innerHTML = pokemon.moves[2].move.name;
  clone.querySelector(".movFour").innerHTML = pokemon.moves[3].move.name;

  // Changes background according to pokemon type
  clone.querySelector(".pokedex").style.backgroundColor =
    typeColors[pokemon.types[0].type.name];
  console.log("Tipos: ", pokemon.types[0].type.name);

  // Tab animations
  let tabHeader = clone.querySelectorAll(".tab-header")[0];
  let tabIndicator = clone.querySelectorAll(".tab-indicator")[0];
  let tabBody = clone.querySelectorAll(".tab-body")[0];
  let tabsPane = tabHeader.querySelectorAll("div");

  // console.log("tabs", tabsPane);
  for (let i = 0; i < tabsPane.length; i++) {
    tabsPane[i].addEventListener("click", function () {
      tabHeader.getElementsByClassName("active")[0].classList.remove("active");
      tabsPane[i].classList.add("active");
      tabBody.getElementsByClassName("active")[0].classList.remove("active");
      tabBody.getElementsByTagName("div")[i].classList.add("active");

      tabIndicator.style.left = `calc(calc(100% / 2) * ${i})`;
    });
  }

  fragment.appendChild(clone);

  flex.appendChild(fragment);
};
