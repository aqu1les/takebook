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
}) {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const categories = useSelector(state => state.categories.data);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            goToThirdSection();
        });
        return () => {
            console.log('removed listener');
            Keyboard.removeListener('keyboardDidShow');
            Keyboard.removeListener('keyboardDidHide');
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={Styles.PageThree}
            ref={pageThree}
            onLayout={() => {}}>
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
                blurOnSubmit={false}
                returnKeyLabel="Enter"
                onChangeText={text => setDescription(text)}
                value={description}
                style={{
                    height: 150,
                    width: '100%',
                    borderWidth: 0.5,
                    borderColor: '#000',
                    borderRadius: 8,
                }}
                onSubmitEditing={() => setDescription(text => text + '\n')}
            />

            <TouchableOpacity style={Styles.PostBookButton}>
                <Text style={Styles.PostBookText}>Publicar</Text>
            </TouchableOpacity>
            <View style={{ height: 60 }} />
        </KeyboardAvoidingView>
    );
}
