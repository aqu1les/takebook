export function createFormData(photo, fieldname, fields) {
    const data = new FormData();
    data.append(fieldname, {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri
    });
    Object.keys(fields).forEach(key => data.append(key, fields[key]));
    return data;
}