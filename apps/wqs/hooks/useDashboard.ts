import { api } from "@/lib/api";
import { DashBoardData } from "@/types/dashboard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useDashboard = () => {
    const [data, setData] = useState<DashBoardData>({} as DashBoardData);
    const [loading, setLoading] = useState(true);
    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await api.get("/dashboard");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDashboardData();
    }, [])
    return {data, loading}
}