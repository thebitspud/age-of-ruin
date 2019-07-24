// Returns an HTML button that executes a specified event

let addEventToggle = function (event, text) {
	return addButton(`playEvent(events['${event}'])`, text);
};

// Player decides whether to pick up an item

let pickUpItemPrompt = function(event, item) {
	return addButton(`pickUpSuccess('${event}', '${item}')`, 'Pick Up')
	+ addButton(`discardItem('${event}', '${item}')`, 'Discard');
}

// All event dialogue in the game

const events = {
	'intro-0': {
		'info': '-cYou wake up and open your eyes.',
		'options': addEventToggle('intro-1', 'Continue')
	},

	'intro-1': {
		'info': `The ground you lie on is cold and uneven, but you can't help but admire the countless stars dotting the night sky above you.`,
		'options': addEventToggle('intro-2', 'Continue')
	},

	'intro-2': {
		'info': 'You sit up and look around, surveying the unfamiliar landscape.',
		'options': addEventToggle('intro-3', 'Continue')
	},

	'intro-3': {
		'info': 'You can barely see the light of dawn off in the distance. Although it is still dark out, you can tell that you are in an unkempt grassy field. You do not know where you are or how you got here.',
		'options': addEventToggle('intro-4', 'Inspect Area')
	},

	'intro-4': {
		'info': 'You spot a small dagger lying on the ground.',
		'options': addButton(`pickUpSuccess('intro-5', 'blunt-dagger')`, 'Pick Up')
	},

	'intro-5': {
		'info': 'There appears to be nothing else of value in the region. Moving out of this area would be a good idea.<br><br>Behind you is a towering forest, but in the opposite direction you spot what appears to be a well used road.',
		'options': addEventToggle('forest-0', 'To the Forest') + addEventToggle('road-0', 'To the Road')
	},

	'forest-0': {
		'info': '-cYou cautiously approach the monumental forest, peering into the dark expanse beneath the canopy.',
		'options': addEventToggle('forest-1', 'Inspect Area')
	},

	'forest-1': {
		'info': 'You spot some bright red berries growing on a nearby shrub.',
		'options': pickUpItemPrompt('forest-2', 'berries')
	},

	'forest-2': {
		'info': 'There appears to be nothing else of value in the region.<br><br>You are about to turn around and head for the road when you spot a glinting object amongst the towering woods.',
		'options': addEventToggle('forest-3', 'Into the Forest') + addEventToggle('road-0', 'To the Road')
	},

	'forest-3': {
		'info': 'There appears to be nothing else of value in the region.<br><br>You are about to turn around and head for the road when you spot a glinting object amongst the towering woods.',
		'options': addEventToggle('forest-3', 'Into the Forest') + addEventToggle('road-0', 'To the Road')
	},

	'road-0': {
		'info': '-cIn both directions, the winding path streches on as far as you can see. Occasional bunches of wild grasses starkly contrast the monotonous gravel of the road that surrounds them.',
		'options': addEventToggle('road-0', 'To the Road')
	}
};

// Activating an event

function playEvent(event) {
	$info = $('#info');
	evtInfo = event.info;
	
	if(evtInfo.startsWith('-c')) {
		$info.empty();
		evtInfo = evtInfo.substr(2);
	}

	$info.append(evtInfo + '<br><br>');
	$('#options').empty()
		.append(event.options);
}

// Successfully picking up an item

function pickUpSuccess(event, item) {
	$('#options').empty()
		.append(addEventToggle(event, 'Continue'));
	acquireItem(items[item]);
}

// Discarding an item

function discardItem(event, item) {
	$('#info').append(`<span style="color: red">Discarded</span> ${itemLink(items[item])}<br><br>`);
	$('#options').empty()
		.append(addEventToggle(event, 'Continue'));
}