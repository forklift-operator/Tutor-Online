import express from 'express'
import { checkRole, isOwner, isOwnerLesson, validateToken } from '../../middleware/validateToken';
import { UserModel } from '../../db/model/userModel';
import { CourseModel } from '../../db/model/courseModel';
import { LessonModel } from '../../db/model/lessonModel';

const userRouter = express.Router();
userRouter.get('/teachers', validateToken, async (req, res): Promise<any> => {
    try {
        const users = await UserModel.find({});
        const teachers = users.filter(user => user.roles.includes('teacher'));
        return res.status(200).json(teachers);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}).get('/teachers/:id', validateToken, async (req, res): Promise<any> => {
    try {
        const teacher = await UserModel.findById(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Could not find user' });
        return res.status(200).json(teacher);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json('Internal server error')
    }
}).get('/courses', validateToken, checkRole('teacher'), async (req, res): Promise<any> => {
    try {
        const courses = await CourseModel.find(req.query);
        return res.status(200).json(courses);
        // make it work with the htto response
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}).post('/courses', validateToken, checkRole('teacher'), async (req, res): Promise<any> => {
    try {
        const newCourse = await CourseModel.create(req.body);
        return res.status(200).json(newCourse);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}).get('/courses/:courseId', validateToken, async (req, res): Promise<any> => {
    try {
        const course = await CourseModel.findById(req.params.courseId);
        if (!course) return res.status(404).json({ message: "Course with this id not found" });
        return res.status(200).json(course);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: "Internal server error" })
    }
}).delete('/courses/:courseId', validateToken, checkRole('teacher'), async (req, res): Promise<any> => {
    try {
        const deleted = await CourseModel.deleteOne({ _id: req.params.courseId });
        return res.status(200).json(deleted);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}).put('/courses', validateToken, isOwner, async (req, res): Promise<any> => {
    try {
        const updated = await CourseModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        return res.status(200).json(updated);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}).get('/lessons', validateToken, async (req, res): Promise<any> => {
    try {
        const lessons = await LessonModel.find(req.query);
        return res.status(200).json(lessons);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}).post('/lessons', validateToken, checkRole('teacher'), async (req, res): Promise<any> => {
    try {
        const newLesson = await LessonModel.create(req.body);
        return res.status(200).json(newLesson);
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}).post('/start-meet', validateToken, checkRole('teacher'), isOwnerLesson, async (req, res): Promise<any> => {
    try {
        const lesson = await LessonModel.findByIdAndUpdate(
            req.body.id,
            { isOpen: true },
            { new: true }
        );
        if(!lesson) return res.status(404).json({message: "Could not find lesson"});
        return res.status(200).json({});
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

export default userRouter;