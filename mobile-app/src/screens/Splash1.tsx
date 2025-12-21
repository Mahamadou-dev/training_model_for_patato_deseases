import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';

interface Props {
    navigation: StackNavigationProp<any>;
}

const { width } = Dimensions.get('window');

const Splash1 = ({ navigation }: Props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.delay(1500),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.replace('Splash2');
        });
    }, [fadeAnim, navigation]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                <Image
                    source={require('../assets/logo_gremahtech.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {/* Optional: Add text if logo doesn't have it, but logo has text in this case */}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Clean white
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.7,
        height: width * 0.7,
    },
});

export default Splash1;
