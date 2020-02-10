import React from 'react';
import { SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import Styles from './style';
import LoadingBook from '../../../../assets/animations/loading-book.json';

export default function Loading() {
    return (
        <SafeAreaView style={Styles.LoadingContainer}>
            <LottieView source={LoadingBook} loop autoPlay />
        </SafeAreaView>
    );
}