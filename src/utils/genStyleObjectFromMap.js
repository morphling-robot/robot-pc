export default function genStyleObjectFromMap(map) {
	const result = {};
	for(const key in map) {
		result[key - 1] = {
			left: map[key].x + 'px',
			top: map[key].y + 'px'
		}
	}

	return result;
}