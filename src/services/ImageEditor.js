import { RNPhotoEditor } from "react-native-photo-editor";

/**
 * 
 * @param {string} path 
 * @param {onDone} onDone
 * @param {onCancel} onCancel
 * 
 * @callback onDone
 * @callback onCancel
 */
export default function (path, onDone, onCancel) {
    RNPhotoEditor.Edit({
        path: path,
        hiddenControls: ['draw', 'share', 'sticker', 'text'],
        onDone: path => {
            onDone(path);
        },
        onCancel: () => {
            onCancel();
        },
    });
}