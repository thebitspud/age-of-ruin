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
	$('#history').append(addHeader('HISTORY'));
	$('#inspect').append(addHeader('INSPECT'));

	playEvent('intro-1');
});