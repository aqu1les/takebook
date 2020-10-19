export function createFormData(photos, fieldname, fields) {
	const data = new FormData();
	toFormData(fields, data);

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

	return data;
}

function toFormData(obj, form, namespace) {
	let fd = form || new FormData();
	let formKey;

	for (let property in obj) {
		if (
			Object.prototype.hasOwnProperty.call(obj, property) &&
			obj[property]
		) {
			if (namespace) {
				formKey = namespace + '[' + property + ']';
			} else {
				formKey = property;
			}

			// if the property is an object, but not a File, use recursivity.
			if (obj[property] instanceof Date) {
				fd.append(formKey, obj[property].toISOString());
			} else if (
				typeof obj[property] === 'object' &&
				!(obj[property] instanceof File)
			) {
				toFormData(obj[property], fd, formKey);
			} else {
				// if it's a string or a File object
				fd.append(formKey, obj[property]);
			}
		}
	}

	return fd;
}
