var addHeader = function(title) {
	return `<p class="header">${title}</p><hr class="header">`;
}

function displayInventory() {
	$('#inventory').empty();
	$('#inventory').append(addHeader('INVENTORY'));
	var weight = 0;
	var backpack = false;

	for(i = 0; i < Object.keys(inventory).length; i++) {
		$('#inventory').append(`<br>${Object.values(inventory)[i].name}`);
		if(Object.values(inventory)[i].name === 'Small Backpack') backpack = true;
		weight += Object.values(inventory)[i].weight;
	}

	if(backpack) stats['weight'].max = 100;
	stats['weight'].now = weight;
	displayStats();
}

var inventory = [];

function aquireItem(item) {
	if(item.weight + stats['weight'].now > stats['weight'].max) return;
	
	inventory.push(item);
	$('#info').append(`Aquired <span style="color: green">${item.name}</span><br><br>`);
	displayInventory();
}

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
		'weight': 3
	}
}