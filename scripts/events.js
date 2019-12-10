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
		'options': addEventToggle('forest-3', 'Investigate') + addEventToggle('road-0', 'To the Road')
	},

	'forest-3': {
		'info': 'You warily advance towards the object that caught your attention. Upon further inspection, it appears to be some sort of coin-shaped talisman.',
		'options': pickUpItemPrompt('forest-4', 'tali-life')
	},

	'forest-4': {
		'info': '-cA giant shadow swoops in from above.',
		'options': encounterEnemy('forest-5', 'large-raven')
	},

	'forest-5': {
		'info': 'There appears to be nothing else of value in the region.',
		'options': addEventToggle('road-0', 'To the Road')
	},

	'road-0': {
		'info': '-cThe monotonous gravel of the road starkly contrasts with the wild grasses that surround it.',
		'options': addEventToggle('w-road-0', 'Turn Left') + addEventToggle('e-road-0', 'Turn Right')
	},

	'w-road-0': {
		'info': 'You turn left.',
		'options': addEventToggle('w-road-1', 'Continue')
	},

	'w-road-1': {
		'info': 'The winding road streches on as far as you can see.',
		'options': addEventToggle('w-road-2', 'Continue')
	},

	'w-road-2': {
		'info': 'While walking along the path, you notice a tall stone obelisk off in the distance.',
		'options': addEventToggle('obelisk-0', 'Investigate') + addEventToggle('w-road-3', 'Ignore')
	},

	'w-road-3': {
		'info': 'You ignore the structure and proceed forwards.',
		'options': addEventToggle('w-road-4', 'Continue')
	},

	'w-road-4': {
		'info': '-cAs you walk long the path, you suddenly hear rapid, light footsteps approaching you from behind.',
		'options': encounterEnemy('w-road-5', 'feral-goblin')
	},

	'w-road-5': {
		'info': 'The road slowly tapers off into an unpaved path leading across a mountain range.',
		'options': encounterEnemy('w-road-5', 'feral-goblin')
	},

	'obelisk-0': {
		'info': '-cYou approach the obelisk.',
		'options': addEventToggle('obelisk-1', 'Continue')
	},

	'obelisk-1': {
		'info': 'This monolith has three uniform sides and stands at roughly five times your height. The ground around it is fitted with chunks of smooth rock dotted with patches of moss.',
		'options': addEventToggle('obelisk-2', 'Continue')
	},

	'obelisk-2': {
		'info': 'A barely legible script is etched into the base of the obelisk.',
		'options': addEventToggle('obelisk-3', 'Read the Text')
	},

	'obelisk-3': {
		'info': 'The script reads as follows:<br><em style="color:darkblue">Place a hand upon this stone for a glimpse of coming times</em>',
		'options': addEventToggle('vision-1', 'Touch it') + addEventToggle('obelisk-4', 'Leave')
	},

	'obelisk-4': {
		'info': "You move away from the obelisk and back onto the road.",
		'options': addEventToggle('w-road-4', 'Continue')
	},

	'vision-1': {
		'info': '-cYou place your palm on the obelisk. At once, an overwhelming vision fills your mind.',
		'options': addEventToggle('vision-2', 'Continue')
	},

	'vision-2': {
		'info': "In front of you is a bird's eye view of a well defended fortress city. The settlement is bustling with activity, particularly around the outer wall, but there is a certain unease to the scene.",
		'options': addEventToggle('vision-3', 'Continue')
	},

	'vision-3': {
		'info': "The vision shifts and refocuses. In a huge ring around the citadel, an impossibly large army of hideous creatures has been assembled. From goblin warriors to shade ghouls to gargantuan eldritch horrors,it seems as if every malevolent soul in the realm has been summoned for this final onslaught.",
		'options': addEventToggle('vision-4', 'Continue')
	},

	'vision-4': {
		'info': "You watch helplessly as the horde begins its advance towards the city. Waves of cannonballs, arrows, and magical projectiles rain down upon the beasts but are not enough to turn the tide.",
		'options': addEventToggle('vision-5', 'Continue')
	},

	'vision-5': {
		'info': "Eventually, the mass manages to reach the fortified perimeter. Massive siege machines deployed by the attackers cleave through one section of the wall after another. As the fortress falls, countless fiends pour into the city and devour its citizens alive.",
		'options': addEventToggle('vision-6', 'Continue')
	},

	'vision-6': {
		'info': "Horrified, you snap out of the vision and take your hand off of the obelisk.",
		'options': addEventToggle('obelisk-4', 'To the Road')
	},

	'e-road-0': {
		'info': 'You turn right.',
		'options': addEventToggle('e-road-1', 'Continue')
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