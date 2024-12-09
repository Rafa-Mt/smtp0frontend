import {
    Anchor,
    Box,
    Button,
    Center,
    Container,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
import '@mantine/core/styles.css'
import '@mantine/core/styles.layer.css'
import classes from '../styles/Login.module.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { backendUrl } from '../main';

const Login = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies(['user']);

    const handleRegister = async () => {
        const response = await fetch(`${backendUrl}/auth/login`, { 
            method: 'POST', 
            body: JSON.stringify({
                username, password
            })
        })
        const {username: usrname, token} = await response.json()
        setCookie('user', {username: usrname, token}, { path: '/' })
        navigate('/')
    }

    useEffect(() => {
        console.log({ email, username, password})
    }, [email, username, password])
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '39vw'
        }}>
        <Center h={600} bg="var(--mantine-color-gray-light)">
            <Container size={1000} my={400} >
                <Title ta="center" className={classes.title}>
                    Welcome!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Already have an account?{' '}
                <Anchor size="sm" onClick={() => { navigate('/login') }}>
                    Log In
                </Anchor>
                </Text>
        
                <Paper withBorder shadow="md" p={50} mt={30} radius="md">
                <Box>
                    <TextInput label="Email" placeholder="Your email" required mt="md" onChange={(event) =>{setEmail(event.currentTarget.value)}}/>
                    <TextInput label="Username" placeholder="Your username" required mt="md" onChange={(event) =>{setUsername(event.currentTarget.value)}}/>
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(event) => {setPassword(event.currentTarget.value)}}/>
                </Box>
                
                <Button fullWidth mt="xl" onClick={handleRegister}>
                    Sign in
                </Button>
                </Paper>
            </Container>
        </Center>
        </div>
    );
}

export default Login