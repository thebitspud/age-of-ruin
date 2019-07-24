// Returns an HTML header with the specified title

let addHeader = function(title) {
	return `<p class="header">${title}</p><hr class="header">`;
};

// Returns an HTML button with the specified parameters

let addButton = function(args, text) {
	return `<button class="option" onclick="${args}">${text}</button>`;
};

// Begins the game once the script is loaded

$(function() { // shorthand for $(document).ready
	displayStats();
	displayInventory();
	$('#history').append(addHeader('HISTORY'));
	$('#inspect').append(addHeader('INFO'));

	playEvent(events['intro-0']);
});