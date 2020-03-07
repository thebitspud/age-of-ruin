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

/* ENEMY UTILS */

let enemyLink = function(enemy) {
	return `<button style="color: brown" onClick="inspectEnemy('${enemy}')">${enemies[enemy].name}</button>`;
}

let activeEnemy = {
	'title': '',
	'health': 0
}

let nextEvent = "";

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

/* ENEMY EVENTS */

let encounterEnemy = function(event, enemy) {
	return addButton(`enemyPrompt('${event}', '${enemy}')`, 'Continue')
}

function enemyPrompt(event, enemy) {
	nextEvent = event;
	activeEnemy.title = enemy;
	activeEnemy.health = enemies[enemy].health;

	$('#info').append(`Encountered ${enemyLink(activeEnemy.title)}<br><br>`);

	setOptions(addButton(`beginCombat()`, 'Fight') + addButton(`playerFlee()`, 'Flee'));
}

function inspectEnemyDrops() {
	$('#info').empty();
	$('#options').empty();

	// $('#info').append(`${enemyLink(activeEnemy.title)} did not drop anything. <br><br>`);
	for(let i in enemies[activeEnemy.title].drops) {
		let drop = enemies[activeEnemy.title].drops[i];
		$('#info').append(`${enemyLink(activeEnemy.title)} dropped ${itemLink(drop)}<br><br>`);
		setOptions(pickUpItemPrompt(nextEvent, drop));
	}
}