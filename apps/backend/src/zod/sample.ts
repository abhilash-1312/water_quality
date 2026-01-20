import z from "zod";

export const createSampleSchema = z.object({
    sampleCode: z.string().min(8, "Sample code is required"),
    locationId: z.string("Location ID is required"),
    quantityML: z.number().positive("Quantity must be a positive number"),
})

export const updateSampleSchema = z.object({
    locationId: z.string("Location ID is required").optional(),
    quantityML: z.number().positive("Quantity must be a positive number").optional(),
    status: z.enum(["COLLECTED", "IN_TESTING", "COMPLETED"], "Invalid status value").optional(),
})

export const sampleStatusSchema = z.object({
    status: z.enum(["COLLECTED", "IN_TESTING", "COMPLETED"], "Invalid status value"),
})

