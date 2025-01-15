// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJTaZc-nPE7o5OKq_l0CY3A4sRdj2EsuU",
  authDomain: "life-update-5ddea.firebaseapp.com",
  projectId: "life-update-5ddea",
  storageBucket: "life-update-5ddea.firebasestorage.app",
  messagingSenderId: "924844463709",
  appId: "1:924844463709:web:e2dab2159069d891d7dfb4",
  measurementId: "G-9VQM9S65KE"
};

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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

  // Load life updates from Firebase (Firestore)
  loadLifeUpdatesFromFirebase();
});

// Function to load life updates from Firebase
function loadLifeUpdatesFromFirebase() {
  const updatesList = document.getElementById('updates-list');

  // Fetch updates from Firestore
  db.collection("lifeUpdates").orderBy("timestamp", "desc").get().then((querySnapshot) => {
    updatesList.innerHTML = '';  // Clear existing updates

    querySnapshot.forEach((doc) => {
      const update = doc.data();
      
      // Create a new div for each update from Firestore
      const updateDiv = createUpdateDiv(update.text, update.photo, doc.id);
      updatesList.appendChild(updateDiv);
    });
  });
}

// Function to load life updates from localStorage as fallback
function loadUpdatesFromLocalStorage() {
  const savedUpdates = JSON.parse(localStorage.getItem('lifeUpdates')) || [];
  const updatesList = document.getElementById('updates-list');

  savedUpdates.forEach(update => {
    const updateDiv = createUpdateDiv(update.text, update.photo);
    updatesList.appendChild(updateDiv);
  });
}

// Function to create a life update div (with delete button)
function createUpdateDiv(updateText, photo, docId = null) {
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
    if (docId) {
      deleteUpdateFromFirebase(docId); // Delete from Firestore
    } else {
      deleteUpdateFromLocalStorage(updateText); // Remove from localStorage
    }
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

  // Handle file upload if available
  let photoURL = null;
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      photoURL = e.target.result;
      saveUpdateToFirebase(updateText, photoURL); // Save the update to Firebase
    };
    reader.readAsDataURL(photoFile);
  } else {
    saveUpdateToFirebase(updateText); // Save the update without photo
  }

  // Clear the form
  document.getElementById('new-update').value = '';
  document.getElementById('new-photo').value = '';
});

// Save the update to Firebase
function saveUpdateToFirebase(text, photoURL = null) {
  db.collection("lifeUpdates").add({
    text: text,
    photo: photoURL,
    timestamp: firebase.firestore.FieldValue.serverTimestamp() // Timestamp for ordering updates
  }).then(() => {
    loadLifeUpdatesFromFirebase(); // Reload updates from Firebase
  });
}

// Delete an update from Firebase
function deleteUpdateFromFirebase(docId) {
  db.collection("lifeUpdates").doc(docId).delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

// Save the update to localStorage as a fallback
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
