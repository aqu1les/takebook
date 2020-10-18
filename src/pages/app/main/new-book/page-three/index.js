import React from 'react';
import { useSelector } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import CheckBox from '../check-box';

export default function PageThree({
	goToSecondSection,
	handleCheckBox,
	description,
	setDescription,
	bookCategories,
	handleSubmit,
	canSubmit,
}) {
	const { t } = useTranslation();
	const categories = useSelector((state) => state.categories.data);

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={0}
			behavior={'position'}
			contentContainerStyle={Styles.ViewContainer}
			enabled
			style={Styles.PageThree}>
			<View style={Styles.CategoriesContainer}>
				<Text style={Styles.CategoriesText}>
					{t('newBook.pageThree.categories')}
				</Text>
				<View style={Styles.CategoriesList}>
					{categories.map((category) => (
						<CheckBox
							key={category.id}
							value={
								bookCategories.findIndex(
									(c) => c.id === category.id,
								) !== -1
									? true
									: false
							}
							handleCheckBox={handleCheckBox}
							category={category}
						/>
					))}
				</View>
			</View>
			<TouchableOpacity
				style={Styles.PreviousSectionButton}
				onPress={goToSecondSection}>
				<Icon name="chevron-up" size={32} color="#a5a5a5" />
			</TouchableOpacity>
			<Text style={Styles.DescriptionText}>
				{t('newBook.pageThree.description')}
			</Text>
			<TextInput
				multiline
				blurOnSubmit={false}
				returnKeyLabel="Enter"
				onChangeText={(text) => setDescription(text)}
				value={description}
				style={Styles.DescriptionInput}
				onSubmitEditing={() => setDescription((text) => text + '\n')}
			/>

			<TouchableOpacity
				style={[
					Styles.PostBookButton,
					!canSubmit && { backgroundColor: '#e5e5e5' },
				]}
				onPress={handleSubmit}
				disabled={!canSubmit}>
				<Text style={Styles.PostBookText}>
					{t('newBook.pageThree.button')}
				</Text>
			</TouchableOpacity>
			<View style={Styles.End} />
		</KeyboardAvoidingView>
	);
}
