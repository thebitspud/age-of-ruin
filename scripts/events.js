function playEvent(event) {
	$('#info').append(event.info + '<br><br>');
	$('#options').html(event.options);
}

var addButton = function(args, text) {
	return `<button button class="option" onclick="${args}">${text}</button>`;
}

var addEvent = function(event, text) {
	return `<button button class="option" onclick="playEvent(events['${event}'])">${text}</button>`;
}

var events = {
	'intro-0': {
		'info': 'You wake up and open your eyes.',
		'options': addEvent('intro-1', 'Continue')
	},

	'intro-1': {
		'info': `The ground you lie on is cold and uneven, but you can't help but admire the countless stars dotting the night sky above you.`,
		'options': addEvent('intro-2', 'Continue')
	},

	'intro-2': {
		'info': 'You sit up and look around, surveying the unfamiliar landscape.',
		'options': addEvent('intro-3', 'Continue')
	},

	'intro-3': {
		'info': 'You can barely see the light of dawn off in the distance. Although it is still dark out, you can tell that you are in an unkempt grassy field. You do not know where you are or how you got here.',
		'options': addEvent('intro-4', 'Inspect Area')
	},

	'intro-4': {
		'info': 'You spot a small dagger on the ground.',
		'options': addButton(`pickUpItemPrompt('intro-5', 'blunt-dagger')`, 'Pick Up')
	},
	
	'intro-5': {
		'info': 'There appears to be nothing else of value in the region. Moving out of this area would be a good idea.',
		'options': addEvent('', 'To the Road') + addEvent('', 'To the Forest')
	},
}

function pickUpItemPrompt(event, item) {
	$('#options').html(addEvent(`${event}`, 'Continue'));
	aquireItem(items[`${item}`]);
}