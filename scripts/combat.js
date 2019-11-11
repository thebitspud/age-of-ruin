const enemies = {
	'giant-raven': {
		'name': 'Giant Raven',
		'health': 10,
		'atk_damage': 2,
		'atk_rate': 2.0,
		'defense': 0,
		'desc': 'A large, mean looking bird.'
	},

	'error': {
		'health': 0,
		'atk_damage': 0,
		'atk_rate': 0,
		'def': 0,
		'desc': "That enemy could not be found. Please report this issue to <a href='https://github.com/thebitspud/age-of-ruin/issues' target='_blank' rel='noopener'>the developer</a>."
	}
}

let enemyLink = function(enemy) {
	return `<button style="color: brown" onClick="inspectEnemy('${enemy}')">${enemies[enemy].name}</button>`;
}

let encounterEnemy = function(event, enemy) {
	return addButton(`enemyPrompt('${event}', '${enemy}')`, 'Continue')
}

function enemyPrompt (event, enemy) {
	$('#info').append(`Encountered ${enemyLink(enemy)}<br><br>`);

	setOptions(addButton(`beginCombat('${event}', '${enemy}')`, 'Fight') + addButton(`playerFlee('${event}, '${enemy}')`, 'Flee'));
}

function beginCombat(event, enemy) {
	$options = $('#options');

	$options.empty();

	if(player.primary !== 'None') $options.append(addButton(`playerUsePrimary()`, `Use ${items[player.primary].name}`));

	if(player.secondary !== 'None') $options.append(addButton(`playerUseSecondary()`, `Use ${items[player.secondary].name}`));

	$options.append('<br><br>' + addButton(`playerSurrender()`, "Surrender") + addButton(`playerFlee()`, "Flee"));
}

function inspectEnemy(enemy) {
	let enemyObj = enemies['error'];

	for(let i = 0; i < Object.keys(enemies).length; i++) {
		if(Object.keys(enemies)[i] === enemy) {
			enemyObj = Object.values(enemies)[i];
			break;
		}
	}

	$inspect = $('#inspect');

	$inspect.empty()
		.append(addHeader('INSPECT'))
		.append(`<p style="color: brown; text-align: center">${enemyObj.name}</p>`)
		.append(`<br>${enemyObj.desc}`)
		.append(`<br><br>Health: ${enemyObj.health}`)
		.append(`<br>Attack Damage: ${enemyObj.atk_damage}`)
		.append(`<br>Attack Speed: ${enemyObj.atk_rate}`);
}

// setTimeout(function, milliseconds)

// var lastPrimaryUse = new Date().getTime();

function playerUsePrimary() {
	alert('Player primary used!');
}

function playerUseSecondary() {
	alert('Player secondary used!')
}

function playerSurrender() {
	alert('Player surrendered!')
}

function playerFlee() {
	alert('Player attempted to flee!')
}

// setInterval(function, milliseconds)

function enemyAttack() {

}

function enemySurrender() {

}

function enemyFlee() {

}