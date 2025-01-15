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
  const photoFile = document.getElementById('new-photo').files[0];

  const updatesList = document.getElementById('updates-list');

  // Create a new div for the update
  const updateDiv = document.createElement('div');
  updateDiv.classList.add('update');
  
  // Add text content
  updateDiv.textContent = updateText;

  // Handle file upload if available
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      updateDiv.appendChild(img);
    };
    reader.readAsDataURL(photoFile);
  }

  // Create delete button for the update
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-update');
  deleteBtn.textContent = 'Delete Update';
  deleteBtn.onclick = function() {
    updatesList.removeChild(updateDiv); // Remove the update when clicked
  };

  // Append the delete button and the update to the list
  updateDiv.appendChild(deleteBtn);
  updatesList.appendChild(updateDiv);

  // Clear the form after submission
  document.getElementById('new-update').value = '';
  document.getElementById('new-photo').value = '';
});
