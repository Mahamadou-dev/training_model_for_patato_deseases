import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

const About = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>À propos d'AgriScan</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vision et Mission</Text>
                    <Text style={styles.text}>
                        AgriScan est une application conçue pour accompagner les agriculteurs nigériens dans la protection de leurs cultures.
                        Notre mission est de rendre le diagnostic des maladies des plantes accessible, rapide et simple.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Développé par</Text>
                    <Text style={styles.text}>GremahTech</Text>
                    <Text style={styles.subText}>Solutions technologiques à Zinder</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Version</Text>
                    <Text style={styles.text}>1.0.0 (Beta)</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 20,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 25,
        backgroundColor: colors.surface, // Was cardBackground, assumed same or similar
        padding: 15,
        borderRadius: 12,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    subText: {
        fontSize: 14,
        color: colors.secondary, // Might need check, assuming colors has this or primary
        marginTop: 5,
        fontStyle: 'italic',
    }
});

export default About;
