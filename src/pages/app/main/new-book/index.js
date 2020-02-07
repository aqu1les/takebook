import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Picker, CheckBox } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from './style';
import { getCategories } from '../../../../services/CategoriesService';
import { getInfoByCEP } from '../../../../services/IBGEService';

export default NewBook = props => {
    const [cover, setCover] = useState(null);
    const [cover2, setCover2] = useState(null);
    const [cover3, setCover3] = useState(null);
    const [cover4, setCover4] = useState(null);
    const [cover5, setCover5] = useState(null);
    const [bookStatus, setBookStatus] = useState(1);
    const [categories, setCategories] = useState([]);
    const [bookCategories, setBookCategories] = useState([]);
    const [cep, setCep] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const scrollView = useRef(null);

    useEffect(() => {
        async function loadCategories() {
            const response = await getCategories();
            setCategories(response);
        }
        loadCategories();
    }, []);

    const previewCover = useMemo(() => (cover ? 'data:image/jpeg;base64,' + cover.data : null), [cover]);
    const previewCover2 = useMemo(() => (cover2 ? 'data:image/jpeg;base64,' + cover2.data : null), [cover2]);
    const previewCover3 = useMemo(() => (cover3 ? 'data:image/jpeg;base64,' + cover3.data : null), [cover3]);
    const previewCover4 = useMemo(() => (cover4 ? 'data:image/jpeg;base64,' + cover4.data : null), [cover4]);
    const previewCover5 = useMemo(() => (cover5 ? 'data:image/jpeg;base64,' + cover5.data : null), [cover5]);

    function handleCoverPicker(index) {
        ImagePicker.showImagePicker({ title: 'Camera' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton,
                );
            } else {
                switch (index) {
                    case 1:
                        setCover(response);
                        return;
                    case 2:
                        setCover2(response);
                        return;
                    case 3:
                        setCover3(response);
                        return;
                    case 4:
                        setCover4(response);
                        return;
                    case 5:
                        setCover5(response);
                        return;
                    default:
                        break;
                }
            }
        });
    }

    function goToSecondSection() {
        scrollView.current.scrollTo({ x: 0, y: 600, animated: true });
    }

    function goToThirdSection() {
        scrollView.current.scrollTo({ x: 0, y: 1180, animated: true });
    }

    function goToTop() {
        scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    function handleCheckBox(checked, category) {
        if (checked) {
            setBookCategories([...bookCategories, category]);
        } else {
            setBookCategories(bookCategories.filter(cat => cat.id !== category.id));
        }
        console.log(bookCategories)
    }

    async function handleCepChange(value) {
        if (value.length === 5) {
            setCep(value + '-');
        } else if (value.length < 5) {
            setCep(value.replace('-', ''));
        } else {
            setCep(value);
            if (value.length === 9) {
                const addressInfo = await getInfoByCEP(value);
                setCity(addressInfo.localidade);
                setState(addressInfo.uf);
                setNeighborhood(addressInfo.bairro);
            }
        }
    }

    return (
        <View style={Style.Container}>
            <ScrollView
                ref={scrollView}
                style={Style.CardScrollView}
                contentContainerStyle={Style.CardContainer}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={Style.PageOne}>
                    <Text style={Style.HeadingText}>Selecione as fotos</Text>
                    <ScrollView
                        horizontal={true}
                        style={{ height: 230, maxHeight: 230 }}
                        contentContainerStyle={Style.CoverContainer}
                        alwaysBounceHorizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {cover ? <Image source={{ uri: previewCover }} style={Style.Cover} /> :
                            <View
                                style={[Style.Cover, Style.ImageHolder]}
                                onTouchEnd={() => handleCoverPicker(1)}>
                            </View>
                        }
                        {cover2 ? <Image source={{ uri: previewCover2 }} style={Style.Cover} /> :
                            <View
                                style={[Style.Cover, Style.ImageHolder]}
                                onTouchEnd={() => handleCoverPicker(2)}>
                            </View>
                        }
                        {cover3 ? <Image source={{ uri: previewCover3 }} style={Style.Cover} /> :
                            <View
                                style={[Style.Cover, Style.ImageHolder]}
                                onTouchEnd={() => handleCoverPicker(3)}>
                            </View>
                        }
                        {cover4 ? <Image source={{ uri: previewCover4 }} style={Style.Cover} /> :
                            <View
                                style={[Style.Cover, Style.ImageHolder]}
                                onTouchEnd={() => handleCoverPicker(4)}>
                            </View>
                        }
                        {cover5 ? <Image source={{ uri: previewCover5 }} style={Style.Cover} /> :
                            <View
                                style={[Style.Cover, Style.ImageHolder]}
                                onTouchEnd={() => handleCoverPicker(5)}>
                            </View>
                        }
                    </ScrollView>
                    <Text style={{ textAlign: 'center' }}>
                        Clique nos campos para adicionar a capa e a contra capa
                        respectivamente
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                        * Arraste para esquerda caso queira adicionar mais fotos para o seu anúncio
                    </Text>
                    <TouchableOpacity style={Style.NextSectionButton} onPress={goToSecondSection}>
                        <Icon name='chevron-down' size={32} color='#a5a5a5' />
                    </TouchableOpacity>
                </View>
                <View style={Style.PageTwo}>
                    <TouchableOpacity style={Style.PreviousSectionButton} onPress={goToTop}>
                        <Icon name='chevron-up' size={32} color='#a5a5a5' />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>Me fale sobre seu livro...</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>Lembre-se!</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 30 }}>Um livro bem descrito é mais facilmente encontrado numa pesquisa.</Text>
                    <TouchableOpacity style={Style.FormGroup}>
                        <TextInput placeholder='Qual o título do livro?' />
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.FormGroup}>
                        <TextInput placeholder='E o autor?' />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={Style.FormGroupColumn}>
                            <Text>Qual o estado do livro?</Text>
                            <Picker selectedValue={bookStatus} onValueChange={value => setBookStatus(value)} style={{ height: 50, width: 100 }}>
                                <Picker.Item label='Novo' value='1' />
                                <Picker.Item label='Usado' value='2' />
                            </Picker>
                        </TouchableOpacity>
                        <TouchableOpacity style={Style.FormGroupColumn}>
                            <Text>Quanto quer por ele?</Text>
                            <TextInput placeholder='R$ 928' />
                        </TouchableOpacity>
                    </View>
                    <Text>Em quais categorias ele se encaixa?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {categories.map((category) => (
                            <TouchableOpacity key={category.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <CheckBox value={bookCategories.findIndex(c => c.id === category.id) !== -1 ? true : false} onValueChange={(v) => handleCheckBox(v, category)} />
                                <Text>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={Style.NextSectionButton} onPress={goToThirdSection}>
                        <Icon name='chevron-down' size={32} color='#a5a5a5' />
                    </TouchableOpacity>
                </View>
                <View style={Style.PageThree}>
                    <TouchableOpacity style={Style.PreviousSectionButton} onPress={goToSecondSection}>
                        <Icon name='chevron-up' size={32} color='#a5a5a5' />
                    </TouchableOpacity>
                    <Text>Onde seu livro está?</Text>
                    <View style={Style.Row}>
                        <TouchableOpacity style={Style.FormGroup}>
                            <TextInput placeholder='CEP' value={cep} onChangeText={handleCepChange} maxLength={9} />
                        </TouchableOpacity>
                        <TouchableOpacity style={Style.FormGroup}>
                            <TextInput placeholder='Bairro' value={neighborhood} editable={false} />
                        </TouchableOpacity>
                    </View>
                    <View style={Style.Row}>
                        <TouchableOpacity style={Style.FormGroup}>
                            <TextInput placeholder='Cidade' value={city} editable={false} />
                        </TouchableOpacity>
                        <TouchableOpacity style={Style.FormGroup}>
                            <TextInput placeholder='Estado' value={state} editable={false} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={Style.PostBookButton}>
                        <Text style={Style.PostBookText}>Publicar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
