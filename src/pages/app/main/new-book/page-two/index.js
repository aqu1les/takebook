import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';

export default function PageTwo({
	goToTop,
	goToSecondSection,
	goToThirdSection,
	setBookStatus,
	bookStatus,
	title,
	price,
	author,
	setTitle,
	setPrice,
	setAuthor,
}) {
	const { t } = useTranslation();
	return (
		<View style={Styles.PageTwo}>
			<TouchableOpacity
				style={Styles.PreviousSectionButton}
				onPress={goToTop}>
				<Icon name="chevron-up" size={32} color="#a5a5a5" />
			</TouchableOpacity>
			<Text style={Styles.SectionTitle}>
				{t('newBook.pageTwo.help1')}
			</Text>
			<Text style={Styles.HelpText}>
				{t('newBook.pageTwo.remember')}:
			</Text>
			<Text style={Styles.HelpText}>{t('newBook.pageTwo.help2')}</Text>
			<TouchableOpacity style={Styles.FormGroup}>
				<TextInput
					placeholder={t('newBook.pageTwo.title')}
					onBlur={goToSecondSection}
					value={title}
					onChangeText={(value) => setTitle(value)}
					style={Styles.fullFlex}
					maxLength={36}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={Styles.FormGroup}>
				<TextInput
					placeholder={t('newBook.pageTwo.author')}
					onBlur={goToSecondSection}
					value={author}
					onChangeText={(a) => setAuthor(a)}
					style={Styles.fullFlex}
					maxLength={24}
				/>
			</TouchableOpacity>
			<View style={Styles.StatusRow}>
				<View style={Styles.StatusContainer}>
					<Text>{t('newBook.pageTwo.bookStatus')}</Text>
					<Picker
						selectedValue={bookStatus}
						onValueChange={(value) => setBookStatus(value)}
						onBlur={goToSecondSection}
						style={Styles.Picker}>
						<Picker.Item label={t('new')} value={1} />
						<Picker.Item label={t('semiNew')} value={2} />
						<Picker.Item label={t('used')} value={3} />
					</Picker>
				</View>
				<TouchableOpacity style={Styles.PriceContainer}>
					<Text>{t('newBook.pageTwo.howMuch')}</Text>
					<View style={Styles.PriceRow}>
						<Text style={Styles.PriceCurrency}>R$</Text>
						<TextInput
							placeholder="150"
							value={price}
							onChangeText={(p) => setPrice(p)}
							keyboardType="numeric"
							style={Styles.PriceInput}
						/>
					</View>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={Styles.NextSectionButton}
				onPress={goToThirdSection}>
				<Icon name="chevron-down" size={32} color="#a5a5a5" />
			</TouchableOpacity>
		</View>
	);
}
