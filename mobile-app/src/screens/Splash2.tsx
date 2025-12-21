import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';

interface Props {
    navigation: StackNavigationProp<any>;
}

const { width } = Dimensions.get('window');

const Splash2 = ({ navigation }: Props) => {
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 20,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                navigation.replace('Home');
            }, 2000);
        });
    }, [scaleAnim, navigation]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
                <Image
                    source={require('../assets/logo_agriscan.jpg')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.8,
        height: width * 0.8, // Slightly larger for main app logo
    },
});

export default Splash2;
