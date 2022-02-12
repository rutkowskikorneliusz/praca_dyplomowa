import {ReactNode, useRef, useState} from 'react'
import {Img, InputGroup, Stack} from '@chakra-ui/react'

import {UseFormRegisterReturn} from 'react-hook-form'

type FileUploadProps = {
    register: UseFormRegisterReturn
    accept?: string
    multiple?: boolean
    children?: ReactNode
}

const FileUpload = (props: FileUploadProps) => {
    const [loadedImage, setLoadedImage] = useState<File>()
    const {register, accept, multiple, children} = props
    const inputRef = useRef<HTMLInputElement | null>(null)
    const {ref, ...rest} = register as { ref: (instance: HTMLInputElement | null) => void }

    const handleClick = () => inputRef.current?.click()

    return (
        <InputGroup onClick={handleClick}>
            <input
                onInput={() => setLoadedImage(inputRef.current?.files?.[0])}
                type={'file'}
                multiple={multiple || false}
                hidden
                accept={accept}
                {...rest}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
            />
            <Stack>

                <>
                    {children}
                </>
                {loadedImage &&
                <Img
                    w={'200px'}
                    objectFit="cover"
                    src={URL.createObjectURL(loadedImage)}
                />
                }
            </Stack>

        </InputGroup>
    )
}

export default FileUpload