import { Container, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications'
import cx from 'clsx'
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes.tsx';
// import { useState } from 'react';
import {CookiesProvider} from 'react-cookie'
import classes from './styles/App.module.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = createTheme({
    components: {
      Container: Container.extend({
        classNames: (_, { size }) => ({
          root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
        }),
      }),
    },
    
  });
  

const App = () => {
    // const [user, setUser] = useState({ username: '', password: '' })
    const client = new QueryClient()
    return (
      <CookiesProvider>
        <MantineProvider theme={theme}>    
          <QueryClientProvider client={client}>
            <Notifications />
            <RouterProvider router={routes}/>
          </QueryClientProvider>
        </MantineProvider>
      </CookiesProvider>
    )
}

export default App