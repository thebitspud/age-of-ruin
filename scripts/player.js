// The player's current stats

const player = {
	'health': {
		'max': 100,
		'now': 100
	},
	'energy': {
		'max': 100,
		'now': 100
	},
	'weight': {
		'max': 25,
		'now': 0
	},
	'def': 0,

	'primary': 'None',
	'secondary': 'None'
};

// Displaying current stats in HTML

function displayPlayer() {
	$player = $('#player');
	$player.empty()
		.append(addHeader('PLAYER'))
		.append(`Health : ${player.health.now} / ${player.health.max}`)
		.append(`<br>Energy : ${player.energy.now} / ${player.energy.max}`)
		.append(`<br>Weight : ${player.weight.now} / ${player.weight.max}`);

	if(player.primary === 'None')
		$player.append('<br><br>Primary : None');
	else $player.append(`<br><br>Primary : ${itemLink(player.primary)}`);
	
	if(player.secondary === 'None')
		$player.append('<br>Secondary : None');
	else $player.append(`<br>Secondary : ${itemLink(player.secondary)}`);
}