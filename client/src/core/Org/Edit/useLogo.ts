import { ControllerRenderProps } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'

const pickLogo = async () =>
    ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1
    })

export interface OrgEditLogoOptions {
    field: ControllerRenderProps<any>
}

export default function useOrgEditLogo() {}
