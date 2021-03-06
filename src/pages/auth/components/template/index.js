import React, { useEffect } from 'react';
import {
	StatusBar,
	View,
	KeyboardAvoidingView,
	ActivityIndicator,
	SafeAreaView,
} from 'react-native';
import Styles from './style';
import BgBr from '../../../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../../../assets/background/backgroundTopLeft.svg';
import Logo from '../../../../assets/logo.svg';

function Template(props) {
	useEffect(() => {
		StatusBar.setBarStyle('dark-content');
	});

	return (
		<>
			<StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />
			<SafeAreaView style={Styles.View}>
				<View style={Styles.ImageLeft}>
					<BgTL width="100%" height="100%" />
				</View>
				<View style={Styles.ImageRight}>
					<BgBr width="100%" height="100%" />
				</View>
				<KeyboardAvoidingView
					style={Styles.Card}
					behavior="height"
					keyboardVerticalOffset={
						props.keyboardOffset !== undefined
							? props.keyboardOffset
							: 400
					}
					enabled>
					{props.withLogo !== false && (
						<View
							style={[
								Styles.Header,
								{ padding: props.newHeader ? 0 : 20 },
							]}>
							{props.newHeader ? (
								props.newHeader
							) : (
								<Logo width="80%" height="80%" />
							)}
						</View>
					)}
					{props.children}
				</KeyboardAvoidingView>
				{props.loading && (
					<ActivityIndicator
						color={'#fb8c00'}
						style={Styles.ActvIndicator}
					/>
				)}
			</SafeAreaView>
		</>
	);
}

export default Template;
