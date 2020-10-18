import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Template from '../components/template';
import Styles from './style';
import ForgotPassword_1 from './step-1/index';
import ForgotPassword_2 from './step-2/index';
import ForgotPassword_3 from './step-3/index';
import StepTracker from './../components/step-tracker/index';
import {
	removeEmailToRecover,
	removeTokenToRecover,
} from '../../../services/AuthService';

function ForgotPassword_V2({ navigation }) {
	const [currentStep, setCurrentStep] = useState(1);
	const [emailToRecover, setEmailToRecover] = useState('');
	const [tokenToRecover, setTokenToRecover] = useState('');
	const changeStep = useCallback((targetStep) => {
		setCurrentStep(targetStep);
	}, []);
	const Step1Component = useMemo(() => {
		return (
			<ForgotPassword_1
				setTypedEmail={(e) => setEmailToRecover(e)}
				next={() => {
					changeStep(2);
				}}
			/>
		);
	}, [changeStep]);

	const Step2Component = useMemo(() => {
		return (
			<ForgotPassword_2
				email={emailToRecover}
				setTypedToken={(token) => {
					setTokenToRecover(token);
				}}
				next={() => {
					changeStep(3);
				}}
			/>
		);
	}, [changeStep, emailToRecover]);

	const Step3Component = useMemo(() => {
		function goToLoginPage() {
			navigation.navigate('Login', { redirectEmail: emailToRecover });
		}
		return (
			<ForgotPassword_3
				email={emailToRecover}
				token={tokenToRecover}
				next={() => {
					goToLoginPage();
				}}
			/>
		);
	}, [navigation, emailToRecover, tokenToRecover]);

	const currentComponent = useMemo(() => {
		if (currentStep === 1) {
			return Step1Component;
		} else if (currentStep === 2) {
			return Step2Component;
		} else if (currentStep === 3) {
			return Step3Component;
		}
	}, [currentStep, Step1Component, Step2Component, Step3Component]);

	useEffect(() => {
		return () => {
			removeTokenToRecover();
			removeEmailToRecover();
		};
	});

	return (
		<Template withLogo={false} keyboardOffset={0}>
			<View style={Styles.TrackerContainer}>
				<StepTracker
					stepIndex={1}
					isLast={false}
					isActive={currentStep === 1 || currentStep > 1}
				/>
				<StepTracker
					stepIndex={2}
					isLast={false}
					isActive={currentStep === 2 || currentStep > 2}
				/>
				<StepTracker
					stepIndex={3}
					isLast={true}
					isActive={currentStep === 3}
				/>
			</View>
			{currentComponent}
		</Template>
	);
}

export default ForgotPassword_V2;
