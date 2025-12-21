import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
}

export const PrimaryButton = ({ title, onPress, disabled, loading, style }: PrimaryButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={colors.textLight} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 30, // Pill shape
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        width: '100%',
        marginVertical: 12,
    },
    disabled: {
        backgroundColor: colors.secondary, // Light faded green
        elevation: 0,
        opacity: 0.7,
    },
    text: {
        color: colors.textLight,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
});
