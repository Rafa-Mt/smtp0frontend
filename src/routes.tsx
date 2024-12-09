import  {
    createBrowserRouter,
    // RouterProvider,
} from "react-router-dom";
import MainLayout from "./screens/MainScreen";
import LoginLayout from "./screens/LoginScreen";
import Registerlayout from "./screens/RegisterScreen";
// import { redirect } from "react-router";

export const routes = createBrowserRouter([
    // {
    //     path: '/',
    //     action: () => {
    //         redirect('/login')
    //     }
    // }
    {
        path: '/',
        element: <MainLayout/>
    },
    {
        path: '/login',
        element: <LoginLayout/>
    },
    {
        path: '/register',
        element: <Registerlayout />
    }
])