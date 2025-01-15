// Scroll to specific sections
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Load movie list dynamically
document.addEventListener('DOMContentLoaded', () => {
  fetch('movies.json')
    .then(response => response.json())
    .then(movies => {
      const movieList = document.getElementById('movie-list');
      movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `🎬 ${movie}`;
        movieList.appendChild(li);
      });
    });
});

// Function to load photos for a specific month
function loadPhotos(month) {
  const gallery = document.getElementById('monthly-photos-gallery');
  gallery.innerHTML = ''; // Clear existing photos

  // Simulate fetching images for the selected month
  const images = [
    `images/${month}/photo1.jpg`,
    `images/${month}/photo2.jpg`,
    `images/${month}/photo3.jpg`
  ];

  // Dynamically load the images for the selected month
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });
}

// Function to handle the life update form submission
document.getElementById('update-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page refresh on form submission

  const updateText = document.getElementById('new-update').value;
  const updatesList = document.getElementById('updates-list');

  // Create a new div for the update
  const updateDiv = document.createElement('div');
  updateDiv.classList.add('update');
  updateDiv.textContent = updateText;

  // Append the new update to the list
  updatesList.appendChild(updateDiv);

  // Clear the textarea after submission
  document.getElementById('new-update').value = '';
});
