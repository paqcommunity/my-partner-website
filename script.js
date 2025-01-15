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
