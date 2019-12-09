const enemies = {
	'giant-raven': {
		'name': 'Giant Raven',
		'health': 30,
		'atk_dmg': 2,
		'atk_rate': 2.0,
		'def': 1,
		'desc': 'A large, mean looking bird.'
	},

	'error': {
		'health': 0,
		'atk_dmg': 0,
		'atk_rate': 0,
		'def': 0,
		'desc': 'That enemy could not be found. Please report this issue to <a href="https://github.com/thebitspud/age-of-ruin/issues" target="_blank" rel="noopener">the developer</a>.'
	}
}

/* COMBAT UTILS */

let activeEnemy = {
	'name': '',
	'health': 0
}

let nextEvent = "";

let enemyLink = function(enemy) {
	return `<button style="color: brown" onClick="inspectEnemy('${enemy}')">${enemies[enemy].name}</button>`;
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
		.append(`<br><br>Max Health: ${enemyObj.health}`)
		.append(`<br>Attack Damage: ${enemyObj.atk_dmg}`)
		.append(`<br>Attack Cooldown: ${enemyObj.atk_rate.toFixed(1)}s`)
		.append(`<br>Defense: ${enemyObj.def}`);
}

/* ENEMY EVENTS */

let encounterEnemy = function(event, enemy) {
	nextEvent = event;
	activeEnemy.name = enemy;
	activeEnemy.health = enemies[enemy].health;

	return addButton(`enemyPrompt()`, 'Continue')
}

function enemyPrompt () {
	$('#info').append(`Encountered ${enemyLink(activeEnemy.name)}<br><br>`);

	setOptions(addButton(`beginCombat()`, 'Fight') + addButton(`playerFlee()`, 'Flee'));
}

function combatWin() {
	activeEnemy.health = 0;
	clearInterval(enemyAttackTimer);
	$('#info').append(`${enemyLink(activeEnemy.name)} has been defeated in combat.<br><br>`);
	setOptions(addButton('inspectDrops()', 'Inspect Drops'));
}

function inspectDrops() {
	$('#info').empty().append(`${enemyLink(activeEnemy.name)} did not drop anything. <br><br>`);
	setOptions(addEventToggle(nextEvent, 'Continue'));
}

function combatLoss() {
	clearInterval(enemyAttackTimer);
	$('#info').empty().append('Player has died.');
	$('#options').empty();
}

/* COMBAT SYSTEM */

let enemyAttackTimer;

function beginCombat() {
	$('#info').append('Battle started!<div id="enemy"></div>');
	displayEnemy();
	enemyAttackTimer = setInterval(enemyAttack, (1000 * enemies[activeEnemy.name].atk_rate));

	$options = $('#options');
	$options.empty();

	if(player.primary !== 'None')
		$options.append(addIDButton('primary', `playerUsePrimary()`, `Use ${items[player.primary].name}`));

	if(player.secondary !== 'None')
		$options.append(addIDButton('secondary', `playerUseSecondary()`, `Use ${items[player.secondary].name}`));

	$options.append('<br><br>' + addButton(`playerSurrender()`, 'Surrender') + addButton(`playerFlee()`, 'Flee'));
}

function displayEnemy() {
	$enemy = $('#enemy');
	enemyObj = enemies[activeEnemy.name];

	if(activeEnemy.health <= 0) combatWin();

	$enemy.empty();
	$enemy.append(enemyLink(activeEnemy.name) + '<br><br>')
		.append(`Health: ${activeEnemy.health} / ${enemyObj.health}`);
}

/* PLAYER ACTIONS */

function playerUsePrimary() {
	$("#primary").attr("disabled", true);

	damageDealt = items[player.primary].atk_dmg - enemies[activeEnemy.name].def;
	if(damageDealt < 1) damageDealt = 1;

	activeEnemy.health -= damageDealt;
	displayEnemy();

	let cooldown = 1000 * items[player.primary].atk_rate;
	setTimeout(function() { $("#primary").attr("disabled", false); }, cooldown);
}

function playerUseSecondary() {
	$("#secondary").attr("disabled", true);

	damageDealt = items[player.secondary].atk_dmg - enemies[activeEnemy.name].def;
	if(damageDealt < 1) damageDealt = 1;

	activeEnemy.health -= damageDealt;
	displayEnemy();

	let cooldown = 1000 * items[player.secondary].atk_rate;
	setTimeout(function() { $("#secondary").attr("disabled", false); }, cooldown);
}

function playerSurrender() {
	clearInterval(enemyAttackTimer);
	$('#info').empty().append(`${enemyLink(activeEnemy.name)} lost interest and left.<br><br>`);
	setOptions(addEventToggle(nextEvent, 'Continue'));
}

function playerFlee() {
	clearInterval(enemyAttackTimer);
	$('#info').empty().append(`Player successfully fled from ${enemyLink(activeEnemy.name)}.<br><br>`);
	setOptions(addEventToggle(nextEvent, 'Continue'));
}

/* ENEMY ACTIONS */

function enemyAttack() {
	damageDealt = enemies[activeEnemy.name].atk_dmg - player.def;
	if(damageDealt < 1) damageDealt = 1;

	player.health.now -= damageDealt;
	if(player.health.now <= 0) combatLoss();

	displayPlayer();
}

function enemySurrender() {
	clearInterval(enemyAttackTimer);
	// Unused
}

function enemyFlee() {
	clearInterval(enemyAttackTimer);
	// Unused
}