import express from 'express'
import { checkRole, validateToken } from '../../middleware/validateToken';
import { UserModel } from '../../db/model/userModel';
import { Request, Response, NextFunction } from 'express';

const adminRouter = express.Router();

adminRouter.get('/users', validateToken, checkRole(['admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query.name as string;
        const filter = query ? { username: { $regex: query, $options: 'i' } } : {};
        const users = await UserModel.find(filter);
        res.status(200).json(users);
    } catch (e) {
        next(e);
    }
}).delete('/users/:userId', validateToken, checkRole(['admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const deleted = await UserModel.deleteOne({ _id: userId });
        if (deleted.deletedCount === 0) {
            res.status(400).json({ message: "User doesn't exist" })
        }
        res.status(200).json(deleted);
    } catch (e) {
        next(e);
    }
})

export default adminRouter;