import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Like from '../../../../assets/animations/like.json';
import Styles from './style';

export default function LikeButton({ liked, style, onPress }) {
    const animation = useRef();

    function handleLikeAnimation() {
        if (!liked) {
            animation.current.play();
        }
        return onPress();
    }

    return (
        <TouchableOpacity style={[style, Styles.Icon]} onPress={handleLikeAnimation}>
            <LottieView ref={animation} source={Like} progress={liked ? 1 : 0} loop={false} colorFilters={[{
                keypath: "Heart Hollow",
                color: "#F95959"
            }]} />
        </TouchableOpacity>
    );
}
