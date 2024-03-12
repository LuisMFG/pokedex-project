document.addEventListener('DOMContentLoaded', function () {
  const pokemonName = document.querySelector('.pokemon_name');
  const pokemonNumber = document.querySelector('.pokemon_number');
  const pokemonImage = document.querySelector('.pokemon_image');

  const form = document.querySelector('.form');
  const input = document.querySelector('.input_pesquisar');
  const buttonVoltar = document.querySelector('.btn-voltar');
  const buttonProximo = document.querySelector('.btn-proximo');

  let procurarPokemon = 1;

  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status == 200) {
      const data = await APIResponse.json();
      return data;
    }

  }

  const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando...";
    pokemonNumber.innerHTML = "?";
    const data = await fetchPokemon(pokemon);

    if (data) {
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      input.value = '';
      procurarPokemon = data.id;
    } else {
      pokemonName.innerHTML = "Error :(";
      pokemonNumber.innerHTML = '?';
      pokemonImage.style.display = 'none';
    }

  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

  })

  buttonVoltar.addEventListener('click', () => {
    if (procurarPokemon > 1) {
      procurarPokemon -= 1;
      renderPokemon(procurarPokemon);
    }
  })

  buttonProximo.addEventListener('click', () => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
  })

  renderPokemon(procurarPokemon);

});
