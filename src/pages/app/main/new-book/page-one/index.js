import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import Cover from './cover';

export default function PageOne({
    goToSecondSection,
    previewCover,
    previewCover2,
    previewCover3,
    previewCover4,
    previewCover5,
    handleCoverPicker,
    handleEditImage,
    handleRemoveImage,
}) {
    const { t } = useTranslation();

    return (
        <View style={Styles.PageOne}>
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
            <Text style={Styles.TextCenter}>{t('newBook.pageOne.help1')}</Text>
            <Text style={Styles.TextCenter}>{t('newBook.pageOne.help2')}</Text>
            <Text style={Styles.TextCenter}>{t('newBook.pageOne.help3')}</Text>
            <TouchableOpacity
                style={Styles.NextSectionButton}
                onPress={goToSecondSection}>
                <Icon name="chevron-down" size={32} color="#a5a5a5" />
            </TouchableOpacity>
        </View>
    );
}
