const ndjson = require('ndjson');
const fs = require('fs');

const countries = [];
let totalDrawings = 0;

fs.createReadStream('playground/full_simplified_washing machine.ndjson')
	.pipe(ndjson.parse())
	.on('data', obj => {

		const country = countries.find(country => country.code == obj.countrycode);

		if (country) {
			country.quantity++;
		} else {
			countries.push({
				code: obj.countrycode,
				quantity: 1
			});
		}

		totalDrawings++;

	})
	.on('end', () => {
		countries.sort((a, b) => (b.quantity > a.quantity) ? 1 : -1);
		for (const country of countries) {
			country.percentage = (country.quantity*100) / totalDrawings;
		}

		fs.writeFile('playground/washing-machine-countries.json', JSON.stringify(countries), err => {  
			if (err) throw err;
			console.log('done');
		});
	});