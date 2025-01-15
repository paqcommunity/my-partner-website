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

  // Load life updates from localStorage
  loadUpdatesFromLocalStorage();
});

// Function to load life updates from localStorage
function loadUpdatesFromLocalStorage() {
  const savedUpdates = JSON.parse(localStorage.getItem('lifeUpdates')) || [];
  const updatesList = document.getElementById('updates-list');

  savedUpdates.forEach(update => {
    const updateDiv = createUpdateDiv(update.text, update.photo);
    updatesList.appendChild(updateDiv);
  });
}

// Function to create a life update div (with delete button)
function createUpdateDiv(updateText, photo) {
  const updateDiv = document.createElement('div');
  updateDiv.classList.add('update');

  // Add text content
  const textNode = document.createElement('p');
  textNode.textContent = updateText;
  updateDiv.appendChild(textNode);

  // Add photo if available
  if (photo) {
    const img = document.createElement('img');
    img.src = photo;
    updateDiv.appendChild(img);
  }

  // Create delete button for the update
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-update');
  deleteBtn.textContent = 'Delete Update';
  deleteBtn.onclick = function() {
    updateDiv.remove();
    deleteUpdateFromLocalStorage(updateText); // Remove from localStorage
  };

  updateDiv.appendChild(deleteBtn);
  return updateDiv;
}

// Handle form submission for adding life updates
document.getElementById('update-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page refresh on form submission

  const updateText = document.getElementById('new-update').value;
  const photoFile = document.getElementById('new-photo').files[0];

  const updatesList = document.getElementById('updates-list');

  // Create a new update div
  const updateDiv = createUpdateDiv(updateText, photoFile ? URL.createObjectURL(photoFile) : null);

  // Add the update div to the list
  updatesList.appendChild(updateDiv);

  // Save the new update in localStorage
  saveUpdateToLocalStorage(updateText, photoFile ? URL.createObjectURL(photoFile) : null);

  // Clear the form
  document.getElementById('new-update').value = '';
  document.getElementById('new-photo').value = '';
});

// Save the update to localStorage
function saveUpdateToLocalStorage(text, photo) {
  const savedUpdates = JSON.parse(localStorage.getItem('lifeUpdates')) || [];
  savedUpdates.push({ text, photo });
  localStorage.setItem('lifeUpdates', JSON.stringify(savedUpdates));
}

// Remove update from localStorage
function deleteUpdateFromLocalStorage(updateText) {
  const savedUpdates = JSON.parse(localStorage.getItem('lifeUpdates')) || [];
  const updatedList = savedUpdates.filter(update => update.text !== updateText);
  localStorage.setItem('lifeUpdates', JSON.stringify(updatedList));
}

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
