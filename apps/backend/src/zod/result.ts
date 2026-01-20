import z from "zod";

export const createResultSchema = z.object({
    phValue: z.number().positive("pH Value must be a positive number"),
    turbidityNTU: z.number().positive("Turbidity NTU must be a positive number"),
    tdsPPM: z.number().positive("TDS PPM must be a positive number"),
    temperatureC: z.number().positive("Temperature C must be a positive number"),
    dissolvedOxygen: z.number().positive("Dissolved Oxygen must be a positive number"),
    conductivityUS: z.number().positive("Conductivity US must be a positive number"),
    hardnessMG: z.number().positive("Hardness MG must be a positive number"),
    nitrateMG: z.number().positive("Nitrate MG must be a positive number"),
    chlorideMG: z.number().positive("Chloride MG must be a positive number"),
    overallResult: z.enum(["SAFE", "UNSAFE"], "Invalid overall result value"),
    sampleId: z.string().min(8, "Sample ID is required"),
})

export const updateResultSchema = z.object({
    phValue: z.number().positive("pH Value must be a positive number").optional(),
    turbidityNTU: z.number().positive("Turbidity NTU must be a positive number").optional(),
    tdsPPM: z.number().positive("TDS PPM must be a positive number").optional(),
    temperatureC: z.number().positive("Temperature C must be a positive number").optional(),

    dissolvedOxygen: z.number().positive("Dissolved Oxygen must be a positive number").optional(),
    conductivityUS: z.number().positive("Conductivity US must be a positive number").optional(),
    hardnessMG: z.number().positive("Hardness MG must be a positive number").optional(),
    nitrateMG: z.number().positive("Nitrate MG must be a positive number").optional(),
    chlorideMG: z.number().positive("Chloride MG must be a positive number").optional(),
    overallResult: z.enum(["SAFE", "UNSAFE"], "Invalid overall result value").optional(),
})

export const resultStatusSchema = z.object({
    overallResult: z.enum(["SAFE", "UNSAFE"], "Invalid overall result value"),
})