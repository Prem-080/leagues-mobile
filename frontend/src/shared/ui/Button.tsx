import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/src/shared/constants/colors';

type ButtonProps = {
    onPress: () => void;
    title: string;
    color: string;
    fontSize: number;
};

export default function Button({ onPress, title, color, fontSize }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={[styles.buttonText, { color, fontSize }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.backgroundDark,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 19,
        fontWeight: '600',
    },
});