// Returns an HTML button that executes a specified event

let addEventToggle = function (event, text) {
	return addButton(`playEvent('${event}')`, text);
};

// Player decides whether to pick up an item

let pickUpItemPrompt = function(event, item) {
	return addButton(`inspectItem('${item}')`, 'Inspect') + addButton(`pickUpSuccess('${event}', '${item}')`, 'Pick Up') + addButton(`discardItem('${event}', '${item}')`, 'Discard');
}

// All event dialogue in the game

const events = {
	'intro-0': {
		'info': '-cYou wake up and open your eyes.',
		'options': addEventToggle('intro-1', 'Continue')
	},

	'intro-1': {
		'info': `Though the ground you lie on is cold and uneven, you can't help but admire the countless stars above dotting the clear night sky.`,
		'options': addEventToggle('intro-2', 'Continue')
	},

	'intro-2': {
		'info': 'You sit up and look around, surveying the unfamiliar landscape.',
		'options': addEventToggle('intro-3', 'Continue')
	},

	'intro-3': {
		'info': 'You can barely see the light of dawn off in the distance. It is still dark out, but you can tell that you are in an unkempt grassy field.',
		'options': addEventToggle('intro-4', 'Continue')
	},

	'intro-4': {
		'info': 'You do not know where you are or how you got here.',
		'options': addEventToggle('intro-5', 'Inspect Area')
	},

	'intro-5': {
		'info': 'You spot a small dagger lying on the ground.',
		'options': addButton(`inspectItem('blunt-dagger')`, 'Inspect') + addButton(`pickUpSuccess('intro-6', 'blunt-dagger')`, 'Pick Up')
	},

	'intro-6': {
		'info': 'There appears to be nothing else of value in the region.',
		'options': addEventToggle('intro-7', 'Continue')
	},

	'intro-7': {
		'info': 'Moving out of this area would be a good idea. Behind you is a towering forest, but in the opposite direction you spot what appears to be a well used road.',
		'options': addEventToggle('forest-0', 'To the Forest') + addEventToggle('road-0', 'To the Road')
	},

	'forest-0': {
		'info': '-cYou cautiously approach the monumental forest, peering into the dark expanse beneath the canopy.',
		'options': addEventToggle('forest-1', 'Inspect Area')
	},

	'forest-1': {
		'info': 'Along the edge of the forest, you spot some bright red berries growing on a nearby shrub.',
		'options': pickUpItemPrompt('forest-2', 'berries')
	},

	'forest-2': {
		'info': 'You are about to turn around and head for the road when a sudden glint of light in the undergrowth catches your eye.',
		'options': addEventToggle('forest-3', 'Inspect Area') + addEventToggle('road-0', 'To the Road')
	},

	'forest-3': {
		'info': 'You warily advance towards the object that caught your attention. Upon further inspection, it appears to be some sort of coin-shaped talisman.',
		'options': pickUpItemPrompt('forest-4', 'tali-life')
	},

	'forest-4': {
		'info': '-cA giant shadow swoops in from above.',
		'options': encounterEnemy('forest-5', 'giant-raven')
	},

	'forest-5': {
		'info': 'There appears to be nothing else of value in the region.',
		'options': addEventToggle('road-0', 'To the Road')
	},

	'road-0': {
		'info': '-cOccasional bunches of wild grasses starkly contrast the monotonous gravel of the road that surrounds them. In both directions, the winding path streches on as far as you can see.',
		'options': addEventToggle('e-road-0', 'Turn Left') + addEventToggle('w-road-0', 'Turn Right')
	},

	'e-road-0': {
		'info': 'You turn left',
		'options': addEventToggle('e-road-0', 'Turn Left') + addEventToggle('w-road-0', 'Turn Right')
	},

	'w-road-0': {
		'info': 'You turn right',
		'options': addEventToggle('e-road-0', 'Turn Left') + addEventToggle('w-road-0', 'Turn Right')
	}
};

// Activating an event

function playEvent(event) {
	evtObj = events[event];
	evtInfo = evtObj.info;

	$info = $('#info');
	
	if(evtInfo.startsWith('-c')) {
		$info.empty();
		evtInfo = evtInfo.substr(2);
	}

	$info.append(evtInfo + '<br><br>');
	setOptions(evtObj.options);
}

// Successfully picking up an item

function pickUpSuccess(event, item) {
	setOptions(addEventToggle(event, 'Continue'));
	acquireItem(item);
}

// Discarding an item

function discardItem(event, item) {
	$('#info').append(`<span style="color: red">Discarded</span> ${itemLink(item)}<br><br>`);
	setOptions(addEventToggle(event, 'Continue'));
}