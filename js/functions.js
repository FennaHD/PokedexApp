var currentId = -1;
var intervalId = -1;
var images = [], x = -1;
    images[0] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png";
    images[1] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/37.png";

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    $("#sprites").attr("src", images[x]);
}

function startTimer() {
    intervalId = setInterval(displayNextImage, 2000);
}

function getImageUrl(id) {
  return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + id.toString().padStart(3, "0") + ".png";
}

function formatId(id) {
  return id.toString().padStart(3, "0");
}

function formatWeight(weight) {
  return (weight * 0.220462).toFixed(1).toString();
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function decToInches(decimeters) {
  return (decimeters / 10) * 39.3701;
}

function formatHeight(decimeters) {
  let inches = decToInches(decimeters);
  return (inches / 12).toFixed().toString() + "' " + (inches % 12).toFixed().toString().padStart(2, "0") + '"';
}

function formatTypes(types) {
  let typesArray = []
  types.forEach(element => {
    typesArray.push(capitalize(element.type.name));
  });
  return typesArray.join(", ");
}

function getPreviousUrl() {
  let base_url = "https://pokeapi.co/api/v2/pokemon/";
  if (currentId === 1) return base_url + "807";
  else return base_url + (currentId - 1).toString();
}

function getNextUrl() {
  let base_url = "https://pokeapi.co/api/v2/pokemon/";
  if (currentId === 807) return base_url + "1";
  else return base_url + (currentId + 1).toString();
}

function fetchPreviousData() {
  fetch(getPreviousUrl())
    .then(function(response) {
      return response.json();
    }).then(function(prevData) {
      $("#previous-id").html("#" + formatId(prevData.id) + "&nbsp");
      $("#previous-name").html(capitalize(prevData.name));
      return;
    });
}

function fetchNextData() {
  fetch(getNextUrl())
    .then(function(response) {
      return response.json();
    }).then(function(nextData) {
      $("#next-id").html("&nbsp" + "#" + formatId(nextData.id));
      $("#next-name").html(capitalize(nextData.name));
      return;
    });
}

function clearInputField() {
  $("#form-input").val("");
}

function handleSprites(sprites) {
  clearInterval(intervalId);
  if (sprites.back_default === null) {
    $("#sprites").attr("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + currentId.toString() + ".png");
  } else {
    images[0] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + currentId.toString() + ".png";
    images[1] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + currentId.toString() + ".png";
    startTimer();
  }
}

function setData(data) {
  $("#sprites").attr("src", "images/loading.png");
  currentId = data.id;
  fetchPreviousData();
  fetchNextData();
  $("#pokemon-title-name").html(capitalize(data.name) + " ");
  $("#pokemon-title-id").html("#" + formatId(data.id));
  $("#pokemon-image").attr("src", getImageUrl(data.id));
  $("#height").html(formatHeight(data.height));
  $("#weight").html(formatWeight(data.weight) + " lbs");
  $("#types").html(formatTypes(data.types));
  handleSprites(data.sprites);
}
