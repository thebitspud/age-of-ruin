// A preconstructed list of all the obtainable items in the game

const items = {
	'berries': {
		'type': 'consumable',
		'name': 'Berries',
		'weight': 2,
		'desc': 'A fistful of edible berries that can be eaten to restore some health.',
		'effect': '+10 HP',
		'use': function(){ healPlayer(10) }
	},

	'blunt-dagger': {
		'type': 'weapon',
		'name': 'Blunt Dagger',
		'weight': 3,
		'desc': "A worn but functional dagger with a dull blade. It would be more useful if sharpened.",
		'atk_dmg': 6,
		'atk_rate': 1.0,
		'size': 'secondary'
	},

	'error': {
		'type': 'debug',
		'name': 'Missing Item',
		'weight': 0,
		'desc': "That item could not be accessed. Please report this issue to <a href='https://github.com/thebitspud/age-of-ruin/issues' target='_blank' rel='noopener'>the developer</a>."
	},

	'filthy-cloth': {
		'type': 'artifact',
		'name': 'Filthy Cloth',
		'weight': 1,
		'desc': 'A tattered fabric looted from a feral goblin.'
	},
	
	'goblin-dagger': {
		'type': 'weapon',
		'name': 'Goblin Dagger',
		'weight': 3,
		'desc': "A small dagger with a serrated edge. It was once the prized possession of a goblin thief.",
		'atk_dmg': 10,
		'atk_rate': 1.0,
		'size': 'secondary'
	},

	'heal-salve': {
		'type': 'consumable',
		'name': 'Healing Salve',
		'weight': 2,
		'desc': 'A potent herbal blend that can disinfect and heal lesser wounds.',
		'effect': '+20 HP',
		'use': function(){ healPlayer(20) }
	},

	'raven-feather': {
		'type': 'artifact',
		'name': 'Raven Feather',
		'weight': 1,
		'desc': 'A fancy feather dropped by a raven.'
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
		'desc': 'A golden artifact covered with strange inscriptions. When held, it radiates a pleasant energy.',
		'effect': '+1 HP/s in combat'
	},
};

// A list of all the items the player currently possesses

let inventory = [];

// Returns a clickable item link

let itemLink = function(item) {
	return `<button style="color: green" onClick="inspectItem('${item}')">${items[item].name}</button>`;
}

// Displaying inventory contents in HTML

function displayInventory() {
	let $inventory = $('#inventory');

	$inventory.empty();
	$inventory.append(addHeader('INVENTORY'));

	let weight = 0;
	let backpack = false;

	for(let i in inventory) {
		$inventory.append(`${itemLink(inventory[i])}<br>`);
		if(inventory[i] === 'small-pack') backpack = true;
		weight += items[inventory[i]].weight;
	}

	if(backpack) player.weight.max = 100;
	player.weight.now = weight;
	displayPlayer();
}

// Adding items to the player's inventory

function acquireItem(item) {
	itemObj = items[item];
	if(itemObj.weight + player.weight.now > player.weight.max) return;
	if(player.primary === 'None' && itemObj.type === 'weapon') player.primary = item;
	else if (player.secondary === 'None' && itemObj.type === 'weapon') player.secondary = item;
	else inventory.push(item);

	$('#info').append(`Acquired ${itemLink(item)}<br><br>`);
	displayInventory();
}

// Using consumables - fix this awful code later

function useItem(item) {
	let itemObj = items['error'];

	for(let i = 0; i < Object.keys(items).length; i++) {
		if(Object.keys(items)[i] === item) {
			itemObj = Object.values(items)[i];
			break;
		}
	}

	for(let i in inventory) {
		if(inventory[i] === item) {
			itemObj.use();
			$('#inspect').empty();

			inventory.splice(i, 1)
			displayInventory();
			
			return;
		}
	}
}

// Displays information about an item in HTML

function inspectItem(item) {
	let itemObj = items['error'];

	for(let i = 0; i < Object.keys(items).length; i++) {
		if(Object.keys(items)[i] === item) {
			itemObj = Object.values(items)[i];
			break;
		}
	}

	$inspect = $('#inspect');

	$inspect.empty()
		.append(addHeader('INSPECT'))
		.append(`<p style="color: green; text-align: center">${itemObj.name}</p>`)
		.append(`<br>${itemObj.desc}`)
		.append(`<br><br>Weight: ${itemObj.weight}`);

	switch(itemObj.type) {
		case 'weapon':
			$inspect.append(`<br>Attack Damage: ${itemObj.atk_dmg}`);
			$inspect.append(`<br>Attack Cooldown: ${itemObj.atk_rate.toFixed(1)}s`);
			break;
		case 'accessory':
			$inspect.append(`<br>Effect: ${itemObj.effect}`)
			break;
		case 'consumable':
			$inspect.append(`<br>Effect: ${itemObj.effect}`)

			for(let i in inventory) {
				if(inventory[i] === item) {
					$inspect.append(`<br><br>${addButton(`useItem('${item}')`, 'Use Item')}`)
					break;
				}
			}

			break;
		case 'equipable':
			$inspect.append(`<br>Section: ${itemObj.section}`)
			break;
	}
}