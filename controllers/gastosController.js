import { GastoModel } from '../models/gastoModel.js'


export const getAllGastos = async(req, res) =>{
    try {
        const gastos = await GastoModel.all();
        return res.json({gastos});
    } catch (error) {
        console.error(error)
        res.json( { ok: false,  error });
    }
}

export const getGastoById = async(req, res)=>{
    try {
        const { id } = req.params
        const gasto = await GastoModel.one(id);
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ ok: false, error});
    }
}

export const createGasto = async(req, res)=>{
    try {
        const { roommate_id, comment, amount} = req.body
        const gasto = await GastoModel.create({roommate_id, comment, amount});
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ok: false, error})
    }
}

export const updateGasto = async(req, res)=>{
    try {
        const { id } = req.query
        const { roommate_id, comment, amount} = req.body
        const gasto = await GastoModel.update(id, {roommate_id, comment, amount});
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ok: false, error})
    }
}

export const deleteGasto = async(req, res)=>{
    try {
        const { id } = req.query
        const gasto = await GastoModel.remove(id);
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ok: false, error})
    }
}