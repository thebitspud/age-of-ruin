function displayStats() {
	$('#stats').empty();
	$('#stats').append(addHeader('STATS'));
	$('#stats').append(`Health : ${stats['health'].now} / ${stats['health'].max}`);
	$('#stats').append(`<br>Energy : ${stats['energy'].now} / ${stats['energy'].max}`);
	$('#stats').append(`<br>Weight : ${stats['weight'].now} / ${stats['weight'].max}`);
}

const stats = {
	health: {
		max: 100,
		min: 0,
		now: 100
	},
	energy: {
		max: 100,
		min: 0,
		now: 100
	},
	weight: {
		max: 25,
		min: 0,
		now: 0
	}
}