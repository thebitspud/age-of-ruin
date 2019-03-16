$(document).ready(function() {
	displayStats();
	displayInventory();
	$('#actions').append(addHeader('SPELLS'));
	$('#inspect').append(addHeader('INFO'));

	playEvent(events['intro-0']);

	/*

	displayActions();

	*/
});
