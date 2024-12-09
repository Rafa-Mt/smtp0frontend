import { ActionIcon, Dialog, TextInput, Textarea, Button  } from "@mantine/core"
import { CiAt } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { backendUrl } from "../main";
import { useCookies } from "react-cookie";

const CreateMailButton = () => {
    const [opened, {close, toggle}] = useDisclosure(false)
    const [target, setTarget] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [cookie] = useCookies(['user']);
 
    const handleSend = async () => {
        try {
            if (!target)
                throw new Error('Target cannot be empty')

            const response = await fetch(`${backendUrl}/mail`, { 
                method: 'POST', 
                headers: {
                    "Access-Control-Allow-Origin": '*',
                    'Content-Type': "Application/json",
                    'Authorization': `Bearer ${cookie.user.token}`
                },
                body: JSON.stringify({
                    to: target,
                    subject: title,
                    text: content
                })
            })
            const json = await response.json()
            if (json.error)
                throw new Error(json.error)

            notifications.show({
                title: JSON.stringify({target, title, content}),
                message: "Mail sent successfully!"
            })
            close()
        }
        catch (error) {
            notifications.show({
                title: "Error sending message",
                message: (error as Error).message,
                color: 'red'
            })
        }
    }

    return (
         <>
            <ActionIcon variant='outlined' size={37.5} onClick={toggle}>
                <IoMdAdd/>
            </ActionIcon>
            <Dialog opened={opened} withCloseButton onClose={close} size='lg'>
                Send Mail
                <TextInput
                    leftSectionPointerEvents="none"
                    leftSection={<CiAt/>}
                    label="Target"
                    placeholder="target@tlas.online"
                    onChange={(event) => setTarget(event.currentTarget.value)}
                    type="email"
                />
                <TextInput 
                    label="Title"
                    placeholder="important message..."
                    onChange={(event) => setTitle(event.currentTarget.value)}
                />
                <Textarea
                    label='Content'
                    placeholder="type you message..."
                    onChange={(event) => setContent(event.currentTarget.value)}
                />
                <Button mt={8} onClick={handleSend}>Send</Button>
            </Dialog>
         </>
    )
}

export default CreateMailButton