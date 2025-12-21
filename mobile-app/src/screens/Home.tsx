import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
    navigation: StackNavigationProp<any>;
}

const Home = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.title}>AgriScan</Text>
                <Text style={styles.subtitle}>Protégez vos cultures</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.welcomeCard}>
                    <Text style={styles.welcomeTitle}>Bienvenue ! 👋</Text>
                    <Text style={styles.welcomeText}>
                        Scannez vos plantes pour détecter les maladies précocement et obtenir des conseils de traitement adaptés au Niger.
                    </Text>
                </View>

                <View style={styles.actions}>
                    <Text style={styles.sectionTitle}>Que voulez-vous faire ?</Text>

                    <PrimaryButton
                        title="📸 Scanner une Plante"
                        onPress={() => navigation.navigate('Scan')}
                        style={styles.scanButton}
                    />

                    <PrimaryButton
                        title="📚 Apprendre (Plantes)"
                        onPress={() => navigation.navigate('Learn')}
                        style={styles.learnButton}
                    />

                    <PrimaryButton
                        title="ℹ️ À propos"
                        onPress={() => navigation.navigate('About')}
                        style={styles.secondaryButton}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.textLight,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        fontStyle: 'italic',
    },
    content: {
        padding: 24,
    },
    welcomeCard: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    welcomeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    actions: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 15,
    },
    scanButton: {
        backgroundColor: colors.primary,
        marginBottom: 10,
    },
    learnButton: {
        backgroundColor: colors.primary,
        marginBottom: 10,
    },
    secondaryButton: { // Style override for secondary actions
        backgroundColor: colors.secondary,
        marginTop: 10,
    },
});

export default Home;
