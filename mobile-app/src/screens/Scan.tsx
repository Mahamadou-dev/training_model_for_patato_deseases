import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { Plants } from '../data/plants';
import PermissionsService from '../services/PermissionsService';
import { Config } from '../config';

const { width } = Dimensions.get('window');

// @ts-ignore
const Scan = ({ navigation }: { navigation: any }) => {
    const [step, setStep] = useState('select'); // select, type, result
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSelectPlant = (plant: any) => {
        setSelectedPlant(plant);
        setStep('type');
    };

    const handleImagePicker = async (type: string) => {
        const hasPermission =
            type === 'camera'
                ? await PermissionsService.hasCameraPermission()
                : await PermissionsService.hasPhotoPermission();

        if (!hasPermission) {
            Alert.alert(
                'Permission refusée',
                'Nous avons besoin de la permission pour accéder à la caméra ou à la galerie.',
            );
            return;
        }

        const options = {
            mediaType: 'photo',
            quality: 0.8,
        };

        const callback = (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('Erreur', 'Impossible de récupérer l\'image.');
            } else {
                const uri = response.assets && response.assets.length > 0
                    ? response.assets[0].uri
                    : response.uri;

                if (uri) {
                    setImageUri(uri);
                }
            }
        };

        if (type === 'camera') {
            launchCamera(options, callback);
        } else {
            launchImageLibrary(options, callback);
        }
    };

    const analyzeImage = async () => {
        if (!imageUri || !selectedPlant) return;

        setLoading(true);

        // API INTEGRATION for Potato
        if (selectedPlant.id === 'potato') {
            try {
                const formData = new FormData();
                formData.append('file', {
                    uri: imageUri,
                    type: 'image/jpeg', // Adjust if needed, usually jpeg/png
                    name: 'upload.jpg',
                });



                // ...

                const response = await fetch(Config.API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Erreur serveur: ${response.status}`);
                }

                const data = await response.json();
                console.log('API Response:', data);

                let detectedDisease = null;

                // Map API class to our internal data
                // API classes: "Late Blight", "Early Blight", "Healthy"
                if (data.class === 'Late Blight') {
                    detectedDisease = selectedPlant.diseases.find(d => d.name.includes('Mildiou'));
                } else if (data.class === 'Early Blight') {
                    detectedDisease = selectedPlant.diseases.find(d => d.name.includes('Alternariose'));
                } else if (data.class === 'Healthy') {
                    detectedDisease = {
                        name: 'PLANTE SAINE 🌿',
                        symptoms: 'Aucun signe de maladie détecté.',
                        treatment: 'Continuez les bonnes pratiques de culture !',
                        isHealthy: true
                    };
                } else {
                    // Fallback for unknown class
                    detectedDisease = {
                        name: data.class,
                        symptoms: 'Maladie non répertoriée dans la base locale.',
                        treatment: 'Consultez un agronome.',
                        confidence: data.confidence
                    };
                }

                setResult({
                    ...detectedDisease,
                    confidence: data.confidence,
                });
                setStep('result');

            } catch (error) {
                console.error('API Error:', error);
                Alert.alert(
                    "Erreur de Connexion",
                    "Impossible de joindre le serveur d'analyse.\nVérifiez votre connexion internet.\n\n" + error.message
                );
            } finally {
                setLoading(false);
            }
            return;
        }

        // Keep Mock logic for other plants (demo purpose)
        setTimeout(() => {
            setLoading(false);

            if (!selectedPlant.modelAvailable) {
                Alert.alert(
                    "Modèle en Développement",
                    "Désolé, le modèle d'IA pour cette plante n'est pas encore disponible ou le serveur est inaccessible.\n\nL'équipe travaille dessus ! 👨‍💻",
                    [
                        { text: "Compris", onPress: () => setStep('select') }
                    ]
                );
                return;
            }

            const mockResult = selectedPlant.diseases && selectedPlant.diseases.length > 0
                ? selectedPlant.diseases[0]
                : { name: 'Saine', symptoms: 'Aucun symptôme détecté.', treatment: 'Continuez l\'entretien régulier.' };

            setResult({
                ...mockResult,
                confidence: 0.92,
            });
            setStep('result');
        }, 2000);
    };

    const reset = () => {
        setStep('select');
        setSelectedPlant(null);
        setImageUri(null);
        setResult(null);
    };

    return (
        <View style={styles.container}>
            {step === 'select' && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.header}>Qu'analysons-nous ?</Text>
                    <Text style={styles.subHeader}>Choisissez la plante à examiner</Text>
                    <View style={styles.grid}>
                        {Plants.map((plant) => (
                            <TouchableOpacity
                                key={plant.id}
                                style={styles.plantItem}
                                onPress={() => handleSelectPlant(plant)}
                            >
                                <Image source={{ uri: plant.image }} style={styles.plantImage} />
                                <Text style={styles.plantName}>{plant.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}

            {step === 'type' && (
                <View style={styles.content}>
                    <Text style={styles.header}>Capturez la feuille</Text>
                    <Text style={styles.subHeader}>
                        Prenez une photo claire de la feuille affectée de {selectedPlant?.name}
                    </Text>

                    <View style={styles.previewContainer}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>Aucune image sélectionnée</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handleImagePicker('camera')}>
                            <Text style={styles.iconButtonText}>📸 Caméra</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handleImagePicker('gallery')}>
                            <Text style={styles.iconButtonText}>🖼️ Galerie</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.actionContainer}>
                        <PrimaryButton
                            title={loading ? "Analyse en cours..." : "Lancer le Diagnostic"}
                            onPress={analyzeImage}
                            loading={loading}
                            disabled={!imageUri}
                        />
                        <TouchableOpacity onPress={reset} style={styles.cancelLink}>
                            <Text style={styles.cancelText}>Choisir une autre plante</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {step === 'result' && result && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.header}>Résultat du Diagnostic</Text>

                    <View style={styles.resultCard}>
                        <View style={styles.resultHeader}>
                            <Text style={styles.diseaseName}>{result.name}</Text>
                            <View style={styles.confidenceBadge}>
                                <Text style={styles.confidenceText}>{(result.confidence * 100).toFixed(0)}% Sûr</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>Symptômes détectés</Text>
                        <Text style={styles.sectionText}>{result.symptoms}</Text>

                        <Text style={styles.sectionTitle}>Traitement recommandé</Text>
                        <Text style={styles.sectionText}>{result.treatment}</Text>
                    </View>

                    <PrimaryButton title="Nouveau Scan" onPress={reset} />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 20,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 8,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 24,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    plantItem: {
        width: (width - 60) / 2,
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 3,
    },
    plantImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    plantName: {
        fontWeight: 'bold',
        color: colors.textPrimary,
        textAlign: 'center',
    },
    previewContainer: {
        height: 300,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        alignItems: 'center',
    },
    placeholderText: {
        color: colors.textSecondary,
        marginTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    iconButton: {
        backgroundColor: colors.surface,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 2,
        borderWidth: 1,
        borderColor: colors.primaryLight,
    },
    iconButtonText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    actionContainer: {
        marginTop: 10,
    },
    cancelLink: {
        marginTop: 15,
        alignItems: 'center',
    },
    cancelText: {
        color: colors.textSecondary,
        textDecorationLine: 'underline',
    },
    resultCard: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        elevation: 4,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    diseaseName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.error,
        flex: 1,
    },
    confidenceBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    confidenceText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginTop: 12,
        marginBottom: 4,
    },
    sectionText: {
        fontSize: 15,
        color: colors.textSecondary,
        lineHeight: 22,
    },
});

export default Scan;