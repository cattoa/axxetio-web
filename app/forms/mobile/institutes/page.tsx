import Link from "next/link";
import { loadInstitutes } from "@/lib/institutes-data";

export default async function MobileInstitutes() {
    const data = await loadInstitutes();
    const hasInstitutes = data.institutes.length > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-900">Institutes</h1>
                    <Link href="/mobile" className="text-blue-600 text-sm">← Back</Link>
                </div>
            </div>

            <div className="px-3 py-4 max-w-full overflow-hidden">
                {/* Status indicator */}
                <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${data.connected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}>
                        <span className="inline-block h-2 w-2 rounded-full bg-current" />
                        {data.connected ? "Live data" : "Sample view"}
                    </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-2">Select an institute</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Choose an institute below to review its registered assets and outlets.
                </p>

                {!hasInstitutes && (
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-4xl mb-3">🏛️</div>
                        <h3 className="font-medium text-gray-900 mb-2 text-sm">
                            {data.connected ? "No institutes found" : "Database not connected"}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {data.connected
                                ? "Create an institute to start managing assets."
                                : "Provide a database connection to load institute data."}
                        </p>
                    </div>
                )}

                {hasInstitutes && (
                    <div className="space-y-3">
                        {data.institutes.map((institute) => (
                            <div key={institute.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="p-3">
                                    <div className="flex justify-between items-start mb-3 gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 text-sm truncate">{institute.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${institute.active ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-600"
                                                    }`}>
                                                    {institute.active ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-600 mb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs">Assets:</span>
                                            <span className="font-medium text-xs">{institute.assetCount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs">Outlets:</span>
                                            <span className="font-medium text-xs">{institute.outletCount.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/mobile/institutes/${institute.id}/assets`}
                                        className="block w-full bg-blue-600 text-white text-center py-2.5 rounded-lg font-medium text-sm"
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