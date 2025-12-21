import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';
import { Plants } from '../data/plants';
import { PlantCard } from '../components/PlantCard';

interface Props {
    navigation: StackNavigationProp<any>;
}

const Learn = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bibliothèque</Text>
                <Text style={styles.headerSubtitle}>Apprenez à reconnaître les maladies</Text>
            </View>
            <FlatList
                data={Plants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PlantCard
                        plant={item}
                        onPress={() => navigation.navigate('PlantDetail', { plant: item })}
                    />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: 20,
        backgroundColor: colors.surface,
        marginBottom: 10,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    headerSubtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: 5,
    },
    list: {
        padding: 16,
    },
});

export default Learn;
