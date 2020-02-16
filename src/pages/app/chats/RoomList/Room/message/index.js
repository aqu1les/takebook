import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import Styles from './style';
import { format } from 'date-fns';

export default function Message({ item, loggedUser }) {

    return (
        <TouchableOpacity style={[Styles.Message, loggedUser.id === item.user_id ? Styles.MyMessage : Styles.NotMyMessage]}>
            <Text style={Styles.Text}>{item.message}</Text>
            <Text style={Styles.CreationTime}>
                {format(new Date(item.created_at), 'HH:mm')}
            </Text>
        </TouchableOpacity>
    );
}