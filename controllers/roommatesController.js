import { RoommateModel } from "../models/roommateModel.js"; 

export const getAllRoommates = async(req, res) =>{
    try {
        const roommates = await RoommateModel.all();
        return res.json({roommates});
    } catch (error) {
        console.error(error)
        res.json( { ok: false,  error });
    }
}

export const getRoommateById = async(req, res)=>{
    try {
        const { id } = req.params
        const roommate = await RoommateModel.one(id);
        return res.json({roommate});
    } catch (error) {
        console.error(error)
        res.json( { ok: false,  error });
    }
}


export const createRoommate = async(req, res)=>{
    try {
        const roommate = await RoommateModel.create();
        return res.json({roommate});
    } catch (error) {
        console.error(error)
        res.json( { ok: false,  error });
    }
}