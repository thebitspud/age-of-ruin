const enemies = {
	'giant-raven': {
		'name': 'Giant Raven',
		'health': 10,
		'atk_damage': 2,
		'atk_rate': 2.0,
		'defense': 0,
		'description': 'A massive, mean looking bird.'
	},

	'error': {
		'health': 0,
		'atk_damage': 0,
		'atk_rate': 0,
		'defense': 0,
		'description': "That enemy could not be found. Please report this issue to <a href='https://github.com/thebitspud/age-of-ruin/issues' target='_blank' rel='noopener'>the developer</a>."
	}
}

let beginCombat = function(enemy) {
	return addButton(`usePrimary()`, player.primary)
	+ addButton(`useSecondary()`, player.secondary);
}

let enemyLink = function(enemy) {
	return `<button style="color: brown" onClick="inspectEnemy('${enemy.name}')">${enemy.name}</button>`;
}

function inspectEnemy(title) {
	let enemy = enemies['error'];

	for(let i = 0; i < Object.keys(enemies).length; i++)
		if(Object.values(enemies)[i].name === title) enemy = Object.values(enemies)[i];

	$inspect = $('#inspect');

	$inspect.append(addHeader('INFO'))
		.append(`<p style="color: red; text-align: center">${enemy.name}</p>`)
		.append(`<br>${enemy.desc}`)
		.append(`<br><br>Health: ${enemy.health}`)
		.append(`<br>Attack Damage: ${enemy.atk_damage}`)
		.append(`<br>Attack Rate: ${enemy.atk_rate}`);
}

// setTimeout(function, milliseconds)

// var lastPrimaryUse = new Date().getTime();

function playerUsePrimary() {
	// 
}

function playerUseSecondary() {

}

function playerSurrender() {

}

function playerFlee() {

}

// setInterval(function, milliseconds)

function enemyAttack() {

}

function enemySurrender() {

}

function enemyFlee() {

}