import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Styles from './style';
import PageOne from './page-one';
import PageTwo from './page-two';
import PageThree from './page-three';
import ImageEditor from '../../../../services/ImageEditor';

export default NewBook = props => {
    const [cover, setCover] = useState(null);
    const [cover2, setCover2] = useState(null);
    const [cover3, setCover3] = useState(null);
    const [cover4, setCover4] = useState(null);
    const [cover5, setCover5] = useState(null);
    const [bookStatus, setBookStatus] = useState(1);
    const [bookCategories, setBookCategories] = useState([]);
    const [description, setDescription] = useState('');
    const scrollView = useRef();
    const pageOne = useRef();
    const pageTwo = useRef();
    const pageThree = useRef();

    const previewCover = useMemo(() => (cover ? cover.path : null), [cover]);
    const previewCover2 = useMemo(() => (cover2 ? cover2.path : null), [
        cover2,
    ]);
    const previewCover3 = useMemo(() => (cover3 ? cover3.path : null), [
        cover3,
    ]);
    const previewCover4 = useMemo(() => (cover4 ? cover4.path : null), [
        cover4,
    ]);
    const previewCover5 = useMemo(() => (cover5 ? cover5.path : null), [
        cover5,
    ]);

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
        function onCancel() {
            return;
        }
        switch (index) {
            case 1:
                ImageEditor(
                    cover.path,
                    path => {
                        setCover({ ...cover, path });
                    },
                    onCancel,
                );

                break;
            case 2:
                ImageEditor(
                    cover2.path,
                    path => {
                        setCover2({ ...cover2, path });
                    },
                    onCancel,
                );

                break;
            case 3:
                ImageEditor(
                    cover3.path,
                    path => {
                        setCover3({ ...cover3, path });
                    },
                    onCancel,
                );

                break;
            case 4:
                ImageEditor(
                    cover4.path,
                    path => {
                        setCover4({ ...cover4, path });
                    },
                    onCancel,
                );

                break;
            case 5:
                ImageEditor(
                    cover5.path,
                    path => {
                        setCover5({ ...cover5, path });
                    },
                    onCancel,
                );

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
                <PageOne
                    pageOne={pageOne}
                    goToSecondSection={goToSecondSection}
                    previewCover={previewCover}
                    previewCover2={previewCover2}
                    previewCover3={previewCover3}
                    previewCover4={previewCover4}
                    previewCover5={previewCover5}
                    handleCoverPicker={handleCoverPicker}
                    handleEditImage={handleEditImage}
                    handleRemoveImage={handleRemoveImage}
                />
                <PageTwo
                    pageTwo={pageTwo}
                    goToTop={goToTop}
                    goToSecondSection={goToSecondSection}
                    goToThirdSection={goToThirdSection}
                    setBookStatus={setBookStatus}
                    bookStatus={bookStatus}
                />
                <PageThree
                    scrollView={scrollView}
                    handleCheckBox={handleCheckBox}
                    goToSecondSection={goToSecondSection}
                    goToThirdSection={goToThirdSection}
                    pageThree={pageThree}
                    description={description}
                    bookCategories={bookCategories}
                    setDescription={setDescription}
                />
            </ScrollView>
        </View>
    );
};
