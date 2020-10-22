import React from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Checkbox from '../../../../new-book/check-box';
import Styles from './style';
import { useTranslation } from 'react-i18next';

function BookInfoForm({ advert }) {
	const { t } = useTranslation();
	const categories = useSelector((state) => state.categories.data);

	return (
		<View style={Styles.Wrapper}>
			<TouchableOpacity style={Styles.InputContainer}>
				<Text style={Styles.InputText}>{t('advertDetails.title')}</Text>
				<TextInput value={advert.title} style={Styles.Input} />
			</TouchableOpacity>
			<TouchableOpacity style={Styles.InputContainer}>
				<Text style={Styles.InputText}>
					{t('advertDetails.author')}
				</Text>
				<TextInput value={advert.author} style={Styles.Input} />
			</TouchableOpacity>
			<TouchableOpacity
				style={[Styles.InputContainer, Styles.TextareaContainer]}>
				<Text style={Styles.InputText}>
					{t('advertDetails.description')}
				</Text>
				<TextInput
					value={advert.description}
					style={[Styles.Input, Styles.TextareaInput]}
					multiline={true}
					scrollEnabled
					textAlignVertical="top"
				/>
			</TouchableOpacity>
			<View style={Styles.CategoriesRow}>
				{categories.map((category) => (
					<Checkbox
						key={category.id}
						value={
							advert.categories.find((c) => c.id === category.id)
								? true
								: false
						}
						handleCheckBox={() => {}}
						category={category}
					/>
				))}
			</View>
			<View style={[Styles.Row, Styles.ActionsRow]}>
				<RectButton
					style={[Styles.ActionButton, Styles.SecondaryAction]}>
					<Text style={Styles.ActionButtonText}>
						{t('global.cancel')}
					</Text>
				</RectButton>
				<RectButton style={[Styles.ActionButton, Styles.PrimaryAction]}>
					<Text style={Styles.ActionButtonText}>
						{t('global.update')}
					</Text>
				</RectButton>
			</View>
		</View>
	);
}

export default BookInfoForm;
