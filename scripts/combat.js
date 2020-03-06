/* COMBAT SYSTEM */

let enemyAttackTimer;

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

function displayEnemy() {
	$enemy = $('#enemy');
	enemyObj = enemies[activeEnemy.title];

	if(activeEnemy.health <= 0) combatWin();

	$enemy.empty();
	$enemy.append(enemyLink(activeEnemy.title) + '<br><br>')
		.append(`Health: ${activeEnemy.health} / ${enemyObj.health}`);
}

/* PLAYER ACTIONS */

function playerUsePrimary() {
	$("#primary").attr("disabled", true);

	damageDealt = items[player.primary].atk_dmg - enemies[activeEnemy.title].def;
	if(damageDealt < 1) damageDealt = 1;

	activeEnemy.health -= damageDealt;
	displayEnemy();

	let cooldown = 1000 * items[player.primary].atk_rate;
	setTimeout(function() { $("#primary").attr("disabled", false); }, cooldown);
}

function playerUseSecondary() {
	$("#secondary").attr("disabled", true);

	damageDealt = items[player.secondary].atk_dmg - enemies[activeEnemy.title].def;
	if(damageDealt < 1) damageDealt = 1;

	activeEnemy.health -= damageDealt;
	displayEnemy();

	let cooldown = 1000 * items[player.secondary].atk_rate;
	setTimeout(function() { $("#secondary").attr("disabled", false); }, cooldown);
}

function playerSurrender() {
	clearInterval(enemyAttackTimer);
	$('#info').empty().append(`${enemyLink(activeEnemy.title)} lost interest and left.<br><br>`);
	setOptions(addEventToggle(nextEvent, 'Continue'));
}

function playerFlee() {
	clearInterval(enemyAttackTimer);
	$('#info').empty().append(`Player successfully fled from ${enemyLink(activeEnemy.title)}.<br><br>`);
	setOptions(addEventToggle(nextEvent, 'Continue'));
}

/* ENEMY ACTIONS */

function enemyAttack() {
	damageDealt = enemies[activeEnemy.title].atk_dmg - player.def;
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

/* WIN/LOSS CONDITIONS */

function combatWin() {
	activeEnemy.health = 0;
	clearInterval(enemyAttackTimer);
	$('#info').append(`${enemyLink(activeEnemy.title)} has been defeated in combat.<br><br>`);
	setOptions(addButton('inspectEnemyDrops()', 'Inspect Drops'));
}

function combatLoss() {
	player.health.now = 0;
	clearInterval(enemyAttackTimer);
	$('#info').empty().append('Player has died. Refresh the page to restart.');
	$('#options').empty();
}