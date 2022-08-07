import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Avatar, Badge, Box, Icon } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'
import { Pressable, Image } from 'react-native'

import { UserAccountEditAvatar_UserFragment } from '@/graphql/generated'

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
                        button={75}
                        source={
                            profilePictureUrl
                                ? { uri: profilePictureUrl }
                                : undefined
                        }
                        {...rest}
                    />
                )}
                <Badge
                    alignSelf="flex-end"
                    bgColor="indigo.600"
                    p={1}
                    position="absolute"
                    rounded="full"
                >
                    <Icon
                        as={Feather}
                        button={3}
                        color="white"
                        m={0}
                        name="camera"
                    />
                </Badge>
            </Pressable>
        </Box>
    )
}
