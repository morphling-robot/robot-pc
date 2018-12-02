export const strToObject = ({ name, body }) => {
	return Object.assign({}, this.strToAction(body), { name });// consider using assign to update a action in action-dialog.vue
}

export const objectToStr = ({ name, body }) => {
	return {
		name,
		body: actionToStr(body)
	};
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

	return {
		frameList,
		speedList
	};
}

export const actionToStr = action => {
	let result = '';

	action.forEach(frame => {
		frame.forEach(servo => {
			result = result + servo.angle + ' ';
		});

		result + '\n';
	});

	return result;
}