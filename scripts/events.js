// Returns an HTML button that executes a specified event

let addEventToggle = function (event, text) {
	return addButton(`playEvent('${event}')`, text);
};

// Player decides whether to pick up an item

let pickUpItemPrompt = function(event, item) {
	return addButton(`inspectItem('${item}')`, 'Inspect') + addButton(`pickUpSuccess('${event}', '${item}')`, 'Pick Up') + addButton(`discardItem('${event}', '${item}')`, 'Discard');
}

// All event messages are stored in dialogue.js

let events = {};

// Adding events from dialogue.js

function addEventPack(evtPackObj) {
	events = Object.assign(events, evtPackObj);
}

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