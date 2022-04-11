import { UserAccountEditAvatar_UserFragment } from '@/generated'
import { Avatar, Badge, Box, Icon } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'
import { Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'

export interface UserAccountEditAvatarProps extends IAvatarProps {
    user: UserAccountEditAvatar_UserFragment
    selectedImage?: ImagePicker.ImageInfo
    onImageSelected: (image: ImagePicker.ImageInfo) => void
}

const pickImage = async () =>
    ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
        base64: true
    })

export default function UserAccountEditAvatar({
    user,
    selectedImage,
    onImageSelected,
    bgColor,
    ...rest
}: UserAccountEditAvatarProps) {
    const { profilePictureUrl } = user

    const selectProfilePicture = async () => {
        const pickerResult = await pickImage()
        if (pickerResult.cancelled) return
        onImageSelected(pickerResult)
    }

    return (
        <Box alignItems="center">
            <Pressable onPress={selectProfilePicture}>
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage.uri }}
                        style={{
                            borderRadius: 75,
                            width: 75,
                            height: 75
                        }}
                    />
                ) : (
                    <Avatar
                        bgColor={profilePictureUrl ? undefined : bgColor}
                        source={
                            profilePictureUrl
                                ? { uri: profilePictureUrl }
                                : undefined
                        }
                        size={75}
                        {...rest}
                    />
                )}
                <Badge
                    position="absolute"
                    rounded="full"
                    bgColor="indigo.600"
                    alignSelf="flex-end"
                    p={1}
                >
                    <Icon
                        as={Feather}
                        name="camera"
                        m={0}
                        size={3}
                        color="white"
                    />
                </Badge>
            </Pressable>
        </Box>
    )
}
