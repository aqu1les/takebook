import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native';
// import { Container } from './style';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default RoomList = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <View style={{ overflow: 'hidden' }}>
            <TouchableOpacity
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Properties.scaleXY);
                    setExpanded(v => !v);
                }}>
                <Text>
                    Press me to {expanded ? 'collapse' : 'expand'}!
            </Text>
            </TouchableOpacity>
            {expanded && <Text>I disappear sometimes!</Text>}
        </View>
    );
};