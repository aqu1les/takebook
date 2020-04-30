import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Picker } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';

export default function PageTwo({
    goToTop,
    goToSecondSection,
    goToThirdSection,
    setBookStatus,
    bookStatus,
    pageTwo,
}) {
    const { t } = useTranslation();
    return (
        <View style={Styles.PageTwo} ref={pageTwo} onLayout={() => {}}>
            <TouchableOpacity
                style={Styles.PreviousSectionButton}
                onPress={goToTop}>
                <Icon name="chevron-up" size={32} color="#a5a5a5" />
            </TouchableOpacity>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>
                {t('newBook.pageTwo.help1')}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                {t('newBook.pageTwo.remember')}:
            </Text>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 16,
                    marginHorizontal: 30,
                }}>
                {t('newBook.pageTwo.help2')}
            </Text>
            <TouchableOpacity style={Styles.FormGroup}>
                <TextInput
                    placeholder={t('newBook.pageTwo.title')}
                    onBlur={goToSecondSection}
                />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.FormGroup}>
                <TextInput
                    placeholder={t('newBook.pageTwo.author')}
                    onBlur={goToSecondSection}
                />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    height: 54,
                }}>
                <View
                    style={{
                        flexDirection: 'column',
                        width: '50%',
                        height: '100%',
                    }}>
                    <Text>{t('newBook.pageTwo.bookStatus')}</Text>
                    <Picker
                        selectedValue={bookStatus}
                        onValueChange={value => setBookStatus(value)}
                        onBlur={goToSecondSection}
                        style={{
                            height: 54,
                            width: '100%',
                            padding: 0,
                            margin: 0,
                            borderWidth: 1,
                            borderColor: '#000',
                        }}>
                        <Picker.Item label="Novo" value="1" />
                        <Picker.Item label="Usado" value="2" />
                    </Picker>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'column',
                        height: '100%',
                        paddingHorizontal: 5,
                        justifyContent: 'space-between',
                    }}>
                    <Text>{t('newBook.pageTwo.howMuch')}</Text>
                    <TextInput placeholder="R$ 928" />
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
