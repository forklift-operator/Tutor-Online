import { useEffect, useState } from 'react'
import { Link } from "react-router";
import Cookies from "js-cookie"

type Props = {
    fetchRooms: (entityType: string) => Promise<string[]>;
}

export default function ChatRooms({ fetchRooms }: Props) {

    const [rooms, setRooms] = useState<string[]>([])
    
    const fetch = async () => {
        const rooms = await fetchRooms('room');
        setRooms(rooms);
    }
    
    useEffect(() => {
        fetch();
    }, [])
    
  return (
    <>
        <div>ChatRooms</div>
        {rooms.map((room, i) => {
            return(
                <div key={i} className="room-card">
                    <Link to={`/meet/${room}`}>{room || `Room ${i+1}`}</Link>
                </div>
            )
        })}
    </>
  )
}
