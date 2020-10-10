import React, { memo } from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Styles from './style';
import LoadingBook from '../../../../assets/animations/loading-book.json';

function Loading() {
	return (
		<>
			<Modal
				style={Styles.LoadingContainer}
				animationIn="flipInY"
				isVisible={true}
				coverScreen={true}>
				<LottieView source={LoadingBook} loop autoPlay />
			</Modal>
		</>
	);
}
export default memo(Loading);
