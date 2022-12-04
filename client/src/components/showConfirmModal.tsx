import { Alert } from "react-native";

interface Props {
    title: string,
    description?: string,
    confirmText: string,
    onCancel?: () => void, 
    onConfirm: () => void
}

export default function showConfirmModal({
    title,
    description,
    confirmText,
    onCancel,
    onConfirm
}: Props) {
    return Alert.alert(
        title,
        description,
        [
            {
                text: "Cancel",
                onPress: onCancel,
                style: "cancel"
            },
            {
                text: confirmText,
                onPress: onConfirm
            }
        ]
    )
}