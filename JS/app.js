console.log("Working!");

var pokeId = 1;
var prev = document.getElementById("prevButton");
var shuffle = document.getElementById("suffleButton");
var next = document.getElementById("nextButton");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Poke ID: ", pokeId);
  fetchData(pokeId);
});

prev.addEventListener("click", () => {
  // window.location.reload();
  if (pokeId === 1) {
    pokeId = 151;
    console.log("Poke ID: ", pokeId);
    fetchData(pokeId);
  } else {
    pokeId -= 1;
    console.log("Poke ID: ", pokeId);
    fetchData(pokeId);
  }
});

shuffle.addEventListener("click", () => {
  pokeId = getRandomInt(1, 151);

  console.log("Poke ID: ", pokeId);
  fetchData(pokeId);
});

next.addEventListener("click", () => {
  // window.location.reload();
  if (pokeId === 151) {
    pokeId = 0;
    console.log("Poke ID: ", pokeId);
    fetchData(pokeId);
  } else {
    pokeId += 1;
    console.log("Poke ID: ", pokeId);
    fetchData(pokeId);
  }
});

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

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

// Paint Pokemon Card With Data
const paintCard = (pokemon) => {
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
  document
    .querySelector(".pokemon__picture img")
    .setAttribute("src", pokemon.img);
  document.querySelector(".pokemon__head h1").innerHTML =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  document.querySelector(".pokemon__head h3").innerHTML = "#" + pokemon.id;
  document.querySelector(".pk-types__type").innerHTML =
    pokemon.types[0].type.name;
  document.querySelector(".hp").innerHTML = pokemon.hp;
  document.querySelector(".atk").innerHTML = pokemon.attack;
  document.querySelector(".def").innerHTML = pokemon.defense;
  document.querySelector(".spAtk").innerHTML = pokemon.spAtk;
  document.querySelector(".spDef").innerHTML = pokemon.spDef;
  document.querySelector(".speed").innerHTML = pokemon.speed;
  document.querySelector(".movOne").innerHTML = pokemon.moves[0].move.name;
  document.querySelector(".movTwo").innerHTML = pokemon.moves[1].move.name;
  document.querySelector(".movThree").innerHTML = pokemon.moves[2].move.name;
  document.querySelector(".movFour").innerHTML = pokemon.moves[3].move.name;

  // Changes background according to pokemon type
  document.querySelector(".pokedex").style.backgroundColor =
    typeColors[pokemon.types[0].type.name];
  console.log("Tipos: ", pokemon.types[0].type.name);

  // Tab animations
  let tabHeader = document.querySelectorAll(".tab-header")[0];
  let tabIndicator = document.querySelectorAll(".tab-indicator")[0];
  let tabBody = document.querySelectorAll(".tab-body")[0];
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
};
