import type { ILesson } from "../../../../server/src/db/model/lessonModel"
import LessonCard from "@/components/cards/LessonCard";

type Props = {
    lessons: ILesson[],
    className?: string,
    onStartMeet?: (id: string) => Promise<void>,
    teacher: boolean,
}

export default function Lessons({ lessons, className, onStartMeet, teacher }: Props) {

  return (
    <div className="w-full h-full mt-5 overflow-y-auto ">
        {lessons.map(lesson => {
            return (
                <LessonCard 
                    key={lesson._id.toString()} 
                    lesson={lesson} 
                    className={className}
                    onStartMeet={onStartMeet}
                    teacher={teacher}
                />
            )
        })}
    </div>
  )
}
