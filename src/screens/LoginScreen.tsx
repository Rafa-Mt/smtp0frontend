import {
    Anchor,
    Button,
    Center,
    Container,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  import classes from '../styles/Login.module.css';
import { SyntheticEvent, useState } from 'react';
// import { UserContext } from '../Contexts';
// import { UserContextType } from '../types/context';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { backendUrl } from '../main.tsx'
import { notifications } from "@mantine/notifications"

  const Login = () => {
    // const [remember, setRemember] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies(['user'])
    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log({remember, email: username, password})
    // }, [remember, username, password])

    // useEffect(() => {
    //     console.log(user)
    // }, [user])

    const handleLogin = async () => {
        try {
            console.log(JSON.stringify({username, password}))
            const response = await fetch(`${backendUrl}/auth/login`, { 
            method: 'POST', 
            headers: {
                "Access-Control-Allow-Origin": '*',
                'Content-Type': "Application/json"
            },
            body: JSON.stringify({
                username, password
            }) 
        })
        const json = await response.json()
        console.log(json)
        if (json.error) {
            throw new Error(json.error)
        }
        setCookie('user', { username: json.data.user.username , token: json.data.token}, { path: '/' })
        navigate('/')
    }
    catch (error) {
        notifications.show({
            title: "Login Failed",
            message: (error as Error).message
        })
    }
    }

    const handleEnter = (event: SyntheticEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (event as any).key;
        if (key === 'Enter')
            handleLogin()
    }


    return (
    
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '38vw'
        }}>
        <Center h={500}>
            <Container fluid>
                <Title ta="center" className={classes.title}>
                  Welcome!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Do not have an account yet?{' '}
                <Anchor size="sm" onClick={() => {navigate('/register')}}>
                    Create account
                </Anchor>
                </Text>
        
                <Paper withBorder shadow="md" p={50} mt={30} radius="md">
                <TextInput label="Username" placeholder="Your username" required onChange={(event) =>{setUsername(event.currentTarget.value)}}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(event) => {setPassword(event.currentTarget.value)}} onKeyUp={handleEnter}/>
                {/* <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" onChange={(event) => {setRemember(event.currentTarget.checked)}}/>
                    <Anchor component="button" size="sm">
                    Forgot password?
                    </Anchor>
                </Group> */}
                <Button fullWidth mt="xl" onClick={handleLogin}>
                    Sign in
                </Button>
                </Paper>
            </Container>
        </Center>
        </div>
    );
  }

  export default Login