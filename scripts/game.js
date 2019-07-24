
/* Game */

// Returns an HTML header with the specified title

let addHeader = function(title) {
	return `<p class="header">${title}</p><hr class="header">`;
};

// Returns an HTML button with the specified parameters

let addButton = function (args, text) {
	return `<button class="option" onclick="${args}">${text}</button>`;
};

// Begins the game once the script is loaded

$(function() { // shorthand for $(document).ready
	displayStats();
	displayInventory();
	$('#history').append(addHeader('HISTORY'));
	$('#inspect').append(addHeader('INFO'));

	playEvent(events['intro-0']);
});



/* Inventory */

const items = {
	'berries': {
		'type': ['food'],
		'name': 'Unknown Berries',
		'weight': 2
	},
	'rope': {
		'type': ['crafting'],
		'name': 'Rope',
		'weight': 1
	},
	'small-backpack': {
		'type': ['clothing'],
		'name': 'Small Backpack',
		'weight': 8
	},
	'blunt-dagger': {
		'type': ['weapon'],
		'name': 'Blunt Dagger',
		'weight': 3,
		'damage': 6
	}
};

let inventory = [];

function displayInventory() {
	let $inventory = $('#inventory');

	$inventory.empty()
		.append(addHeader('INVENTORY'));

	let weight = 0;
	let backpack = false;

	for(let i = 0; i < Object.keys(inventory).length; i++) {
		$inventory.append(`<br>${Object.values(inventory)[i].name}`);
		if(Object.values(inventory)[i].name === 'Small Backpack') backpack = true;
		weight += Object.values(inventory)[i].weight;
	}

	if(backpack) stats['weight'].max = 100;
	stats['weight'].now = weight;
	displayStats();
}

function acquireItem(item) {
	if(item.weight + stats['weight'].now > stats['weight'].max) return;

	inventory.push(item);
	$('#info').append(`Acquired <span style="color: green">${item.name}</span><br><br>`);
	displayInventory();
}

/* Stats */

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
	},

	str: {
		max: 25,
		min: 0,
		now: 10
	},
	int: {
		max: 25,
		min: 0,
		now: 10
	},
	agi: {
		max: 25,
		min: 0,
		now: 10
	},
	cha: {
		max: 25,
		min: 0,
		now: 10
	}
};

function displayStats() {
	$('#stats').empty()
		.append(addHeader('STATS'))
		.append(`Health : ${stats['health'].now} / ${stats['health'].max}`)
		.append(`<br>Energy : ${stats['energy'].now} / ${stats['energy'].max}`)
		.append(`<br>Weight : ${stats['weight'].now} / ${stats['weight'].max}`);
}



/* Events */

// Returns an HTML button that executes a specified event

let addEventToggle = function (event, text) {
	return addButton(`playEvent(events['${event}'])`, text);
};

const events = {
	'intro-0': {
		'info': 'You wake up and open your eyes.',
		'options': addEventToggle('intro-1', 'Continue')
	},

	'intro-1': {
		'info': `The ground you lie on is cold and uneven, but you can't help but admire the countless stars dotting the night sky above you.`,
		'options': addEventToggle('intro-2', 'Continue')
	},

	'intro-2': {
		'info': 'You sit up and look around, surveying the unfamiliar landscape.',
		'options': addEventToggle('intro-3', 'Continue')
	},

	'intro-3': {
		'info': 'You can barely see the light of dawn off in the distance. Although it is still dark out, you can tell that you are in an unkempt grassy field. You do not know where you are or how you got here.',
		'options': addEventToggle('intro-4', 'Inspect Area')
	},

	'intro-4': {
		'info': 'You spot a small dagger lying on the ground.',
		'options': addButton(`pickUpItemPrompt('intro-5', 'blunt-dagger')`, 'Pick Up')
	},

	'intro-5': {
		'info': 'There appears to be nothing else of value in the region. Moving out of this area would be a good idea.<br><br>Behind you is a towering forest, but in the opposite direction you spot what appears to be a well used road.',
		'options': addEventToggle('forest-0', 'To the Forest') + addEventToggle('road-0', 'To the Road')
	},

	'forest-0': {
		'info': 'You approach the monumental forest, peering into the dark expanse beneath the canopy.',
		'options': addEventToggle('road-0', 'To the Road')
	},

	'road-0': {
		'info': '',
		'options': addEventToggle('road-0', 'To the Road')
	}
};

function playEvent(event) {
	$('#info').append(event.info + '<br><br>');
	$('#options').html(event.options);
}

function pickUpItemPrompt(event, item) {
	$('#options').html(addEventToggle(`${event}`, 'Continue'));
	acquireItem(items[`${item}`]);
}