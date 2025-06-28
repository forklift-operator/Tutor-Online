import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import type { Credentials } from '../../common/commonTypes';


type Props = {
    onLogin: (credentials: Credentials) => Promise<void>;
}

export default function Login({ onLogin }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState("")
    const navigate = useNavigate();
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onLogin({username, password});
        navigate('/')
    }
    
  return (
    <div className='Login section'>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <label>Enter your username:
                <input
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label>Password:
                <input
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            
            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}
