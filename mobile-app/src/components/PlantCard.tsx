import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export interface Plant {
    id: string;
    name: string;
    image: string; // URL or local require
    description: string;
    modelAvailable: boolean;
}

interface PlantCardProps {
    plant: Plant;
    onPress: () => void;
}

export const PlantCard = ({ plant, onPress }: PlantCardProps) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            {/* Container for Image to handle overflow */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: plant.image }} style={styles.image} resizeMode="cover" />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{plant.name}</Text>
                    {plant.modelAvailable ? (
                        <View style={styles.badgeAvailable}>
                            <Text style={styles.badgeText}>Dispo</Text>
                        </View>
                    ) : (
                        <View style={styles.badgeDev}>
                            <Text style={styles.badgeText}>Dev</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                    {plant.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        overflow: 'hidden',
        flexDirection: 'row',
        height: 120,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    imageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        padding: 14,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
        flex: 1,
    },
    description: {
        fontSize: 13,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    badgeAvailable: {
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeDev: {
        backgroundColor: '#FF9800', // Orange for Dev
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    }
});
