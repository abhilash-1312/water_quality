import { Router } from "express";
import { createSampleSchema, updateSampleSchema } from "../zod/sample";
import { prisma } from "../lib/client";

const router = Router();


router.post("/create", async(req, res) => {
    try {
        const createSampleValidationResponse = createSampleSchema.safeParse(req.body);
        if (!createSampleValidationResponse.success) {
            return res.status(400).json({ error: createSampleValidationResponse.error.issues[0].message });
        }
        const { sampleCode, locationId, quantityML } = createSampleValidationResponse.data;
        const sampleExists = await prisma.sample.findUnique({
            where: {
                sampleCode,
            }
        });
        if (sampleExists) {
            return res.status(409).json({ error: "Sample with this code already exists" });
        }
        const location = await prisma.location.findUnique({
            where: {
                locationId,
            }
        });
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        await prisma.sample.create({
            data: {
                sampleCode,
                locationId,
                quantityML,
            }
        });
        return res.status(200).json({ message: "Sample created successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const sample = await prisma.sample.findUnique({
            where: {
                sampleId: id,
            },
            select: {
                locationId: true,
                quantityML: true,
                status: true,
            }
        });
        if (!sample) {
            return res.status(404).json({ error: "Sample not found" });
        }
        const updateSampleValidationResponse = updateSampleSchema.safeParse(req.body);
        if (!updateSampleValidationResponse.success) {
            return res.status(400).json({ error: updateSampleValidationResponse.error.issues[0].message });
        }
        const { locationId, quantityML, status } = updateSampleValidationResponse.data;
        await prisma.sample.update({
            where: {
                sampleId: id,
            },
            data: {
                locationId: locationId || sample.locationId,
                quantityML: quantityML || sample.quantityML,
                status: status || sample.status,
            }
        });
        return res.status(200).json({ message: "Sample updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/fetchsamples", async(req, res) => {
    try {
        const samples = await prisma.sample.findMany({
            select: {
                sampleId: true,
                sampleCode: true,
                quantityML: true,
                status: true,
                collectedAt: true,
                testResult: {
                    select: {
                        testId: true,
                        phValue: true,
                        turbidityNTU: true,
                        tdsPPM: true,
                        temperatureC: true,
                        dissolvedOxygen: true,
                        conductivityUS: true,
                        hardnessMG: true,
                        nitrateMG: true,
                        chlorideMG: true,
                        overallResult: true,
                        testedAt: true,
                    }
                }
            }
        });

        // Transform the samples into dashboard data
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;



