// A preconstructed list of all the obtainable items in the game

const items = {
	'berries': {
		'type': 'consumable',
		'name': 'Berries',
		'weight': 2,
		'desc': 'A fistful of edible berries that can be eaten to restore some health.',
		'effect': '+7 HP over 15s'
	},

	'blunt-dagger': {
		'type': 'weapon',
		'name': 'Blunt Dagger',
		'weight': 3,
		'desc': "A small but functional dagger that has been used many times in the past.",
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
		'name': 'Healing Salve',
		'weight': 2,
		'desc': 'A potent herbal blend that can disinfect and heal lesser wounds in no time.',
		'effect': '+15 HP over 10s'
	},

	'none': {
		'type': 'debug',
		'name': 'None',
		'weight': 0,
		'desc': "You were not supposed to be able to access this item. Please report this issue to <a href='https://github.com/thebitspud/age-of-ruin/issues' target='_blank' rel='noopener'>the developer.</a>"
	},

	'small-pack': {
		'type': 'equipable',
		'name': 'Small Backpack',
		'weight': 8,
		'desc': 'A small pack that can be worn to increase your inventory weight cap.',
		'section': 'Back'
	},

	'tali-life': {
		'type': 'accessory',
		'name': 'Talisman of Life',
		'weight': 3,
		'desc': "This golden artifact is covered with strange inscriptions. When held, it radiates a pleasant energy.",
		'effect': "+1 HP every 3s"
	},
};

// A list of all the items the player currently possesses

let inventory = [];

// Returns a clickable item link

let itemLink = function(item) {
	return `<button style="color: green" onClick="inspectItem('${item.name}')">${item.name}</button>`;
}

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

	if(backpack) player.weight.max = 100;
	player.weight.now = weight;
	displayPlayer();
}

// Adding items to the player's inventory

function acquireItem(item) {
	if(item.weight + player.weight.now > player.weight.max) return;

	if(player.primary === 'None' && item.type === 'weapon') player.primary = itemLink(item);

	inventory.push(item);
	$('#info').append(`Acquired ${itemLink(item)}<br><br>`);
	displayInventory();
}

// Displays information about an item in HTML

function inspectItem(title) {
	let item = items['error'];

	for(let i = 0; i < Object.keys(items).length; i++)
		if(Object.values(items)[i].name === title) item = Object.values(items)[i];

	$inspect = $('#inspect');

	$inspect.empty()
		.append(addHeader('INFO'))
		.append(`<p style="color: green; text-align: center">${item.name}</p>`)
		.append(`<br>${item.desc}`)
		.append(`<br><br>Weight: ${item.weight}`);

	switch(item.type) {
		case 'weapon':
			$inspect.append(`<br>Damage: ${item.damage}`);
			break;
		case 'consumable':
		case 'accessory':
			$inspect.append(`<br>Effect: ${item.effect}`)
			break;
		case 'equipable':
			$inspect.append(`<br>Section: ${item.section}`)
			break;
	}
}