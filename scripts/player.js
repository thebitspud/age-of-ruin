// The player's current stats

const stats = {
	'health': {
		'max': 100,
		'min': 0,
		'now': 100
	},
	'energy': {
		'max': 100,
		'min': 0,
		'now': 100
	},
	'weight': {
		'max': 25,
		'min': 0,
		'now': 0
	},

	'str': {
		'max': 20,
		'min': 0,
		'now': 10
	},
	'int': {
		'max': 20,
		'min': 0,
		'now': 10
	},
	'agi': {
		'max': 20,
		'min': 0,
		'now': 10
	},
	'cha': {
		'max': 20,
		'min': 0,
		'now': 10
	},

	'primary': 'None',
	'secondary': 'None'
};

// Displaying current stats in HTML

function displayStats() {
	$('#stats').empty()
		.append(addHeader('STATS'))
		.append(`Health : ${stats.health.now} / ${stats.health.max}`)
		.append(`<br>Energy : ${stats.energy.now} / ${stats.energy.max}`)
		.append(`<br>Weight : ${stats.weight.now} / ${stats.weight.max}`)
		.append(`<br><br>Primary : ${stats.primary}`)
		.append(`<br>Secondary : ${stats.secondary}`);
}