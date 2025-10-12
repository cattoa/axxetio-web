import Link from "next/link";
import { loadInstitutes } from "@/lib/institutes-data";
import { Card, EmptyState, ResponsiveGrid, ResponsiveLayout } from "@/app/(components)/layout/ResponsiveLayout";

export default async function DesktopInstitutes() {
    const data = await loadInstitutes();
    const hasInstitutes = data.institutes.length > 0;

    return (
        <ResponsiveLayout title="Institutes">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <header className="flex flex-col gap-2 pb-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Administration
                    </p>
                    <h1 className="text-3xl font-semibold text-gray-900">Select an institute</h1>
                    <p className="max-w-2xl text-sm text-gray-600">
                        Choose an institute below to review its registered assets and outlets. If the database
                        connection is unavailable you will see a placeholder state instead.
                    </p>
                    <div className="pt-2 text-xs font-medium">
                        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${data.connected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            <span className="inline-block h-2 w-2 rounded-full bg-current" />
                            {data.connected ? "Live data" : "Sample view (connect database)"}
                        </span>
                    </div>
                </header>

                {!hasInstitutes && (
                    <Card>
                        <EmptyState
                            icon="🏛️"
                            title={data.connected ? "No institutes found" : "Database not connected"}
                            description={data.connected
                                ? "Create an institute to start managing assets."
                                : "Provide a database connection to load institute data."}
                        />
                    </Card>
                )}

                {hasInstitutes && (
                    <ResponsiveGrid cols={3} gap="lg">
                        {data.institutes.map((institute) => (
                            <Card
                                key={institute.id}
                                title={
                                    <span className="flex items-center gap-2">
                                        <span>{institute.name}</span>
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${institute.active ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-600"}`}>
                                            {institute.active ? "Active" : "Inactive"}
                                        </span>
                                    </span>
                                }
                                description={`${institute.assetCount.toLocaleString()} asset${institute.assetCount === 1 ? "" : "s"} · ${institute.outletCount.toLocaleString()} outlet${institute.outletCount === 1 ? "" : "s"}`}
                                actions={
                                    <Link
                                        href={`/desktop/institutes/${institute.id}/assets`}
                                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                    >
                                        View assets
                                    </Link>
                                }
                            >
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>
                                        Quickly review all assets registered for <strong>{institute.name}</strong> and
                                        drill into placement details.
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </ResponsiveGrid>
                )}
            </div>
        </ResponsiveLayout>
    );
}