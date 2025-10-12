import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, EmptyState, ResponsiveLayout } from "@/app/(components)/layout/ResponsiveLayout";

interface AssetsData {
    connected: boolean;
    instituteName: string;
    assets: Array<{
        id: number;
        name: string;
        assetNumber: string;
        status: "Active" | "Inactive";
        installDate: Date | null;
        outlet: string;
        type: string;
        model: string;
    }>;
}

const fallbackAssets: AssetsData = {
    connected: false,
    instituteName: "Sample institute",
    assets: [],
};

function formatDate(date: Date | null) {
    if (!date) return "Not set";

    try {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date);
    } catch {
        return date.toISOString().slice(0, 10);
    }
}

async function loadInstituteAssets(id: number): Promise<AssetsData | null> {
    if (!process.env.DATABASE_URL) {
        return {
            ...fallbackAssets,
            instituteName: `Institute #${id}`,
        };
    }

    try {
        const institute = await prisma.institute.findUnique({
            where: { id },
            select: { id: true, name: true },
        });

        if (!institute) {
            return null;
        }

        const assets = await prisma.asset.findMany({
            where: { fkinstituteid: id },
            orderBy: [
                { installdate: "desc" },
                { id: "desc" },
            ],
            select: {
                id: true,
                name: true,
                assetnumber: true,
                installdate: true,
                active: true,
                outlet: { select: { name: true } },
                asset_type: { select: { name: true } },
                asset_model: { select: { name: true } },
            },
        });

        return {
            connected: true,
            instituteName: institute.name ?? `Institute #${institute.id}`,
            assets: assets.map((asset) => ({
                id: asset.id,
                name: asset.name ?? "Untitled asset",
                assetNumber: asset.assetnumber ?? "—",
                status: asset.active === 0 ? "Inactive" : "Active",
                installDate: asset.installdate ?? null,
                outlet: asset.outlet?.name ?? "—",
                type: asset.asset_type?.name ?? "—",
                model: asset.asset_model?.name ?? "—",
            })),
        };
    } catch (error) {
        console.error("Failed to load institute assets", error);
        return {
            ...fallbackAssets,
            instituteName: `Institute #${id}`,
        };
    }
}

export default async function InstituteAssetsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const instituteId = Number(id);

    if (!Number.isInteger(instituteId) || instituteId <= 0) {
        notFound();
    }

    const data = await loadInstituteAssets(instituteId);

    if (data === null) {
        notFound();
    }

    const hasAssets = data.assets.length > 0;

    return (
        <ResponsiveLayout title={`${data.instituteName} assets`}>
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <header className="flex flex-col gap-2 pb-8">
                    <Link
                        href="/institutes"
                        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
                    >
                        ← Back to institutes
                    </Link>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        {data.instituteName}
                    </h1>
                    <p className="max-w-2xl text-sm text-gray-600">
                        Review every registered asset for this institute, including placement, specification,
                        and installation details.
                    </p>
                    <div className="pt-2 text-xs font-medium">
                        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${data.connected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            <span className="inline-block h-2 w-2 rounded-full bg-current" />
                            {data.connected ? "Live data" : "Sample view (connect database)"}
                        </span>
                    </div>
                </header>

                {!hasAssets && (
                    <Card>
                        <EmptyState
                            icon="📦"
                            title={data.connected ? "No assets found" : "Database not connected"}
                            description={data.connected
                                ? "There are no assets associated with this institute yet."
                                : "Provide a database connection to load institute assets."}
                        />
                    </Card>
                )}

                {hasAssets && (
                    <Card
                        title={`${data.assets.length.toLocaleString()} asset${data.assets.length === 1 ? "" : "s"}`}
                        description="Arrange, inspect, and manage deployment details."
                    >
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                                <thead className="bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3">Asset</th>
                                        <th className="px-4 py-3">Placement</th>
                                        <th className="px-4 py-3">Specification</th>
                                        <th className="px-4 py-3">Install date</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.assets.map((asset) => (
                                        <tr key={asset.id} className="text-sm text-gray-700">
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900">{asset.name}</p>
                                                <p className="text-xs text-gray-500">#{asset.assetNumber}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p>{asset.outlet}</p>
                                                <p className="text-xs text-gray-500">{asset.type}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p>{asset.model}</p>
                                            </td>
                                            <td className="px-4 py-3">{formatDate(asset.installDate)}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${asset.status === "Active"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-rose-100 text-rose-700"}`}
                                                >
                                                    {asset.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </ResponsiveLayout>
    );
}
