"use strict";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".rows .seat:not(.occupied)");
const movieSelector = document.getElementById("movies");
const count = document.querySelector(".count");
const total = document.querySelector(".total");

let ticketPrice = +movieSelector.value;

populateUI();

const saveMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem("selectedMovie", movieIndex);
  localStorage.setItem("selectedPrice", moviePrice);
};

// Calculate the seat count and total price
const calculateCountAndSeat = function () {
  const selectedSeats = container.querySelectorAll(".selected");
  const numOfSeats = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.textContent = numOfSeats;
  total.textContent = numOfSeats * ticketPrice;
};

function populateUI() {
  const seletedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (seletedSeats !== null && seletedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (seletedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovie = localStorage.getItem("selectedMovie");
  if (selectedMovie !== null) {
    movieSelector.selectedIndex = selectedMovie;
  }
}

//Change the movie and uptade total price
movieSelector.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  saveMovieData(e.target.selectedIndex, e.target.value);

  calculateCountAndSeat();
});

// Select the seats and change the color
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    calculateCountAndSeat();
  }
});

calculateCountAndSeat();
