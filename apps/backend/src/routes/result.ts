import { Router } from "express";
import { createResultSchema, updateResultSchema } from "../zod/result";
import { prisma } from "../lib/client";

const router = Router();

router.post("/create", async(req, res) => {
    try {
        const resultValidationResponse = createResultSchema.safeParse(req.body);
        if(!resultValidationResponse.success){
            return res.status(400).json({error: resultValidationResponse.error.issues[0].message});
        }
        const { phValue, turbidityNTU, tdsPPM, temperatureC, dissolvedOxygen, conductivityUS, hardnessMG, nitrateMG, chlorideMG, overallResult, sampleId } = resultValidationResponse.data;
        const existingResult = await prisma.testResult.findUnique({
            where: {
                sampleId
            }
        });
        if(existingResult){
            return res.status(400).json({error: "Result for this sample already exists"});
        }
        await prisma.testResult.create({
            data: {
                phValue,
                turbidityNTU,
                tdsPPM,
                temperatureC,
                dissolvedOxygen,
                conductivityUS,
                hardnessMG,
                nitrateMG,
                chlorideMG,
                overallResult,
                sampleId,
            }
        });
        return res.status(200).json({message: "Result created successfully"});
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
});

router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const existingResult = await prisma.testResult.findUnique({
            where: {
                testId: id,
            }
        });
        if(!existingResult){
            return res.status(404).json({error: "Result not found"});
        }
        const resultValidationResponse = updateResultSchema.safeParse(req.body);
        if(!resultValidationResponse.success){
            return res.status(400).json({error: resultValidationResponse.error.issues[0].message});
        }
        const { phValue, turbidityNTU, tdsPPM, temperatureC, dissolvedOxygen, conductivityUS, hardnessMG, nitrateMG, chlorideMG, overallResult } = resultValidationResponse.data;
        await prisma.testResult.update({
            where: {
                testId: id,
            },
            data: {
                phValue: phValue || existingResult.phValue,
                turbidityNTU: turbidityNTU || existingResult.turbidityNTU,
                tdsPPM: tdsPPM || existingResult.tdsPPM,
                temperatureC: temperatureC || existingResult.temperatureC,
                dissolvedOxygen: dissolvedOxygen || existingResult.dissolvedOxygen,
                conductivityUS: conductivityUS || existingResult.conductivityUS,
                hardnessMG: hardnessMG || existingResult.hardnessMG,
                nitrateMG: nitrateMG || existingResult.nitrateMG,
                chlorideMG: chlorideMG || existingResult.chlorideMG,
                overallResult: overallResult || existingResult.overallResult,
            }
        });
        return res.status(200).json({message: "Result updated successfully"});
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
});

export default router;