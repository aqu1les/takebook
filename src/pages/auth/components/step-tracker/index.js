import React from 'react';
import { View, Text } from 'react-native';
import Styles from './style';

function StepTracker({ stepIndex, isLast, isActive }) {
	return (
		<>
			<View style={[Styles.Button, isActive && Styles.ActiveStep]}>
				<Text style={Styles.IndexText}>{stepIndex}</Text>
			</View>
			{!isLast && (
				<View
					style={[Styles.RightBar, isActive && Styles.ActiveStep]}
				/>
			)}
		</>
	);
}

export default StepTracker;
