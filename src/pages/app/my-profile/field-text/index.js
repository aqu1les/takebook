import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Styles from './style';
import { RectButton } from 'react-native-gesture-handler';

function FieldText({ value, label, editable = false, onPress, onSubmit }) {
	const [inputValue, setInputValue] = useState(value);
	const [isEditing, setIsEditing] = useState(false);
	const inputElement = useRef(null);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	function handlePress() {
		if (editable && onPress) {
			onPress();
		}
	}

	function cancelBtnClick() {
		setInputValue(value);
		inputElement.current.blur();
	}

	function confirmBtnClick() {
		if (onSubmit) {
			onSubmit(inputValue);
			setInputValue(value);
		}
		setIsEditing(false);
	}

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={Styles.FormGroup}
			activeOpacity={editable ? 0.8 : 1}>
			<Text style={Styles.InputLabel}>{label}</Text>
			{editable === true ? (
				<View style={Styles.Row}>
					{!isEditing && (
						<TouchableOpacity
							onPress={() => setIsEditing(true)}
							style={[Styles.InputText, Styles.TextInput]}>
							<Text style={Styles.InputText}>{value}</Text>
						</TouchableOpacity>
					)}

					{isEditing && (
						<>
							<TextInput
								autoFocus={true}
								ref={inputElement}
								onBlur={() => setIsEditing(false)}
								onEndEditing={() => setIsEditing(false)}
								onChangeText={(text) => setInputValue(text)}
								value={inputValue}
								style={[Styles.InputText, Styles.TextInput]}
							/>
							<View style={Styles.ActionButtonsWrapper}>
								<RectButton
									onPress={confirmBtnClick}
									style={Styles.ActionButton}>
									<EntypoIcon
										name="check"
										size={24}
										color="#37c"
									/>
								</RectButton>
								<RectButton
									onPress={cancelBtnClick}
									style={Styles.ActionButton}>
									<AntIcon
										name="close"
										size={24}
										color="#d73a49"
									/>
								</RectButton>
							</View>
						</>
					)}
				</View>
			) : (
				<Text style={Styles.InputText}>{value}</Text>
			)}
		</TouchableOpacity>
	);
}

export default FieldText;
