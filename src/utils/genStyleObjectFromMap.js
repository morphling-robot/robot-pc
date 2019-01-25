export default function genStyleObjectFromMap(map) {
	const style = {};
	const range = {};

	for(const key in map) {
		style[key - 1] = {
			left: map[key].x + 'px',
			top: map[key].y + 'px'
		}

		range[key - 1] = {
			min: map[key].min - 0,
			max: map[key].max - 0
		}
	}

	return {style, range}; 
}