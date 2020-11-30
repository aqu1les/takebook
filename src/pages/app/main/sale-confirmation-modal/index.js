import React, { useState, useRef, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-native-swiper';
import Styles from './style';
import { confirmBookPurchase } from '../../../../services/UserService';
import CardToConfirm from './card-to-confirm/index';

function SaleConfirmationModal({ isVisible, onCloseModal, books }) {
	const { t } = useTranslation();
	const [booksToConfirm, setBooksToConfirm] = useState(
		books ? [...books] : [],
	);
	const [loading, setLoading] = useState(
		booksToConfirm.reduce((acc, b) => ({ ...acc, [b.id]: false }), {}),
	);
	const isMounted = useRef(true);

	useEffect(() => {
		if (isVisible && (!booksToConfirm || booksToConfirm.length === 0)) {
			onCloseModal();
		}
	}, [booksToConfirm, onCloseModal, isVisible]);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	async function confirmBuy(bookId) {
		if (loading[bookId]) {
			return;
		}

		setLoading((v) => {
			return {
				...v,
				[bookId]: true,
			};
		});

		try {
			await confirmBookPurchase(bookId, true);
			setBooksToConfirm((b) => b.filter((book) => book.id !== bookId));
		} catch (err) {
		} finally {
			if (isMounted.current) {
				setLoading((v) => {
					return {
						...v,
						[bookId]: false,
					};
				});
			}
		}
	}

	async function rejectBuy(bookId) {
		if (loading[bookId]) {
			return;
		}

		setLoading((v) => {
			return {
				...v,
				[bookId]: true,
			};
		});

		try {
			await confirmBookPurchase(bookId, false);
			setBooksToConfirm((b) => b.filter((book) => book.id !== bookId));
		} catch (err) {
		} finally {
			if (isMounted.current) {
				setLoading((v) => {
					return {
						...v,
						[bookId]: false,
					};
				});
			}
		}
	}

	return (
		<Modal
			style={Styles.Modal}
			isVisible={isVisible}
			animationIn="zoomIn"
			animationOut="zoomOut">
			<KeyboardAvoidingView
				style={Styles.ModalCard}
				keyboardVerticalOffset={20}>
				<Text style={Styles.Title}>
					{t('saleConfirmationModal.title')}
				</Text>
				<View style={Styles.SwiperWrapper}>
					{booksToConfirm && booksToConfirm.length > 0 && (
						<Swiper
							dotStyle={Styles.Dot}
							activeDotStyle={Styles.ActiveDot}
							containerStyle={Styles.SwiperContainer}
							activeDotColor="#FB8C00">
							{booksToConfirm.map((book, index) => (
								<CardToConfirm
									key={book.id}
									book={book}
									loading={loading[book.id]}
									confirm={() => confirmBuy(book.id)}
									reject={() => rejectBuy(book.id)}
								/>
							))}
						</Swiper>
					)}
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

export default SaleConfirmationModal;
