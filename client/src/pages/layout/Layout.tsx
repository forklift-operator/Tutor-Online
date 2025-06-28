import Header from '../../components/general/Header';
import { Outlet } from 'react-router';
import type { IUser } from '../../../../server/src/db/model/userModel';


type Props = {
    user: IUser | null;
    onLogout: () => void;
}

export default function Layout({user, onLogout}: Props) {
  return (
    <div className='Layout w-full h-full flex flex-col bg-background text-foreground '>
      <Header onLogout={onLogout} user={user}/>
      <div className="w-full h-full overflow-x-hidden overflow-y-auto p-5">
        <Outlet/>
      </div>
    </div>
  )
}
