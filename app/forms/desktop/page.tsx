import Link from "next/link";

export default function DesktopFormPage() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-8 py-12">
            <header className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Desktop console
                </p>
                <h1 className="text-4xl font-semibold text-gray-900">Asset intake and deployment</h1>
                <p className="max-w-2xl text-sm text-gray-600">
                    Optimised for fleet managers capturing bulk updates. Review equipment staging, assign outlets,
                    and synchronise asset metadata with a single workflow.
                </p>
            </header>

            <form className="grid grid-cols-1 gap-8 rounded-3xl border border-blue-100 bg-white p-10 shadow-sm lg:grid-cols-2">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700" htmlFor="assetNumber">
                        Asset number
                    </label>
                    <input
                        id="assetNumber"
                        name="assetNumber"
                        type="text"
                        required
                        placeholder="e.g. AS-1032"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700" htmlFor="institute">
                        Institute
                    </label>
                    <select
                        id="institute"
                        name="institute"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option>Select institute</option>
                        <option value="axxetio">Axxetio Institute</option>
                        <option value="sunset">Sunset Hospitality</option>
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700" htmlFor="outlet">
                        Outlet / Placement
                    </label>
                    <input
                        id="outlet"
                        name="outlet"
                        type="text"
                        placeholder="e.g. Rooftop Bar"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700" htmlFor="status">
                        Deployment status
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="active">Active</option>
                        <option value="maintenance">Scheduled maintenance</option>
                        <option value="decommissioned">Decommissioned</option>
                    </select>
                </div>

                <div className="space-y-3 lg:col-span-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="notes">
                        Internal notes
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={5}
                        placeholder="Add deployment notes, service history or requirements"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        Save asset
                    </button>
                    <button
                        type="button"
                        className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                    >
                        Save draft
                    </button>
                </div>
            </form>

            <div className="text-center text-xs text-gray-500">
                Need the mobile collection flow? <Link href="/forms/mobile" className="font-semibold text-blue-600">Switch here</Link>.
            </div>
        </div>
    );
}
