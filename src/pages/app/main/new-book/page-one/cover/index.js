import React from 'react';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from './style';

export default function Cover({
	previewCover,
	handleCoverPicker,
	handleEditImage,
	handleRemoveImage,
}) {
	return previewCover ? (
		<View style={Styles.ImageWrapper}>
			<Image
				source={{ uri: `file://${previewCover}` }}
				style={Styles.Cover}
				onTouchEnd={handleEditImage}
			/>
			<FontAwesome
				name="edit"
				color="#000"
				size={24}
				style={{ position: 'absolute', alignSelf: 'center' }}
				onTouchEnd={handleEditImage}
			/>
			<Icon
				name="window-close"
				color="#000"
				size={18}
				style={{ position: 'absolute', top: 8, right: 8 }}
				onTouchEnd={handleRemoveImage}
			/>
		</View>
	) : (
		<View
			style={[Styles.ImageWrapper, Styles.ImageHolder]}
			onTouchEnd={handleCoverPicker}>
			<Icon name="image-plus" size={24} />
		</View>
	);
}
