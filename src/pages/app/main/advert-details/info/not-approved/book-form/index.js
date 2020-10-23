import React, { useRef, useState, memo, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Keyboard,
	ToastAndroid,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import CheckBox from '../../../../new-book/check-box';
import Styles from './style';
import { useTranslation } from 'react-i18next';
import { createAdvertToUpdate } from './../../../../../../../dto/Advert';
import { updateAdvert } from './../../../../../../../services/AdvertsService';
import { loadSingleAdvert } from './../../../../../../../redux/actions/advert';

function BookInfoForm({ advert }) {
	const { t } = useTranslation();
	const categories = useSelector((state) => state.categories.data);
	const originalBook = useRef(advert);
	const [titleUpdated, setTitleUpdated] = useState(advert.title);
	const [authorUpdated, setAuthorUpdated] = useState(advert.author);
	const [descriptionUpdated, setDescriptionUpdated] = useState(
		advert.description,
	);
	const [priceUpdated, setPriceUpdated] = useState(advert.price);
	const [newCategories, setNewCategories] = useState(advert.categories);
	const [isLoading, setIsLoading] = useState(false);
	const isMounted = useRef(true);
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (isMounted.current) {
			setTitleUpdated(advert.title);
			setAuthorUpdated(advert.author);
			setDescriptionUpdated(advert.description);
			setPriceUpdated(advert.price);
			setNewCategories(advert.categories);
			originalBook.current = advert;
		}
	}, [advert]);

	function handleSelectCategory(checked, category) {
		if (checked) {
			setNewCategories((prevVal) => [...prevVal, category]);
		} else {
			setNewCategories((prevVal) =>
				prevVal.filter((cat) => cat.id !== category.id),
			);
		}
	}

	const valuesChanged = useMemo(() => {
		const getCatIDs = (cats) => cats.map((c) => c.id);
		const arraysEqual = (a1, a2) =>
			JSON.stringify(a1) === JSON.stringify(a2);

		const result =
			priceUpdated != originalBook.current.price ||
			titleUpdated !== originalBook.current.title ||
			authorUpdated !== originalBook.current.author ||
			descriptionUpdated !== originalBook.current.description ||
			!arraysEqual(
				getCatIDs(newCategories),
				getCatIDs(originalBook.current.categories),
			);
		return result;
	}, [
		titleUpdated,
		authorUpdated,
		descriptionUpdated,
		newCategories,
		priceUpdated,
	]);

	function resetForm() {
		setTitleUpdated(originalBook.current.title);
		setAuthorUpdated(originalBook.current.author);
		setDescriptionUpdated(originalBook.current.description);
		setNewCategories(originalBook.current.categories);
	}

	async function updateBook() {
		Keyboard.dismiss();
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		const payload = createAdvertToUpdate(originalBook.current, {
			title: titleUpdated,
			description: descriptionUpdated,
			author: authorUpdated,
			price: priceUpdated,
			categories: newCategories,
		});

		try {
			const response = await updateAdvert(
				originalBook.current.id,
				payload,
			);

			if (!response.data || (response.data && response.data.error)) {
				throw new Error();
			}

			dispatch(loadSingleAdvert(originalBook.current.id));
			ToastAndroid.show('Livro editado com sucesso!', ToastAndroid.SHORT);
		} catch (error) {
			console.log({ error });
		} finally {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}
	}

	function handlePriceChange(v) {
		let cleanText = v.replace(/[^\d|,]/gm, '');
		cleanText = cleanText.replace(/[,]/gm, '');
		if (cleanText.length > 2) {
			cleanText =
				cleanText.substring(0, cleanText.length - 2) +
				',' +
				cleanText.substring(cleanText.length - 2);
		}
		setPriceUpdated(cleanText);
	}

	return (
		<View style={Styles.Wrapper}>
			<TouchableOpacity style={Styles.InputContainer}>
				<Text style={Styles.InputText}>{t('advertDetails.title')}</Text>
				<TextInput
					value={titleUpdated}
					style={Styles.Input}
					onChangeText={setTitleUpdated}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={Styles.InputContainer}>
				<Text style={Styles.InputText}>
					{t('advertDetails.author')}
				</Text>
				<TextInput
					value={authorUpdated}
					style={Styles.Input}
					onChangeText={setAuthorUpdated}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={Styles.InputContainer}>
				<Text style={Styles.InputText}>{t('advertDetails.price')}</Text>
				<TextInput
					keyboardType="numeric"
					value={priceUpdated}
					style={Styles.Input}
					onChangeText={handlePriceChange}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={[Styles.InputContainer, Styles.TextareaContainer]}>
				<Text style={Styles.InputText}>
					{t('advertDetails.description')}
				</Text>
				<TextInput
					value={descriptionUpdated}
					style={[Styles.Input, Styles.TextareaInput]}
					multiline={true}
					scrollEnabled
					textAlignVertical="top"
					onChangeText={setDescriptionUpdated}
					onSubmitEditing={() =>
						setDescriptionUpdated((prevVal) => prevVal + '\n')
					}
					returnKeyLabel="Enter"
				/>
			</TouchableOpacity>
			<View style={Styles.CategoriesRow}>
				{categories.map((category) => (
					<CheckBox
						key={category.id}
						value={
							newCategories.find((c) => c.id === category.id)
								? true
								: false
						}
						handleCheckBox={handleSelectCategory}
						category={category}
					/>
				))}
			</View>
			<View style={[Styles.Row, Styles.ActionsRow]}>
				<RectButton
					enabled={valuesChanged}
					onPress={resetForm}
					style={[Styles.ActionButton, Styles.SecondaryAction]}>
					<Text style={Styles.ActionButtonText}>
						{t('global.cancel')}
					</Text>
				</RectButton>
				<RectButton
					enabled={valuesChanged}
					onPress={updateBook}
					style={[
						Styles.ActionButton,
						Styles.PrimaryAction,
						!valuesChanged && Styles.DisabledAction,
					]}>
					<Text style={Styles.ActionButtonText}>
						{t('global.update')}
					</Text>
				</RectButton>
			</View>
		</View>
	);
}

export default memo(BookInfoForm);
