// Returns a clickable item link

let itemLink = function(item) {
	return `<button style="color: green" onClick="inspectItem('${item.name}')">${item.name}</button>`;
}

// Displays information about an item in HTML

function inspectItem(title) {
	let item = items['error'];

	for(let i = 0; i < Object.keys(inventory).length; i++)
		if(Object.values(inventory)[i].name === title) item = Object.values(inventory)[i];

	$('#inspect').empty()
		.append(addHeader('INFO'))
		.append(`${item.name}<br><br>`)
		.append(`${item.desc}`);
}

// A preconstructed list of all the obtainable items in the game

const items = {
	'berries': {
		'type': 'consumable',
		'name': 'Berries',
		'weight': 2,
		'desc': 'A fistful of edible berries that can be eaten to restore some health.',
		'effect': '+7 HP'
	},
	'blunt-dagger': {
		'type': 'weapon',
		'name': 'Blunt Dagger',
		'weight': 3,
		'desc': "A small but functional dagger that has been used many times in the past. Perhaps it would be of greater use if sharpened.",
		'damage': 6,
		'size': 'secondary'
	},
	'error': {
		'type': 'debug',
		'name': 'Missing Item',
		'weight': 0,
		'desc': "That item could not be accessed. Please report this issue to <a href='https://github.com/thebitspud/age-of-ruin/issues' target='_blank' rel='noopener'>the developer.</a>"
	},
	'healing-salve': {
		'type': 'consumable',
		'name': 'Rope',
		'weight': 1,
		'desc': 'A potent herbal blend that can disinfect and heal lesser wounds in no time.',
		'effect': '+15 HP'
	},
	'small-backpack': {
		'type': 'equipable',
		'name': 'Small Backpack',
		'weight': 8,
		'desc': 'A small pack that can be worn to increase your inventory weight cap.',
		'section': 'back'
	},
};

// A list of all the items the player currently possesses

let inventory = [];

// Displaying inventory contents in HTML

function displayInventory() {
	let $inventory = $('#inventory');

	$inventory.empty()
		.append(addHeader('INVENTORY'));

	let weight = 0;
	let backpack = false;

	for(let i = 0; i < Object.keys(inventory).length; i++) {
		$inventory.append(`${itemLink(Object.values(inventory)[i])}<br>`);
		if(Object.values(inventory)[i].name === 'Small Backpack') backpack = true;
		weight += Object.values(inventory)[i].weight;
	}

	if(backpack) stats.weight.max = 100;
	stats.weight.now = weight;
	displayStats();
}

// Adding items to the player's inventory

function acquireItem(item) {
	if(item.weight + stats.weight.now > stats.weight.max) return;

	inventory.push(item);
	$('#info').append(`Acquired ${itemLink(item)}<br><br>`);
	displayInventory();
}