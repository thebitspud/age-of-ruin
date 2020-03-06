const evts_intro = {
	'intro-0': {
		'info': '-cYou wake up and open your eyes.',
		'options': addEventToggle('intro-1', 'Continue')
	},

	'intro-1': {
		'info': "Though the ground you lie on is cold and uneven, you can't help but admire the countless stars dotting the clear night sky.",
		'options': addEventToggle('intro-2', 'Continue')
	},

	'intro-2': {
		'info': 'After a while, you sit up and survey the unfamiliar landscape. It is still dark out, but the light of dawn grows brighter in the distance.',
		'options': addEventToggle('intro-3', 'Continue')
	},

	'intro-3': {
		'info': 'You can tell that you are in an unkempt grassy clearing. You have no idea how you got here.',
		'options': addEventToggle('intro-4', 'Continue')
	},

	'intro-4': {
		'info': 'A small, metallic object in the grass catches your eye.',
		'options': addButton(`inspectItem('blunt-dagger')`, 'Inspect') + addButton(`pickUpSuccess('intro-5', 'blunt-dagger')`, 'Pick Up')
	},

	'intro-5': {
		'info': 'There appears to be nothing else of value in the region.',
		'options': addEventToggle('intro-6', 'Continue')
	},

	'intro-6': {
		'info': 'Moving out of this area would be a good idea. Behind you is a towering forest, but in the opposite direction you spot what appears to be a well used road.',
		'options': addEventToggle('forest-0', 'To the Forest') + addEventToggle('road-0', 'To the Road')
	}
}

const evts_forest = {
	'forest-0': {
		'info': '-cYou cautiously approach the monumental forest, peering into the dark expanse beneath the canopy.',
		'options': addEventToggle('forest-1', 'Inspect Area')
	},

	'forest-1': {
		'info': 'Along the forest edge, you spot some bright red berries growing on a shrub.',
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
	}
}

const evts_road = {
	'road-0': {
		'info': '-cThe monotonous gravel of the road starkly contrasts with the wild grasses that surround it.',
		'options': addEventToggle('w-road-0', 'Turn Left') + addEventToggle('e-road-0', 'Turn Right')
	},

	'w-road-0': {
		'info': 'You turn left.',
		'options': addEventToggle('w-road-1', 'Continue')
	},

	'w-road-1': {
		'info': 'The winding road stretches on as far as you can see.',
		'options': addEventToggle('w-road-2', 'Continue')
	},

	'w-road-2': {
		'info': 'While walking along the track, you notice a tall stone obelisk off in the distance.',
		'options': addEventToggle('obelisk-0', 'Investigate') + addEventToggle('w-road-3', 'Ignore')
	},

	'w-road-3': {
		'info': 'You ignore the structure and proceed forwards.',
		'options': addEventToggle('w-road-4', 'Continue')
	},

	'w-road-4': {
		'info': '-cYou hear light footsteps approaching from behind.',
		'options': encounterEnemy('w-road-5', 'feral-goblin')
	},

	'w-road-5': {
		'info': 'The road slowly tapers off into an unpaved trail leading across a mountain range.',
		'options': addEventToggle('mountain-0', 'Continue Forward') + addEventToggle('e-road-0a', 'Turn Back')
	},

	'e-road-0': {
		'info': 'You turn right.',
		'options': addEventToggle('e-road-1', 'Continue')
	},

	'e-road-0a': {
		'info': '-cYou decide to turn around and walk back in the direction you came from. You pass by the obelisk and the clearing in which you woke up.',
		'options': addEventToggle('e-road-1', 'Continue')
	},

	'e-road-0b': {
		'info': '-cYou decide to turn around and walk back in the direction you came from. Eventually, you move back onto the road, pass by the obelisk, and cross the clearing in which you woke up.',
		'options': addEventToggle('e-road-1', 'Continue')
	},

	'e-road-1': {
		'info': 'As you stroll along, you spot a figure in the distance walking in your direction.',
		'options': addEventToggle('e-road-2', 'Continue')
	}
}

const evts_obelisk = {
	'obelisk-0': {
		'info': '-cYou approach the obelisk.',
		'options': addEventToggle('obelisk-1', 'Continue')
	},

	'obelisk-1': {
		'info': 'This monolith has three uniform sides and stands at roughly five times your height. The ground around it is fitted with smooth chunks of rock dotted with patches of moss.',
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
		'info': "-cYou move away from the obelisk and back onto the road.",
		'options': addEventToggle('w-road-4', 'Continue')
	}
}

const evts_vision = {
	'vision-1': {
		'info': '-cYou place your palm on the obelisk. At once, an overwhelming vision fills your mind.',
		'options': addEventToggle('vision-2', 'Continue')
	},

	'vision-2': {
		'info': "In front of you is a bird's eye view of a fortress city. The settlement is bustling with activity, particularly around the outer wall, but there is a certain unease to the scene.",
		'options': addEventToggle('vision-3', 'Continue')
	},

	'vision-3': {
		'info': "The vision shifts and refocuses. In a huge ring surrounding the city, an impossibly large army of hideous creatures has been assembled. Goblinoid and orcish warriors make up the plurality, but there are other things in there. Things that should not exist in this world.",
		'options': addEventToggle('vision-4', 'Continue')
	},

	'vision-4': {
		'info': "As one, they advance towards the city. Waves of arrows and magical projectiles rain down on the horde, but the stampede continues unhindered.",
		'options': addEventToggle('vision-5', 'Continue')
	},

	'vision-5': {
		'info': "The horde reaches the fortified perimeter, overwhelming the defenders with ease. As the outer wall collapses, countless terrors pour through and devour the city's inhabitants alive.",
		'options': addEventToggle('vision-6', 'Continue')
	},

	'vision-6': {
		'info': "Horrified, you snap out of the vision and remove your hand from the obelisk.",
		'options': addEventToggle('obelisk-4', 'To the Road')
	}
}

const evts_mountain = {
	'mountain-0': {
		'info': "-cYou follow the trail through the mountains, being careful not to stray from the path.",
		'options': addEventToggle('mountain-1', 'Continue')
	},

	'mountain-1': {
		'info': "The trail is long and rugged. With no end point in sight, you decide to rest and collect your thoughts.",
		'options': addEventToggle('mountain-2', 'Inspect Area') + addEventToggle('mountain-3', 'Continue Forward') + addEventToggle('e-road-0b', 'Turn Back')
	},

	'mountain-2': {
		'info': "You notice some wild berries growing on a bush not far from the trail.",
		'options': pickUpItemPrompt('mountain-3', 'berries')
	},

	'mountain-3': {
		'info': "There appears to be nothing else of value in the region.",
		'options': addEventToggle('mountain-4', 'Continue Forward') + addEventToggle('e-road-0', 'Turn Back')
	},

	'mountain-4': {
		'info': "As you continue forward, you begin to suspect that someone or something is watching you.",
		'options': addEventToggle('mountain-5', 'Continue')
	},

	'mountain-5': {
		'info': "-cYou hear light footsteps approaching from behind.",
		'options': encounterEnemy('mountain-5', 'feral-goblin')
	}
}