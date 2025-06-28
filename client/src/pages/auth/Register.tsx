import { useState,  type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import type { UserCreateDTO } from '../../dtos/userDTO';

type Props = {
    onRegister: (user: UserCreateDTO) => Promise<void>,
}

export default function Register({ onRegister }: Props) {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [profile_pic, setProfilePic] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [roles, setRoles] = useState<string[]>(['guest']);
    const navigate = useNavigate();
    

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const user: UserCreateDTO = { name, username, password, email, profile_pic, roles, createdAt: new Date() }
        onRegister(user);
        navigate("/");
    }
    
    const addRole = (new_role: string) => {
        if (!roles.includes(new_role)) {
            setRoles([...roles, new_role])
        } else{
            setRoles(roles.filter(role=>role!==new_role));
        }
    }

    
    return (
    <div className='Register section'>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <label>Enter your username:
                <input
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label>Email:
                <input
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label>Password:
                <input
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <label>Profile Pic:
                <input
                type="text" 
                value={profile_pic}
                onChange={(e) => setProfilePic(e.target.value)}
                />
            </label>

            <label>Name:
                <input
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label>Roles:
                <label >{roles.reduce((role, acc) => role + ', ' + acc, '')}</label>
                <select value={''} onChange={(e) => addRole(e.target.value)}>
                    <option value="guest">guest</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
            </label>


            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}
