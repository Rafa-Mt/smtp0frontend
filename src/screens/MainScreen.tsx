import { useState } from 'react';
import { AppShell, Box } from '@mantine/core';
import NavbarLayout from '../layouts/NavbarLayout';
import MainLayout from '../layouts/MainLayout';
import HeaderLayout from '../layouts/HeaderLayout';
import { Mail } from '../types/mail'
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';

import { backendUrl} from "../main"
import { useNavigate } from 'react-router';

const MainScreen = () => {
  const [mails, setMails] = useState<Mail[]>([]);  // Estado para almacenar la lista de archivos
  const [cookies] = useCookies(['user']);
  const [selected, setSelected] = useState<number | null>(null)
  const navigate = useNavigate()

  const { isError } = useQuery({
    
    queryKey: ['mails'],
    queryFn: async () => {
      if (!cookies.user.token) {
        navigate('/login', {replace: true})
        return
      }
      try {
        const response = await fetch(`${backendUrl}/mail`, {headers: {
          'Content-Type': "Application/json",
          "Authorization": `Bearer ${cookies.user.token}`
        }})
        const json = await response.json()
        console.log(json)
        setMails(json.data)
        return json.data
      }
      catch {
        navigate('/login', {replace: true})
      }

    }
  })

  
  if (isError) {
      navigate('/login', {replace: true})
      return <Box>
        Failed to get mail
      </Box>
    }
  
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 450,
        breakpoint: 'sm',
      }}
      padding="md"
      style={{
        width: '100%'
      }}
    >
      <AppShell.Header>
        <HeaderLayout/>
      </AppShell.Header>


      <AppShell.Navbar p="md">
        <NavbarLayout data={mails} selected={selected} setSelected={setSelected}/>
      </AppShell.Navbar>

      <AppShell.Main  > {/*style={{ width: '100%' }} */}
        <MainLayout content={selected !== null ? mails[selected] : null}/>        
      </AppShell.Main>
    </AppShell>
  );
}

export default MainScreen;
