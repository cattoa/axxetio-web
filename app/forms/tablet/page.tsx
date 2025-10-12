import Link from "next/link";

export default function TabletFormPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Tablet header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/tablet" className="text-blue-600 hover:text-blue-700">← Dashboard</Link>
                        <h1 className="text-xl font-bold text-gray-900">Asset Management Form</h1>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Tablet experience
                    </p>
                </div>
            </div>

            {/* Two-column layout for tablet */}
            <div className="flex">
                {/* Form sidebar */}
                <div className="w-96 bg-white border-r border-gray-200 p-6">
                    <div className="space-y-1 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Asset Details</h2>
                        <p className="text-sm text-gray-600">
                            Optimized for tablet interfaces. Balance between mobile convenience and desktop features.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="assetNumber">
                                Asset number
                            </label>
                            <input
                                id="assetNumber"
                                name="assetNumber"
                                type="text"
                                required
                                placeholder="Scan or type"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="location">
                                Location
                            </label>
                            <select
                                id="location"
                                name="location"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="">Select location</option>
                                <option value="building-a">Building A</option>
                                <option value="building-b">Building B</option>
                                <option value="warehouse">Warehouse</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="condition">
                                Condition
                            </label>
                            <select
                                id="condition"
                                name="condition"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="maintenance">Needs maintenance</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="notes">
                                Notes
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows={4}
                                placeholder="Add context, observations, or maintenance notes"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div className="space-y-3">
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            >
                                Submit update
                            </button>
                            <button
                                type="button"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Save as draft
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview/info panel */}
                <div className="flex-1 p-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Form Preview</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-700">Device Type:</span>
                                <span className="ml-2 text-gray-600">Tablet (Touch-optimized)</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Features:</span>
                                <ul className="ml-2 mt-1 list-disc list-inside text-gray-600 space-y-1">
                                    <li>Touch-friendly form controls</li>
                                    <li>Two-column layout for better screen utilization</li>
                                    <li>Extended field options compared to mobile</li>
                                    <li>Draft saving capability</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">Switch to other experiences:</p>
                            <div className="flex gap-2">
                                <Link
                                    href="/forms/mobile"
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                >
                                    Mobile
                                </Link>
                                <Link
                                    href="/forms/desktop"
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200"
                                >
                                    Desktop
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
