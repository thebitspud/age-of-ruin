var addHeader = function(title) {
	return `<p class="header">${title}</p><hr class="header">`
}

$('#stats').append(addHeader('STATS'));
$('#actions').append(addHeader('SPELLS'));
$('#inspect').append(addHeader('INFO'));
$('#inventory').append(addHeader('INVENTORY'));
