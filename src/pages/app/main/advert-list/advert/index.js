import React, { useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Badge } from 'native-base';
import Styles from './style';
import defaultBook from '../../../../../assets/bookDefault.jpg';
import LikeButton from '../../../components/like-button';
import { handleLikeAction } from '../../../../../redux/actions/fav';
import FastImage from 'react-native-fast-image';

function Advert({ item, navigation, owner, user, liked }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
        id,
        title,
        price,
        author,
        categories,
        condition_id,
        covers_url,
        approved_at,
    } = item;
    const animation = useRef();
    let condition;
    let badgeColor;

    switch (condition_id) {
        case 1:
            condition = t('advertList.advert.new');
            badgeColor = '#00cc09';
            break;
        case 2:
            condition = t('advertList.advert.semi');
            badgeColor = '#38c2ff';
            break;
        case 3:
            condition = t('advertList.advert.used');
            badgeColor = '#ff3d00';
            break;
        default:
            break;
    }

    function handleClick() {
        navigation.navigate('AdvertDetails', {
            advert: item,
            liked,
            logged_user: user,
        });
    }

    async function handleLike() {
        dispatch(handleLikeAction(id));
    }

    return (
        <TouchableOpacity
            style={Styles.Card}
            activeOpacity={0.8}
            onPress={handleClick}>
            <View style={Styles.Cover}>
                <FastImage
                    source={
                        covers_url.length > 0
                            ? { uri: covers_url[0].url }
                            : defaultBook
                    }
                    style={Styles.ImgCover}
                />
            </View>
            <View style={Styles.Infos}>
                <Text style={Styles.Title}>{title}</Text>
                <Text style={Styles.Author}>
                    <Text
                        style={[
                            Styles.Author,
                            { fontSize: 14, color: '#555', fontWeight: 'bold' },
                        ]}>
                        {t('advertList.advert.author') + ': '}
                    </Text>
                    {author}
                </Text>
                <View style={Styles.Categories}>
                    {categories.map(({ id, name }) => (
                        <Text key={id} style={Styles.TextCategory}>
                            {name}
                        </Text>
                    ))}
                </View>
                <View style={Styles.Details}>
                    <Badge
                        style={[Styles.Badge, { backgroundColor: badgeColor }]}>
                        <Text style={Styles.Condition}>{condition}</Text>
                    </Badge>
                    <View style={Styles.Row}>
                        <Text style={Styles.TextCategory}>
                            {t('advertList.advert.locale')}:{' '}
                        </Text>
                        <Text style={Styles.Locale}>
                            {owner.address_city} - {owner.address_state}
                        </Text>
                    </View>
                </View>
                <View style={Styles.PriceButton}>
                    <Text style={Styles.Price}>R$ {String(price)}</Text>
                </View>
                <LikeButton
                    refProp={animation}
                    liked={liked}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    onPress={handleLike}
                />
                <Text style={Styles.CreationTime}>
                    {formatDistance(new Date(approved_at), Date.now(), {
                        addSuffix: true,
                        locale: pt,
                    })}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default memo(Advert);
