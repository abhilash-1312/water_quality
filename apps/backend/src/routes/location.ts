import { Router } from "express";
import { locationSchema } from "../zod/location";
import { prisma } from "../lib/client";

const router = Router();

router.post("/create", async(req, res) => {
    try {
        const locationValidationResponse = locationSchema.safeParse(req.body);
        if (!locationValidationResponse.success) {
            return res.status(400).json({ error: locationValidationResponse.error.issues[0].message });
        }
        const { name } = locationValidationResponse.data;
        await prisma.location.create({
            data: {
                name,
            }
        });
        return res.status(200).json({ message: "Location created successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})

router.put("/update/:id", async(req, res) => {
    try {
        const locationValidationResponse = locationSchema.safeParse(req.body);
        if (!locationValidationResponse.success) {
            return res.status(400).json({ error: locationValidationResponse.error.issues[0].message });
        }
        const { name } = locationValidationResponse.data;
        const { id } = req.params;
        await prisma.location.findUnique({
            where: {
                locationId: id,
            }
        });
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        await prisma.location.update({
            where: {
                locationId: id,
            },
            data: {
                name,
            }
        });
        return res.status(200).json({ message: "Location updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})

router.get("/all", async(req, res) => {
    try {
        const locations = await prisma.location.findMany();
        return res.status(200).json({ locations });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})

export default router;