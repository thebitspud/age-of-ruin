// A preconstructed list of all enemy combatants in the game

const enemies = {
	'feral-goblin': {
		'name': 'Feral Goblin',
		'health': 50,
		'atk_dmg': 3,
		'atk_rate': 1.0,
		'def': 1,
		'desc': 'A savage goblinoid armed with nothing but its filthy claws.',
		'drops': ['filthy-cloth']
	},

	'goblin-thief': {
		'name': 'Goblin Thief',
		'health': 50,
		'atk_dmg': 8,
		'atk_rate': 1.0,
		'def': 2,
		'desc': "A small, wiry goblin wielding a sharp, durable blade.",
		'drops': ['goblin-dagger']
	},

	'large-raven': {
		'name': 'Large Raven',
		'health': 30,
		'atk_dmg': 4,
		'atk_rate': 2.0,
		'def': 1,
		'desc': 'A mean looking bird with powerful talons.',
		'drops': ['raven-feather']
	},

	'nightstalker': {
		'name': 'Nightstalker',
		'health': 80,
		'atk_dmg': 15,
		'atk_rate': 2.0,
		'def': 3,
		'desc': 'A grotesque, batlike creature that lives and hunts in low-light environments.',
		'drops': ['heal-salve']
	},

	'error': {
		'health': 0,
		'atk_dmg': 0,
		'atk_rate': 0,
		'def': 0,
		'desc': 'That enemy could not be found. Please report this issue to <a href="https://github.com/thebitspud/age-of-ruin/issues" target="_blank" rel="noopener">the developer</a>.',
	}
}

// Returns a clickable enemy link

let enemyLink = function(enemy) {
	return `<button style="color: brown" onClick="inspectEnemy('${enemy}')">${enemies[enemy].name}</button>`;
}

// The current enemy being fought (only stores the title and current health of the enemy)
// To access the active enemy object, use enemies[activeEnemy.title]

let activeEnemy = {
	'title': '',
	'health': 0
}

// The event to be played after defeating or fleeing from the enemy

let nextEvent = "";

// Displays information about an enemy in HTML

function inspectEnemy(enemy) {
	let enemyObj = enemies[activeEnemy.title];

	$inspect = $('#inspect');

	$inspect.empty()
		.append(addHeader('INSPECT'))
		.append(`<p style="color: brown; text-align: center">${enemyObj.name}</p>`)
		.append(`<br>${enemyObj.desc}`)
		.append(`<br><br>Max Health: ${enemyObj.health}`)
		.append(`<br>Attack Damage: ${enemyObj.atk_dmg}`)
		.append(`<br>Attack Cooldown: ${enemyObj.atk_rate.toFixed(1)}s`)
		.append(`<br>Defense: ${enemyObj.def}`);
}

// Callable event-option function that initiates an enemy encounter

let encounterEnemy = function(event, enemy) {
	return addButton(`enemyPrompt('${event}', '${enemy}')`, 'Continue')
}

// Message + options displayed upon triggering an enemy encounter event

function enemyPrompt(event, enemy) {
	nextEvent = event;
	activeEnemy.title = enemy;
	activeEnemy.health = enemies[enemy].health;

	$('#info').append(`<span style="color: navy">Encountered</span> ${enemyLink(activeEnemy.title)}<br><br>`);

	setOptions(addButton(`beginCombat()`, 'Fight') + addButton(`playerFlee()`, 'Flee'));
}

// Inspecting and picking up enemy loot

function inspectEnemyDrops() {
	$('#info').empty();

	if(enemies[activeEnemy.title].drops.length === 0) {
		$('#info').append(`${enemyLink(activeEnemy.title)} did not drop anything. <br><br>`);
		setOptions(addEventToggle(nextEvent, 'Continue'));
	}

	for(let i in enemies[activeEnemy.title].drops) {
		let drop = enemies[activeEnemy.title].drops[i];
		$('#info').append(`${enemyLink(activeEnemy.title)} <span style="color: navy">dropped</span> ${itemLink(drop)}<br><br>`);
		setOptions(pickUpItemPrompt(nextEvent, drop));
	}
}