import Subheader from '@/nx/components/Subheader'

export interface FormLabelProps {
    children: string
}

export default function FormLabel({ children }: FormLabelProps) {
    return <Subheader>{children}</Subheader>
}
