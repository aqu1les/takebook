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
                    onChangeText={(t) => setTitle(t)}
                    style={{ flex: 1 }}
                    maxLength={36}
                />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.FormGroup}>
                <TextInput
                    placeholder={t('newBook.pageTwo.author')}
                    onBlur={goToSecondSection}
                    value={author}
                    onChangeText={(t) => setAuthor(t)}
                    style={{ flex: 1 }}
                    maxLength={24}
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
                        onValueChange={(value) => setBookStatus(value)}
                        onBlur={goToSecondSection}
                        style={{
                            height: 54,
                            width: '100%',
                            padding: 0,
                            margin: 0,
                            borderWidth: 1,
                            borderColor: '#000',
                        }}>
                        <Picker.Item label="Novo" value={1} />
                        <Picker.Item label="Semi Novo" value={2} />
                        <Picker.Item label="Usado" value={3} />
                    </Picker>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'column',
                        height: '100%',
                        paddingHorizontal: 5,
                        justifyContent: 'space-between',
                        width: '50%',
                    }}>
                    <Text>{t('newBook.pageTwo.howMuch')}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 'auto',
                            width: '100%',
                        }}>
                        <Text
                            style={{
                                height: 35,
                                width: '10%',
                                marginTop: 15,
                            }}>
                            R$
                        </Text>
                        <TextInput
                            placeholder="150"
                            value={price}
                            onChangeText={(t) => setPrice(t)}
                            keyboardType="numeric"
                            style={{
                                height: 35,
                                width: '60%',
                                marginLeft: 'auto',
                                marginRight: 18,
                                marginTop: 5,
                                textAlign: 'right',
                                borderBottomColor: '#e5e5e5',
                                borderBottomWidth: 1,
                            }}
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
