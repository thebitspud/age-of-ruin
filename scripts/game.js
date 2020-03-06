// Returns an HTML header with the specified title

let addHeader = function(title) {
	return `<p class="header">${title}</p><hr class="header">`;
};

// Returns an HTML button with the specified parameters

let addButton = function(args, text) {
	return `<button class="option" onclick="${args}">${text}</button>`;
};

let addIDButton = function(id, args, text) {
	return `<button id="${id}" class="option" onclick="${args}">${text}</button>`;
};

// Sets the options available after an event occurs

function setOptions(args) {
	$('#options').empty().append(args);
}

// Begins the game once the script is loaded

$(function() { // shorthand for $(document).ready
	displayPlayer();
	displayInventory();
	$('#quests').append(addHeader('QUESTS'));
	$('#inspect').append(addHeader('INSPECT'));

	addEventPack(evts_intro);
	addEventPack(evts_forest);
	addEventPack(evts_road);
	addEventPack(evts_obelisk);
	addEventPack(evts_vision);
	addEventPack(evts_mountain);

	playEvent('intro-0');
});