document.addEventListener('DOMContentLoaded', function() {
	const searchForm = document.querySelector('form');
	const searchInput = document.getElementById('search-input');
	const resultDiv = document.getElementById('result');

	searchForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const superheroName = searchInput.value.trim();
		if (superheroName !== '') {
			searchSuperhero(superheroName);
		}
	});

	function searchSuperhero(superheroName) {
		const apiKey = '1905504396484739';
		const apiUrl = `https://www.superheroapi.com/api.php/${apiKey}/search/${superheroName}`;

		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				displayResult(data);
			})
			.catch(error => {
				console.error('Error:', error);
				resultDiv.innerHTML = 'An error occurred. Please try again.';
			});
	}

	function displayResult(data) {
		resultDiv.innerHTML = '';

		if (data.response === 'error') {
			resultDiv.innerHTML = 'Superhero not found. Please try again.';
			return;
		}

		const superheroes = data.results;
		superheroes.forEach(superhero => {
			const superheroDiv = document.createElement('div');
			superheroDiv.classList.add('superhero');

			const name = document.createElement('h2');
			name.textContent = superhero.name;

			const image = document.createElement('img');
			image.src = superhero.image.url;
			image.alt = superhero.name;

			const powerstats = document.createElement('p');
			powerstats.textContent = `Intelligence: ${superhero.powerstats.intelligence}, Strength: ${superhero.powerstats.strength}, Speed: ${superhero.powerstats.speed}`;

			superheroDiv.appendChild(name);
			superheroDiv.appendChild(image);
			superheroDiv.appendChild(powerstats);
			resultDiv.appendChild(superheroDiv);
		});
	}
});
