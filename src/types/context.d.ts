export interface User {
    username: string
    password: string
}

export interface UserContextType {
    user: User;
    setUser: (user: User) => void;
}