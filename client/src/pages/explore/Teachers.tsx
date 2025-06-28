import { useEffect, useState } from 'react'
import UserCard from '../../components/cards/UserCard.js';
import Cookies from 'js-cookie';
import type { IUser } from '../../../../server/src/db/model/userModel.js';
import { Button } from '@/components/ui/button.js';


type Props = {
    fetchTeachers: (entityType: string) => Promise<IUser[]>,
}

export default function Teachers({ fetchTeachers }: Props) {
    const [teachers, setTeachers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true)
    const myId = (JSON.parse(Cookies.get('user') || '') as IUser)._id;
    
    const fetch = async () => {
        try {
            const teachers = await fetchTeachers('teacher');
            setLoading(false);
            setTeachers(teachers);
        } catch (e) {
            console.error((e as Error).message);
        }
    }

    useEffect(() => {
        fetch();
    },[])

    useEffect(() => {
        console.log("Teachers:", teachers);
    }, [teachers]);

    
  return (
      <div className="Teachers">
        <Button className='mb-5' onClick={fetch} variant={'outline'}>Refresh</Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teachers.map((user: IUser) => {
                return (
                    <UserCard 
                    key={user._id.toString()}
                    user={user}
                    myId={myId.toString()}
                    // handleEdit={handleEdit}
                    />
                );
            })}
        </div>
    </div>
  )
}
