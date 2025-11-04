
import { StyleSheet, TouchableOpacity, Text, type View } from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    desativado?: boolean;
    style?: ViewStyle;
}

export function ButtonRoxo({ title, onPress, disabled, style }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled ? styles.buttonDisabled : null, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        width: 324,
        height: 51,
        backgroundColor: '#AE77EA',
        paddingVertical: 14,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        elevation: 3,
        shadowColor: "#b243f6ff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    }
})