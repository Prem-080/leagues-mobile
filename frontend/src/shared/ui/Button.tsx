import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
    onPress: () => void;
    title: string;
    color: string;
    fontSize: number;
};

export default function Button({ onPress, title, color, fontSize }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-dark dark:bg-light p-3 rounded-lg items-center">
            <Text style={{ color, fontSize, fontWeight: '600' }}>{title}</Text>
        </TouchableOpacity>
    );
}