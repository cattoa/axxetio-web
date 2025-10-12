import { Dashboard } from "@/app/(components)/Dashboard";
import { loadDashboardData } from "@/lib/dashboard-data";

export default async function DesktopDashboard() {
    const data = await loadDashboardData();

    const statCards = [
        { label: "Assets", value: data.stats.assets },
        { label: "Institutes", value: data.stats.institutes },
        { label: "Outlets", value: data.stats.outlets },
        { label: "Customers", value: data.stats.customers },
        { label: "Asset Types", value: data.stats.assetTypes },
        { label: "Devices", value: data.stats.devices },
    ];

    return (
        <Dashboard
            statCards={statCards}
            data={data}
        />
    );
}