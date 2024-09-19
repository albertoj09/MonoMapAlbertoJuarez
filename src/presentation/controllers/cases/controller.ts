import { Request, Response } from 'express';
import { CaseModel } from '../../../data/models/case.model';

export class CaseHandler {
    public fetchAllCases = async (_: Request, res: Response): Promise<Response> => {
        try {
            const cases = await CaseModel.find().lean().exec();
            return res.status(200).json(cases);
        } catch (error) {
            console.error('Error fetching all cases:', error);
            return res.status(500).json({ message: "No se pudieron recuperar los casos" });
        }
    }

    public retrieveRecentCases = async (_: Request, res: Response): Promise<Response> => {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const recentCases = await CaseModel.find({ creationDate: { $gte: sevenDaysAgo } }).lean().exec();
            return res.status(200).json(recentCases);
        } catch (error) {
            console.error('Error fetching recent cases:', error);
            return res.status(500).json({ message: "No se pudieron recuperar los casos recientes" });
        }
    }

    public registerNewCase = async (req: Request, res: Response): Promise<Response> => {
        try {
            const newCase = new CaseModel({
                ...req.body,
                creationDate: new Date(),
                isSent: false
            });
            const registeredCase = await newCase.save();
            return res.status(201).json(registeredCase);
        } catch (error: any) {
            console.error('Error registering new case:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: `Datos inválidos: ${error.message}` });
            }
            return res.status(500).json({ message: "No se pudo registrar el nuevo caso" });
        }
    }  

    public fetchCaseDetails = async (req: Request, res: Response): Promise<Response> => {
        try {
            const caseDetails = await CaseModel.findById(req.params.id).lean().exec();
            if (!caseDetails) {
                return res.status(404).json({ message: "Detalles del caso no encontrados" });
            }
            return res.status(200).json(caseDetails);
        } catch (error) {
            console.error('Error fetching case details:', error);
            return res.status(500).json({ message: "No se pudieron recuperar los detalles del caso" });
        }
    }

    public modifyCaseInfo = async (req: Request, res: Response): Promise<Response> => {
        try {
            const modifiedCase = await CaseModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true, context: 'query' }
            ).lean().exec();

            if (!modifiedCase) {
                return res.status(404).json({ message: "Caso a modificar no encontrado" });
            }

            return res.status(200).json(modifiedCase);
        } catch (error: any) {
            console.error('Error modifying case info:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: `Datos inválidos para modificación: ${error.message}` });
            }
            return res.status(500).json({ message: "No se pudo modificar la información del caso" });
        }
    }

    public removeCaseRecord = async (req: Request, res: Response): Promise<Response> => {
        try {
            const removedCase = await CaseModel.findByIdAndDelete(req.params.id).lean().exec();

            if (!removedCase) {
                return res.status(404).json({ message: "Caso a eliminar no encontrado" });
            }
            return res.status(200).json({ message: "Registro de caso eliminado exitosamente", removedCase });
        } catch (error) {
            console.error('Error removing case record:', error);
            return res.status(500).json({ message: "No se pudo eliminar el registro del caso" });
        }
    }
}