export const strToObject = ({ name, body }) => {
	return Object.assign({}, strToAction(body), { name });// consider using assign to update a action in action-dialog.vue
}

export const objectToStr = ({ name, body }) => {
	const result = {name};
	
	if (body) {
		result.body = actionToStr(body);
	}

	if (body === '') {
		result.body = '';
	}

	return result;
}

export const strToAction = str => {
	const dataLine = str.split('\n');

	const speedList = [];
	const frameList = [];

	dataLine[0].split(' ').forEach(speed => {
		if (speed === '') {
			return;
		}

		speedList.push({ speed: new Number(speed) });
	})

	dataLine.shift();

	dataLine.forEach(item => {
		if (item === '') {
			return;
		}

		const frame = [];

		item.split(' ').forEach(angle => {
			if (angle === '') {
				return;
			}

			frame.push({ angle: new Number(angle) });
		})

		frameList.push(frame);
	});

	try {
		if (frameList.length != speedList.length) {
			throw Error(`frameList length not equal to speedList, ${frameList.length}frame but ${speedList.length}speed`);
		}
	} catch (error) {
		console.log(error);
	}
	
	return {
		frameList,
		speedList
	};
}

export const actionToStr = action => {
	let result = '';

	console.log(action);
	
	action.speedList.forEach(servo => {
		result = result + servo.speed + ' ';
	})

	result = result + '\n';

	action.frameList.forEach(frame => {
		frame.forEach(servo => {
			result = result + servo.angle + ' ';
		});

		result = result + '\n';
	});

	return result;
}