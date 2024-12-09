import {
    Box,
    Text,
    Button,
    Group,

} from '@mantine/core';
import { FaRegFolderOpen } from "react-icons/fa6";
// import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../styles/Header.module.css';
import ToggleTheme from '../Components/ToggleTheme';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import CreateMailButton from '../Components/CreateMailButton';

const HeaderLayout = () => {
// const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
// const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
// const theme = useMantineTheme();
const navigate = useNavigate()
const [cookie, setCookie] = useCookies(['user'])

const handleLogout = () => {
    setCookie('user', {username: null, token: null})
    navigate('/login', {replace: true})
}

return (
    <Box pb={120}>
    <header className={classes.header}>
        <Group justify="space-between" h="100%">
        {/* <MantineLogo size={30} /> */}
        <Group visibleFrom="sm">
            <FaRegFolderOpen />
            <Text>{cookie.user.username}</Text>
        </Group>

        <Group visibleFrom="sm">
            <CreateMailButton />
            <ToggleTheme/>
            <Button variant="filled" onClick={handleLogout}>Log Out</Button>
        </Group>

        {/* <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" /> */}
        </Group>
    </header>
    </Box>
);
}

export default HeaderLayout