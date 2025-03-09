const images = [
  "images/img1.jpg",  "images/img2.jpg",
  "images/img3.jpg",  "images/img4.jpg",
  "images/img5.jpg",  "images/img6.jpg",
  "images/img7.jpg",  "images/img8.jpg",
  "images/img9.jpg",  "images/img10.jpg",
  "images/img11.jpg", "images/img12.jpg",
  "images/img13.jpg", "images/img14.jpg",
  "images/img15.jpg", "images/img16.jpg",
];

let selectedSequence = [];
let storedPassword = null;

// Fisher-Yates Shuffle Algorithm
function shuffleImages(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function generateGrid() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.innerHTML = ""; // Clear the grid before re-generating

  let shuffledImages = [...images]; // Clone the original images array
  shuffleImages(shuffledImages); // Shuffle the cloned array

  shuffledImages.forEach((imgSrc, index) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.dataset.value = images.indexOf(imgSrc) + 1; // Store original index for verification
    img.onclick = () => selectImage(img);
    gridContainer.appendChild(img);
  });
}

function selectImage(img) {
  if (!selectedSequence.includes(img.dataset.value)) {
    selectedSequence.push(img.dataset.value);
    img.classList.add("selected");
  }
}

function setPassword() {
  if (selectedSequence.length < 4) {
    alert("Select at least 4 images.");
    return;
  }
  storedPassword = [...selectedSequence];
  console.log("Password Set:", storedPassword);
  alert("Password set successfully!");
  clearSelection();
}

function verifyPassword() {
  if (!storedPassword) {
    alert("Set a password first.");
    return;
  }

  if (JSON.stringify(selectedSequence) === JSON.stringify(storedPassword)) {
    alert("Access Granted!");
  } else {
    alert("Access Denied!");
  }
  console.log("Entered Password:", selectedSequence);
  clearSelection();
}

function clearSelection() {
  selectedSequence = [];
  document
    .querySelectorAll(".grid img")
    .forEach((img) => img.classList.remove("selected"));
}

// Shuffle images when the "Shuffle Images" button is clicked
document.addEventListener("DOMContentLoaded", () => {
  generateGrid(); // Generate grid initially
  document.getElementById("shuffle-btn").addEventListener("click", generateGrid); // Add event listener to shuffle button
});
