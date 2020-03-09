/* COMBAT SYSTEM */

// Timer that tracks enemy attack cooldowns

let enemyAttackTimer;

// Initiates combat between the player and a predetermined enemy

function beginCombat() {
	$('#info').append('Battle started!<div id="enemy"></div>');
	displayEnemy();
	enemyAttackTimer = setInterval(enemyAttack, (1000 * enemies[activeEnemy.title].atk_rate));

	$options = $('#options');
	$options.empty();

	if(player.primary !== 'None')
		$options.append(addIDButton('primary', `playerUsePrimary()`, `Use ${items[player.primary].name}`));

	if(player.secondary !== 'None')
		$options.append(addIDButton('secondary', `playerUseSecondary()`, `Use ${items[player.secondary].name}`));

	$options.append('<br><br>' + addButton(`playerSurrender()`, 'Surrender') + addButton(`playerFlee()`, 'Flee'));
}

// Displays and updates the active enemy in a <div>

function displayEnemy() {
	$enemy = $('#enemy');
	enemyObj = enemies[activeEnemy.title];

	if(activeEnemy.health <= 0) combatWin();

	$enemy.empty();
	$enemy.append(enemyLink(activeEnemy.title) + '<br><br>')
		.append(`Health: ${activeEnemy.health} / ${enemyObj.health}`);
}

/* PLAYER ACTIONS */

// Use the player's currently equipped primary weapon

function playerUsePrimary() {
	$("#primary").attr("disabled", true);

	damageDealt = items[player.primary].atk_dmg - enemies[activeEnemy.title].def;
	if(damageDealt < 1) damageDealt = 1;

	activeEnemy.health -= damageDealt;
	displayEnemy();

	let cooldown = 1000 * items[player.primary].atk_rate;
	setTimeout(function() { $("#primary").attr("disabled", false); }, cooldown);
}

// Use the player's currently equipped secondary weapon

function playerUseSecondary() {
	$("#secondary").attr("disabled", true);

	damageDealt = items[player.secondary].atk_dmg - enemies[activeEnemy.title].def;
	if(damageDealt < 1) damageDealt = 1;

	activeEnemy.health -= damageDealt;
	displayEnemy();

	let cooldown = 1000 * items[player.secondary].atk_rate;
	setTimeout(function() { $("#secondary").attr("disabled", false); }, cooldown);
}

// Surrender to the enemy (functionally identical to fleeing for now)

function playerSurrender() {
	clearInterval(enemyAttackTimer);
	$('#info').empty().append(`${enemyLink(activeEnemy.title)} lost interest and left.<br><br>`);
	setOptions(addEventToggle(nextEvent, 'Continue'));
}

// Surrender to the enemy (ends combat without rewards)

function playerFlee() {
	clearInterval(enemyAttackTimer);
	$('#info').empty().append(`Player successfully fled from ${enemyLink(activeEnemy.title)}.<br><br>`);
	setOptions(addEventToggle(nextEvent, 'Continue'));
}

/* ENEMY ACTIONS */

// Deal damage to the player each time the attack cooldown refreshes

function enemyAttack() {
	damageDealt = enemies[activeEnemy.title].atk_dmg - player.def;
	if(damageDealt < 1) damageDealt = 1;

	player.health.now -= damageDealt;
	if(player.health.now <= 0) combatLoss();

	displayPlayer();
}

/* WIN/LOSS CONDITIONS */

function enemySurrender() {
	clearInterval(enemyAttackTimer);
	// Unused
}

function enemyFlee() {
	clearInterval(enemyAttackTimer);
	// Unused
}

// The active enemy takes fatal damage (ends combat with rewards)

function combatWin() {
	activeEnemy.health = 0;
	clearInterval(enemyAttackTimer);
	$('#info').append(`${enemyLink(activeEnemy.title)} has been defeated in combat.<br><br>`);
	setOptions(addButton('inspectEnemyDrops()', 'Inspect Drops'));
}

// The player takes fatal damage (ends game)

function combatLoss() {
	player.health.now = 0;
	clearInterval(enemyAttackTimer);
	$('#info').empty().append('Player has died. Refresh the page to restart.');
	$('#options').empty();
}