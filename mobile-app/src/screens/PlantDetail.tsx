import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
    route: RouteProp<any, 'PlantDetail'>;
    navigation: StackNavigationProp<any>;
}

const { width } = Dimensions.get('window');

const PlantDetail = ({ route, navigation }: Props) => {
    const { plant } = route.params;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image source={{ uri: plant.image }} style={styles.image} resizeMode="cover" />

            <View style={styles.details}>
                <Text style={styles.name}>{plant.name}</Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.text}>{plant.description}</Text>
                </View>

                {plant.diseases.length > 0 ? (
                    <View>
                        <Text style={styles.sectionHeader}>Maladies Communes</Text>
                        {plant.diseases.map((disease: any, index: number) => (
                            <View key={index} style={styles.diseaseCard}>
                                <Text style={styles.diseaseName}>{disease.name}</Text>

                                <Text style={styles.label}>Symptômes :</Text>
                                <Text style={styles.text}>{disease.symptoms}</Text>

                                <Text style={styles.label}>Traitement :</Text>
                                <Text style={styles.text}>{disease.treatment}</Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Aucune maladie majeure répertoriée pour le moment dans notre base.</Text>
                    </View>
                )}

                <PrimaryButton title="Retour" onPress={() => navigation.goBack()} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        height: 250,
    },
    details: {
        padding: 20,
        marginTop: -20, // Overlap effect
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 10,
    },
    sectionHeader: { // Outside card
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginTop: 10,
        marginBottom: 15,
    },
    diseaseCard: {
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: colors.error,
    },
    diseaseName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.error,
        marginBottom: 12,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 8,
        color: colors.textPrimary,
    },
    text: {
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    emptyState: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontStyle: 'italic',
        color: colors.textSecondary,
    }
});

export default PlantDetail;
