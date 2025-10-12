import Link from "next/link";
import { loadInstitutes } from "@/lib/institutes-data";

export default async function TabletInstitutes() {
    const data = await loadInstitutes();
    const hasInstitutes = data.institutes.length > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Tablet header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/tablet" className="text-blue-600 hover:text-blue-700">← Dashboard</Link>
                        <h1 className="text-xl font-bold text-gray-900">Institutes</h1>
                    </div>
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${data.connected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}>
                        <span className="inline-block h-2 w-2 rounded-full bg-current" />
                        {data.connected ? "Live data" : "Sample view"}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select an institute</h2>
                    <p className="text-gray-600 max-w-2xl">
                        Choose an institute below to review its registered assets and outlets.
                        Each card shows the current status and asset counts for the institute.
                    </p>
                </div>

                {!hasInstitutes && (
                    <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
                        <div className="text-6xl mb-4">🏛️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {data.connected ? "No institutes found" : "Database not connected"}
                        </h3>
                        <p className="text-gray-500">
                            {data.connected
                                ? "Create an institute to start managing assets."
                                : "Provide a database connection to load institute data."}
                        </p>
                    </div>
                )}

                {hasInstitutes && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.institutes.map((institute) => (
                            <div key={institute.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">{institute.name}</h3>
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${institute.active ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-600"
                                            }`}>
                                            {institute.active ? "Active" : "Inactive"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{institute.assetCount}</div>
                                            <div className="text-sm text-gray-600">Assets</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{institute.outletCount}</div>
                                            <div className="text-sm text-gray-600">Outlets</div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4">
                                        Review all assets registered for {institute.name} and drill into placement details.
                                    </p>

                                    <Link
                                        href={`/tablet/institutes/${institute.id}/assets`}
                                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
                                    >
                                        View Assets
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}