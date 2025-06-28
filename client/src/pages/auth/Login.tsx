

import type { Credentials } from "@/common/commonTypes";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

type Props = {
    onLogin: (credentials: Credentials) => Promise<void>;
    className?: string;
}

export default function Login({ onLogin, className }:Props) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async () => {
    try {
        await onLogin({ username, password });
        setOpen(false);
        setTimeout(() => {
          setUsername('');
          setPassword('');
        }, 1000);
    } catch (e) {
        setError((e as Error).message)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent className={`sm:max-w-[425px] ${className}`} >
          <DialogHeader>
            <DialogTitle className="text-xl">Login</DialogTitle>
            {error &&
            <Button variant={'destructive'} disabled>{error}</Button>
            }
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input 
                id="username-1" 
                name="username" 
                onChange={e => setUsername(e.target.value)} 
                value={username} 
                placeholder="user123" 
                required
              />
            </div>    <div className="grid gap-3">
              <Label htmlFor="password-1">Password</Label>
              <Input 
                id="password-1" 
                name="password" 
                onChange={e => setPassword(e.target.value)} 
                type="password"
                value={password}
                placeholder="Your password" 
                required/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type="submit">Login</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
