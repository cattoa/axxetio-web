import Link from "next/link";

export default function MobileFormPage() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-8 px-4 py-10">
            <header className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    Mobile experience
                </p>
                <h1 className="text-3xl font-semibold text-gray-900">Quick asset capture</h1>
                <p className="text-sm text-gray-600">
                    Tailored for on-the-go technicians. Capture asset details, scan barcodes and upload photos
                    without leaving the floor.
                </p>
            </header>

            <form className="space-y-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
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
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="condition">
                        Condition
                    </label>
                    <select
                        id="condition"
                        name="condition"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="good">Good</option>
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
                        rows={3}
                        placeholder="Add context or observations"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                    Submit update
                </button>
            </form>

            <div className="text-center text-xs text-gray-500">
                Prefer the full desktop experience? <Link href="/forms/desktop" className="font-semibold text-emerald-600">Switch here</Link>.
            </div>
        </div>
    );
}
