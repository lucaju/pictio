import Artyom from 'artyom.js';

export default function Speech() {

	function init(artyom) {

		console.log('oi');

		// artyom.addCommands([
		// 	{
		// 		indexes: ['Good morning'],
		// 		action: function (i) {
		// 			console.log('Good morning Triggered');
		// 		}
		// 	},
		// 	{
		// 		indexes: ['Good night'],
		// 		action: function (i) {
		// 			console.log('Good night Triggered');
		// 		}
		// 	},
		// 	{
		// 		indexes: ['Let\'s Play'],
		// 		action: function (i) {
		// 			showColorChoice();
		// 		}
		// 	}
		// ]);

		// Or the artisan mode to write less

		artyom.on(['Good morning']).then(function (i) {
			console.log('Triggered');
		});



	}

}