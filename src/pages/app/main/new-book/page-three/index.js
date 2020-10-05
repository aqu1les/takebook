import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import CheckBox from '../check-box';

export default function PageThree({
    pageThree,
    goToSecondSection,
    goToThirdSection,
    handleCheckBox,
    description,
    setDescription,
    bookCategories,
    handleSubmit,
    canSubmit,
}) {
    const { t } = useTranslation();
    const categories = useSelector(state => state.categories.data);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        let isMounted = true;
        Keyboard.addListener('keyboardDidShow', () => {
            if (isMounted) {
                setKeyboardVisible(true);
            }
        });
        Keyboard.addListener('keyboardDidHide', () => {
            if (isMounted) {
                setKeyboardVisible(false);
                goToThirdSection();
            }
        });
        return () => {
            isMounted = false;
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="height"
            style={Styles.PageThree}
            ref={pageThree}
            onLayout={() => {}}>
            <View
                style={[
                    { flexDirection: 'column' },
                    keyboardVisible && { display: 'none' },
                ]}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                    {t('newBook.pageThree.categories')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {categories.map(category => (
                        <CheckBox
                            key={category.id}
                            value={
                                bookCategories.findIndex(
                                    c => c.id === category.id,
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
            <Text>{t('newBook.pageThree.description')}</Text>
            <TextInput
                multiline
                blurOnSubmit={false}
                returnKeyLabel="Enter"
                onChangeText={text => setDescription(text)}
                value={description}
                style={[
                    {
                        height: 150,
                        width: '100%',
                        borderWidth: 0.5,
                        borderColor: '#000',
                        borderRadius: 8,
                        textAlignVertical: 'top',
                    },
                    keyboardVisible && { marginBottom: 180 },
                ]}
                onSubmitEditing={() => setDescription(text => text + '\n')}
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
            <View style={{ height: 60 }} />
        </KeyboardAvoidingView>
    );
}
