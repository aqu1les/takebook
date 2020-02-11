import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Picker, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';

export default function PageTwo({ goToTop, goToSecondSection, goToThirdSection, setBookStatus, bookStatus, pageTwo }) {
    return (
        <View style={Styles.PageTwo} ref={pageTwo} onLayout={() => { }}>
            <TouchableOpacity
                style={Styles.PreviousSectionButton}
                onPress={goToTop}>
                <Icon name='chevron-up' size={32} color='#a5a5a5' />
            </TouchableOpacity>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>
                Me fale sobre seu livro...
                    </Text>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                Lembre-se:
                    </Text>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 16,
                    marginHorizontal: 30,
                }}>
                Um livro bem descrito é mais facilmente encontrado numa
                pesquisa.
                    </Text>
            <TouchableOpacity style={Styles.FormGroup}>
                <TextInput placeholder='Qual o título do livro?' onBlur={goToSecondSection} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.FormGroup}>
                <TextInput placeholder='E o autor?' onBlur={goToSecondSection} />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    height: 54
                }}>
                <View
                    style={{
                        flexDirection: 'column',
                        width: '50%',
                        height: '100%',
                    }}>
                    <Text>Defina a condição do livro</Text>
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
                        <Picker.Item label='Novo' value='1' />
                        <Picker.Item label='Usado' value='2' />
                    </Picker>
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'column',
                    height: '100%',
                    paddingHorizontal: 5,
                    justifyContent: 'space-between',
                }}>
                    <Text>Quanto quer por ele?</Text>
                    <TextInput placeholder='R$ 928' />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={Styles.NextSectionButton}
                onPress={goToThirdSection}>
                <Icon name='chevron-down' size={32} color='#a5a5a5' />
            </TouchableOpacity>
        </View>
    );
}



