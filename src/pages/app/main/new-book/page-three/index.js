import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import CheckBox from '../check-box';

export default function PageThree({
    scrollView,
    pageThree,
    goToSecondSection,
    goToThirdSection,
    handleCheckBox,
    description,
    setDescription,
    bookCategories,
}) {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const categories = useSelector(state => state.categories.data);

    Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
        pageThree.current.measure((x, y, width, height) => {
            scrollView.current.scrollTo({
                x: 0,
                y: y,
                animated: true,
            });
        });
    });
    return (
        <View style={Styles.PageThree} ref={pageThree} onLayout={() => {}}>
            <View
                style={[
                    { flexDirection: 'column' },
                    keyboardVisible && { display: 'none' },
                ]}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                    Em quais categorias ele se encaixa?
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
            <Text>Descreva bem o seu livro, quanto mais detalhes melhor!</Text>
            <TextInput
                multiline
                blurOnSubmit
                returnKeyLabel="Publicar"
                returnKeyType="send"
                onChangeText={text => setDescription(text)}
                value={description}
                style={{
                    height: 150,
                    width: '100%',
                    borderWidth: 0.5,
                    borderColor: '#000',
                    borderRadius: 8,
                }}
                onBlur={goToThirdSection}
                onEndEditing={goToThirdSection}
            />

            <TouchableOpacity style={Styles.PostBookButton}>
                <Text style={Styles.PostBookText}>Publicar</Text>
            </TouchableOpacity>
            <View style={{ height: 60 }} />
        </View>
    );
}
