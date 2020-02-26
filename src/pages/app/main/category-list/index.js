import React, { memo } from 'react';
import { View, FlatList } from 'react-native';
import CategoryItem from './category-item';
import Styles from './style';

function CategoryList({ categories }) {
    function renderSeparator() {
        return <View style={Styles.Separator} />;
    }

    return (
        <View style={Styles.Categories}>
            <FlatList
                data={[{ name: 'Destaques' }, ...categories]}
                renderItem={({ item }) => <CategoryItem name={item.name} />}
                keyExtractor={item => item.name}
                horizontal={true}
                contentContainerStyle={{
                    justifyContent: 'space-around',
                    width: '100%',
                }}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    );
}

export default memo(CategoryList);
