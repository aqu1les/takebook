export function createFormData(photos, fieldname, fields) {
	const data = new FormData();
	if (photos.length === 1) {
		data.append(fieldname, {
			name: photos[0].fileName,
			type: photos[0].type,
			uri: photos[0].uri,
		});
	} else if (photos.length > 1) {
		photos.forEach((photo, i) => {
			data.append(`${fieldname}[${i}]`, {
				name: photo.fileName,
				type: photo.type,
				uri: photo.uri,
			});
		});
	}
	Object.keys(fields).forEach((key) => {
		if (fields[key] instanceof Array) {
			fields[key].forEach((k, i) => {
				data.append(`${key}[${i}]`, k);
			});
		} else {
			data.append(key, fields[key]);
		}
	});
	return data;
}
