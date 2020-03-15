$("#back-home").on("click", function() {
  $('.alert').hide();
  clearInputField();
  $("#intro").css("display", "flex");
  $("#pokedex").css("display", "none");
});

$("#previous").on("click", function() {
  event.preventDefault();
  fetch(getPreviousUrl())
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      clearInputField();
      setData(data);
    })
});

$("#next").on("click", function() {
  event.preventDefault();
  fetch(getNextUrl())
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      clearInputField();
      setData(data);
    })
});

function eliminateLeftArrow() {
  $(".previous").css("display", "none");
  $(".space-between").css("justify-content", "flex-end");
}

function eliminateRightArrow() {
  $(".next").css("display", "none");
  $(".space-between").css("justify-content", "flex-start");
}

$("#form-button").on("click", function() {
  event.preventDefault();

  if ($("#form-input").val() == null || $("#form-input").val() === "") {
    console.log("null");
    return;
  }

  const url = "https://pokeapi.co/api/v2/pokemon/" + $("#form-input").val().toLowerCase();

  fetch(url)
    .then(function(response) {
      if (response.ok) return response.json();
      else throw new Error('Something went wrong');
    })
    .then(function(data) {
      $('.alert').hide();
      $("#intro").css("display", "none");
      $("#pokedex").css("display", "flex");
      setData(data);
    })
    .catch(function(error) {
      $('.alert').show();
    });
});
