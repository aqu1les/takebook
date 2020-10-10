import React, { useMemo, useState, useRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Styles from './style';
import PageOne from './page-one';
import PageTwo from './page-two';
import PageThree from './page-three';
import ImageEditor from '../../../../services/ImageEditor';
import { createAdvert } from '../../../../services/AdvertsService';
import { useNavigation } from '@react-navigation/native';
import SuccessFeedback from '../../../core/success-feedback';
import { createFormData } from '../../../../services/FormDataService';

export default function NewBook(props) {
    const [cover, setCover] = useState(null);
    const [cover2, setCover2] = useState(null);
    const [cover3, setCover3] = useState(null);
    const [cover4, setCover4] = useState(null);
    const [cover5, setCover5] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [bookStatus, setBookStatus] = useState(1);
    const [bookCategories, setBookCategories] = useState([]);
    const [description, setDescription] = useState('');
    const navigation = useNavigation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

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

    const canSubmit = useMemo(() => {
        const filledCovers =
            [cover, cover2, cover3, cover4, cover5].filter((c) => c !== null)
                .length > 1;
        return !!(
            title &&
            author &&
            price &&
            [1, 2, 3].includes(bookStatus) &&
            bookCategories.length > 0 &&
            description &&
            filledCovers
        );
    }, [
        title,
        author,
        price,
        bookStatus,
        bookCategories,
        description,
        cover,
        cover2,
        cover3,
        cover4,
        cover5,
    ]);

    function handleCoverPicker(index) {
        ImagePicker.showImagePicker({ title: 'Camera' }, (response) => {
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
                    (path) => {
                        setCover({ ...cover, path });
                    },
                    onCancel,
                );

                break;
            case 2:
                ImageEditor(
                    cover2.path,
                    (path) => {
                        setCover2({ ...cover2, path });
                    },
                    onCancel,
                );

                break;
            case 3:
                ImageEditor(
                    cover3.path,
                    (path) => {
                        setCover3({ ...cover3, path });
                    },
                    onCancel,
                );

                break;
            case 4:
                ImageEditor(
                    cover4.path,
                    (path) => {
                        setCover4({ ...cover4, path });
                    },
                    onCancel,
                );

                break;
            case 5:
                ImageEditor(
                    cover5.path,
                    (path) => {
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

    function goToTop() {
        setCurrentStep(0);
    }

    function goToSecondSection() {
        setCurrentStep(1);
    }

    function goToThirdSection() {
        setCurrentStep(2);
    }

    function handleCheckBox(checked, category) {
        if (checked) {
            setBookCategories([...bookCategories, category]);
        } else {
            setBookCategories(
                bookCategories.filter((cat) => cat.id !== category.id),
            );
        }
    }

    async function handleSubmit() {
        const reqBody = {
            title: title,
            author: author,
            description: description,
            price: Number(price),
            condition_id: bookStatus,
            categories: bookCategories.map((c) => c.id),
            images: [],
        };
        const bookImages = [];
        [cover, cover2, cover3, cover4, cover5].forEach((image) => {
            if (image) {
                bookImages.push({
                    uri: image.uri,
                    type: image.type,
                    fileName: image.fileName,
                });
            }
            return;
        });
        const data = createFormData(bookImages, 'images', reqBody);

        try {
            const response = await createAdvert(data);
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
        }
    }

    function handleModalHide() {
        setShowSuccessModal(false);
        navigation.navigate('Home');
    }

    if (currentStep === 0) {
        return (
            <PageOne
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
        );
    }

    if (currentStep === 1) {
        return (
            <PageTwo
                goToTop={goToTop}
                goToSecondSection={goToSecondSection}
                goToThirdSection={goToThirdSection}
                setBookStatus={setBookStatus}
                bookStatus={bookStatus}
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                price={price}
                setPrice={setPrice}
            />
        );
    }

    if (currentStep === 2) {
        return (
            <>
                <PageThree
                    handleCheckBox={handleCheckBox}
                    goToSecondSection={goToSecondSection}
                    goToThirdSection={goToThirdSection}
                    description={description}
                    bookCategories={bookCategories}
                    setDescription={setDescription}
                    handleSubmit={handleSubmit}
                    canSubmit={canSubmit}
                />
                <SuccessFeedback
                    isVisible={showSuccessModal}
                    handleModalHide={handleModalHide}>
                    <Text style={Styles.TextH1}>Sucesso!</Text>
                    <Text style={Styles.TextP}>
                        O anúncio foi cadastrado com sucesso!
                    </Text>
                    <TouchableOpacity
                        style={Styles.ModalButton}
                        onPress={handleModalHide}>
                        <Text style={Styles.ButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </SuccessFeedback>
            </>
        );
    }
}
