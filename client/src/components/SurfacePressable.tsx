import ThemedPressable, { ThemedPressableProps } from "./ThemedPressable";

export default function SurfacePressable(props: ThemedPressableProps){
    return <ThemedPressable rounded="sm" p={2.5} {...props} />
}