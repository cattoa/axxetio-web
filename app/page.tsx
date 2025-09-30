import prisma from "@/lib/prisma";
import { Dashboard } from "@/app/(components)/Dashboard";

type DashboardData = {
  connected: boolean;
  stats: {
    assets: number;
    institutes: number;
    outlets: number;
    customers: number;
    assetTypes: number;
    devices: number;
  };
  recentAssets: Array<{
    id: number;
    name: string;
    assetNumber: string;
    institute: string;
    outlet: string;
    type: string;
    make: string;
    model: string;
    installDate: Date | null;
    status: "Active" | "Inactive";
  }>;
  recentActivity: Array<{
    id: number;
    actionDate: Date | null;
    actionType: string;
    assetName: string;
    assetNumber: string | null;
    location: string | null;
  }>;
  topCustomers: Array<{
    id: number;
    name: string;
    outletCount: number;
    active: boolean;
  }>;
};

const fallbackData: DashboardData = {
  connected: false,
  stats: {
    assets: 0,
    institutes: 0,
    outlets: 0,
    customers: 0,
    assetTypes: 0,
    devices: 0,
  },
  recentAssets: [],
  recentActivity: [],
  topCustomers: [],
};

async function loadDashboardData(): Promise<DashboardData> {
  if (!process.env.DATABASE_URL) {
    return fallbackData;
  }

  try {
    const [assets, institutes, outlets, customers, assetTypes, devices] =
      await Promise.all([
        prisma.asset.count(),
        prisma.institute.count(),
        prisma.outlet.count(),
        prisma.customer.count(),
        prisma.asset_type.count(),
        prisma.device.count(),
      ]);

    const [recentAssetsRaw, recentActivityRaw, topCustomersRaw] =
      await Promise.all([
        prisma.asset.findMany({
          take: 6,
          orderBy: [
            { installdate: "desc" },
            { id: "desc" },
          ],
          include: {
            institute: { select: { name: true } },
            outlet: { select: { name: true } },
            asset_type: { select: { name: true } },
            asset_make: { select: { name: true } },
            asset_model: { select: { name: true } },
          },
        }),
        prisma.asset_action.findMany({
          take: 6,
          orderBy: [
            { actiondate: "desc" },
            { id: "desc" },
          ],
          include: {
            asset: { select: { name: true, assetnumber: true } },
            asset_action_type: { select: { name: true } },
          },
        }),
        prisma.customer.findMany({
          take: 6,
          orderBy: { id: "desc" },
          select: {
            id: true,
            name: true,
            active: true,
            _count: { select: { outlet: true } },
          },
        }),
      ]);

    const recentAssets = recentAssetsRaw.map((asset) => {
      const status: "Active" | "Inactive" =
        asset.active === 0 ? "Inactive" : "Active";

      return {
        id: asset.id,
        name: asset.name ?? "Untitled asset",
        assetNumber: asset.assetnumber ?? "—",
        institute: asset.institute?.name ?? "—",
        outlet: asset.outlet?.name ?? "—",
        type: asset.asset_type?.name ?? "—",
        make: asset.asset_make?.name ?? "—",
        model: asset.asset_model?.name ?? "—",
        installDate: asset.installdate ?? null,
        status,
      };
    });

    const recentActivity = recentActivityRaw.map((activity) => {
      const hasCoordinates =
        activity.latitude !== null && activity.longitude !== null;

      return {
        id: activity.id,
        actionDate: activity.actiondate ?? null,
        actionType: activity.asset_action_type?.name ?? "Update",
        assetName:
          activity.asset?.name ?? activity.asset?.assetnumber ?? "Unknown asset",
        assetNumber: activity.asset?.assetnumber ?? null,
        location: hasCoordinates
          ? `${activity.latitude?.toFixed(3)}, ${activity.longitude?.toFixed(3)}`
          : null,
      };
    });

    const topCustomers = topCustomersRaw.map((customer) => ({
      id: customer.id,
      name: customer.name ?? "Unnamed customer",
      outletCount: customer._count.outlet,
      active: customer.active === 1,
    }));

    return {
      connected: true,
      stats: { assets, institutes, outlets, customers, assetTypes, devices },
      recentAssets,
      recentActivity,
      topCustomers,
    };
  } catch (error) {
    console.error("Dashboard data load failed", error);
    return fallbackData;
  }
}

export default async function DashboardPage() {
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