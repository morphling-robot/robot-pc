export default function (code) {
	if (!code.match(/\\x/)) {
		return code;
	}

	const hex = code.replace(/\\x/g, '');

	const result = [];
	let str = '';

	hex.split('').forEach((item, index) => {
		if (index % 2 === 0) {
			const ele = parseInt(hex.substring(index, index + 2), 16);
			
			result.push(ele);
		} 
	});

	for(let i = 0; i < result.length; i++) {
		const one = result[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if(v && one.length == 8) {
				const bytesLength = v[0].length;
				let store = result[i].toString(2).slice(7 - bytesLength);
				for(let st = 1; st < bytesLength; st++) {
					store += result[st + i].toString(2).slice(2);
				}

				str += String.fromCharCode(parseInt(store, 2));
				i += bytesLength - 1;
		} else {
				str += String.fromCharCode(result[i]);
		}
	}

	return str;
}