import { useEffect, useState } from 'react'
import UserCard from '../../components/cards/UserCard';
import Cookies from 'js-cookie';
import type { IUser } from '../../../../server/src/db/model/userModel';


type Props = {
    fetchUsers: (entityType: string) => Promise<IUser[]>,
    handleDelete: (entityType: string ,userId: string) => Promise<IUser>,
    handleEdit?: (updatedUser: IUser) => Promise<void>,
}

export default function Users({ fetchUsers, handleDelete }: Props) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true)
    const myId = (JSON.parse(Cookies.get('user') || '') as IUser)._id;
    
    const fetch = async () => {
        try {
            const users = await fetchUsers('user');
            setLoading(false);
            setUsers(users);
        } catch (e) {
            console.error((e as Error).message);
        }
    }


    const deleteUser = async (userId: string): Promise<void> => {
        try {
            await handleDelete('user' ,userId);
            setUsers(users.filter(user => user._id.toString() !== userId));
        } catch (e) {
            console.error((e as Error).message);
        }
    }
    
    useEffect(() => {
        fetch();
    },[])

    useEffect(() => {
        console.log("Users:", users);
    }, [users]);

    
  return (
      <div className="Users">
        <h2>Users</h2>
        <button onClick={() => fetch()}>Refresh</button>
        {loading ? 
            <h2>Loading...</h2>
            :
            <div className="user-cards overflow-y-auto">
                {users.map((user: IUser) => {
                    return (
                        <UserCard 
                        key={user._id.toString()}
                        user={user}
                        myId={myId.toString()}
                        adminView={true}
                        handleDelete={deleteUser}
                        // handleEdit={handleEdit}
                        />
                    );
                })}
            </div>
        }
    </div>
  )
}
