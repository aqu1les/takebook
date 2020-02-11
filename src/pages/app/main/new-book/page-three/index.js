import React from 'react';
import { View, Text, TouchableOpacity, TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import CheckBox from '../check-box';

export default function PageThree({ pageThree, goToSecondSection, goToThirdSection, categories, handleCheckBox, description, bookCategories }) {
    return (
        <View style={Styles.PageThree} ref={pageThree} onLayout={() => { }}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>Em quais categorias ele se encaixa?</Text>
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
                <Icon name='chevron-up' size={32} color='#a5a5a5' />
            </TouchableOpacity>
            <Text>Descreva bem o seu livro, quanto mais detalhes melhor!</Text>
            <TextInput
                multiline
                blurOnSubmit
                returnKeyLabel='Publicar'
                returnKeyType='send'
                onChangeText={text => setDescription(text)}
                value={description}
                style={{ height: 150, width: '100%', borderWidth: 0.5, borderColor: '#000', borderRadius: 8 }}
                onBlur={goToThirdSection}
                onEndEditing={goToThirdSection}
            />

            <TouchableOpacity style={Styles.PostBookButton}>
                <Text style={Styles.PostBookText}>Publicar</Text>
            </TouchableOpacity>
        </View>
    );
}