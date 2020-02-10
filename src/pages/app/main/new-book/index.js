import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Picker, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNPhotoEditor } from 'react-native-photo-editor';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import CheckBox from './check-box';
import Cover from './cover';
import { getCategories } from '../../../../services/CategoriesService';

export default NewBook = props => {
    const [cover, setCover] = useState(null);
    const [cover2, setCover2] = useState(null);
    const [cover3, setCover3] = useState(null);
    const [cover4, setCover4] = useState(null);
    const [cover5, setCover5] = useState(null);
    const [bookStatus, setBookStatus] = useState(1);
    const [categories, setCategories] = useState([]);
    const [bookCategories, setBookCategories] = useState([]);
    const scrollView = useRef();
    const pageOne = useRef();
    const pageTwo = useRef();
    const pageThree = useRef();

    useEffect(() => {
        async function loadCategories() {
            const response = await getCategories();
            setCategories(response);
        }
        loadCategories();
    }, []);

    const previewCover = useMemo(
        () => (cover ? cover.path : null),
        [cover],
    );
    const previewCover2 = useMemo(
        () => (cover2 ? cover2.path : null),
        [cover2],
    );
    const previewCover3 = useMemo(
        () => (cover3 ? cover3.path : null),
        [cover3],
    );
    const previewCover4 = useMemo(
        () => (cover4 ? cover4.path : null),
        [cover4],
    );
    const previewCover5 = useMemo(
        () => (cover5 ? cover5.path : null),
        [cover5],
    );

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

    function handleEditImage(index) {
        switch (index) {
            case 1:
                RNPhotoEditor.Edit({
                    path: cover.path,
                    hiddenControls: ['draw', 'share', 'sticker', 'text'],
                    onDone: (path) => {
                        setCover({ ...cover, path });
                    },
                    onCancel: () => { return; }
                });
                break;
            case 2:
                RNPhotoEditor.Edit({
                    path: cover2.path,
                    hiddenControls: ['draw', 'share', 'sticker', 'text'],
                    onDone: (path) => {
                        setCover2({ ...cover2, path });
                    },
                    onCancel: () => { return; }
                });
                break;
            case 3:
                RNPhotoEditor.Edit({
                    path: cover3.path,
                    hiddenControls: ['draw', 'share', 'sticker', 'text'],
                    onDone: (path) => {
                        setCover3({ ...cover3, path });
                    },
                    onCancel: () => { return; }
                });
                break;
            case 4:
                RNPhotoEditor.Edit({
                    path: cover4.path,
                    hiddenControls: ['draw', 'share', 'sticker', 'text'],
                    onDone: (path) => {
                        setCover4({ ...cover4, path });
                    },
                    onCancel: () => { return; }
                });
                break;
            case 5:
                RNPhotoEditor.Edit({
                    path: cover5.path,
                    hiddenControls: ['draw', 'share', 'sticker', 'text'],
                    onDone: (path) => {
                        setCover5({ ...cover5, path });
                    },
                    onCancel: () => { return; },
                });
                break;
            default:
                break;
        }
    }

    function handleRemoveImage(index) {
        switch (index) {
            case 1:
                setCover(null);
                break;
            case 2:
                setCover2(null);
                break;
            case 3:
                setCover3(null);
                break;
            case 4:
                setCover4(null);
                break;
            case 5:
                setCover5(null);
                break;
            default:
                break;
        }
    }

    function goToSecondSection() {
        if (Platform.OS === 'android') {
            pageOne.current.measure((x, y, width, height, pageX, pageY) => {
                scrollView.current.scrollTo({
                    x: 0,
                    y: height,
                    animated: true,
                });
            });

        } else {
            pageTwo.current.measure((x, y, width, height) => {
                scrollView.current.scrollTo({
                    x: 0,
                    y: y,
                    animated: true,
                });
            });
        }
    }

    function goToThirdSection() {
        if (Platform.OS === 'android') {
            pageTwo.current.measureInWindow((x, y, width, height) => {
                scrollView.current.scrollTo({
                    x: 0,
                    y: height * 2,
                    animated: true,
                });
            });
        } else {
            pageThree.current.measure((x, y, width, height) => {
                scrollView.current.scrollTo({
                    x: 0,
                    y: y,
                    animated: true,
                });
            });
        }

    }

    function goToTop() {
        scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    function handleCheckBox(checked, category) {
        if (checked) {
            setBookCategories([...bookCategories, category]);
        } else {
            setBookCategories(
                bookCategories.filter(cat => cat.id !== category.id),
            );
        }
    }

    return (
        <View style={Styles.Container}>
            <ScrollView
                ref={scrollView}
                style={Styles.CardScrollView}
                contentContainerStyle={Styles.CardContainer}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={Styles.PageOne} ref={pageOne} onLayout={() => { }}>
                    <Text style={Styles.HeadingText}>Selecione as fotos</Text>
                    <ScrollView
                        horizontal={true}
                        style={{ height: 230, maxHeight: 230 }}
                        contentContainerStyle={Styles.CoverContainer}
                        alwaysBounceHorizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <Cover
                            previewCover={previewCover}
                            handleCoverPicker={() => handleCoverPicker(1)}
                            handleEditImage={() => handleEditImage(1)}
                            handleRemoveImage={() => handleRemoveImage(1)}
                        />
                        <Cover
                            previewCover={previewCover2}
                            handleCoverPicker={() => handleCoverPicker(2)}
                            handleEditImage={() => handleEditImage(2)}
                            handleRemoveImage={() => handleRemoveImage(2)}
                        />
                        <Cover
                            previewCover={previewCover3}
                            handleCoverPicker={() => handleCoverPicker(3)}
                            handleEditImage={() => handleEditImage(3)}
                            handleRemoveImage={() => handleRemoveImage(3)}
                        />
                        <Cover
                            previewCover={previewCover4}
                            handleCoverPicker={() => handleCoverPicker(4)}
                            handleEditImage={() => handleEditImage(4)}
                            handleRemoveImage={() => handleRemoveImage(4)}
                        />
                        <Cover
                            previewCover={previewCover5}
                            handleCoverPicker={() => handleCoverPicker(5)}
                            handleEditImage={() => handleEditImage(5)}
                            handleRemoveImage={() => handleRemoveImage(5)}
                        />
                    </ScrollView>
                    <Text style={Styles.TextCenter}>
                        Clique nos campos para as adicionar fotos desejadas
                    </Text>
                    <Text style={Styles.TextCenter}>
                        * Arraste para esquerda caso queira adicionar mais fotos
                        para o seu anúncio
                    </Text>
                    <TouchableOpacity
                        style={Styles.NextSectionButton}
                        onPress={goToSecondSection}>
                        <Icon name="chevron-down" size={32} color="#a5a5a5" />
                    </TouchableOpacity>
                </View>
                <View style={Styles.PageTwo} ref={pageTwo} onLayout={() => { }}>
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
                        <TextInput placeholder="Qual o título do livro?" />
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.FormGroup}>
                        <TextInput placeholder="E o autor?" />
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
                            <Text>Qual o estado do livro?</Text>
                            <Picker
                                selectedValue={bookStatus}
                                onValueChange={value => setBookStatus(value)}
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
                        <TouchableOpacity style={{
                            flexDirection: 'column',
                            height: '100%',
                            paddingHorizontal: 5,
                            justifyContent: 'space-between',
                        }}>
                            <Text>Quanto quer por ele?</Text>
                            <TextInput placeholder="R$ 928" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={Styles.NextSectionButton}
                        onPress={goToThirdSection}>
                        <Icon name="chevron-down" size={32} color="#a5a5a5" />
                    </TouchableOpacity>
                </View>
                <View style={Styles.PageThree} ref={pageThree} onLayout={() => { }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center' }}>Em quais categorias ele se encaixa?</Text>
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
                    <Text>Onde seu livro está?</Text>

                    <TouchableOpacity style={Styles.PostBookButton}>
                        <Text style={Styles.PostBookText}>Publicar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
