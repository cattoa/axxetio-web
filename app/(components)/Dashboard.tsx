'use client';

import React from 'react';
import { ResponsiveLayout } from '@/app/(components)/layout/ResponsiveLayout';

interface DashboardProps {
    statCards: { label: string; value: number }[];
    data: {
        connected: boolean;
        stats: {
            assets: number;
            institutes: number;
            outlets: number;
            customers: number;
            assetTypes: number;
            devices: number;
        };
        recentAssets: {
            id: number;
            name: string;
            assetNumber: string;
            outlet: string;
            institute: string;
            type: string;
            make: string;
            model: string;
            installDate: Date | null;
            status: "Active" | "Inactive";
        }[];
        recentActivity: {
            id: number;
            actionType: string;
            actionDate: Date | null;
            assetName: string;
            assetNumber: string | null;
            location: string | null;
        }[];
        topCustomers: {
            id: number;
            name: string;
            outletCount: number;
            active: boolean;
        }[];
    };
}

const formatDate = (date: Date | null) => {
    if (!date) {
        return "Not set";
    }

    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const formatDateTime = (date: Date | null) => {
    if (!date) {
        return "Not recorded";
    }

    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export function Dashboard({ statCards, data }: DashboardProps) {
    return (
        <ResponsiveLayout title="Portfolio overview" >
            <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
                <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
                    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                                Operations dashboard
                            </p>
                            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
                                Portfolio overview
                            </h1>
                            <p className="mt-2 max-w-xl text-sm text-foreground/70">
                                Monitor the health of institutes, outlets, assets and supporting
                                devices in one responsive view. All sections adapt gracefully from
                                mobile to desktop.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-foreground/70">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${data.connected
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                }`}>
                                <span className="inline-block h-2 w-2 rounded-full bg-current" />
                                {data.connected ? "Live data" : "Sample view (connect database)"}
                            </span>
                        </div>
                    </header>

                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {statCards.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-foreground/10 bg-white/60 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-white/5"
                            >
                                <p className="text-sm font-medium text-foreground/70">
                                    {stat.label}
                                </p>
                                <p className="mt-3 text-3xl font-semibold text-foreground">
                                    {stat.value.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </section>

                    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                        <div className="rounded-2xl border border-foreground/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-foreground">
                                    Recent assets
                                </h2>
                                <span className="text-xs font-medium uppercase tracking-wide text-foreground/60">
                                    Last 6 records
                                </span>
                            </div>
                            <div className="mt-4 overflow-x-auto">
                                <table className="min-w-full divide-y divide-foreground/10 text-left text-sm">
                                    <thead className="text-xs uppercase tracking-wide text-foreground/60">
                                        <tr>
                                            <th className="py-2 pr-4">Asset</th>
                                            <th className="px-4 py-2">Placement</th>
                                            <th className="px-4 py-2">Specification</th>
                                            <th className="px-4 py-2">Install date</th>
                                            <th className="px-4 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-foreground/5">
                                        {data.recentAssets.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="py-6 text-center text-sm text-foreground/60"
                                                >
                                                    No asset records available yet.
                                                </td>
                                            </tr>
                                        )}
                                        {data.recentAssets.map((asset) => (
                                            <tr key={asset.id} className="text-sm">
                                                <td className="py-3 pr-4">
                                                    <p className="font-medium text-foreground">
                                                        {asset.name}
                                                    </p>
                                                    <p className="text-xs text-foreground/60">
                                                        #{asset.assetNumber}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-foreground/70">
                                                    <p>{asset.outlet}</p>
                                                    <p className="text-xs text-foreground/50">
                                                        {asset.institute}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-foreground/70">
                                                    <p>{asset.type}</p>
                                                    <p className="text-xs text-foreground/50">
                                                        {asset.make} · {asset.model}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-foreground/70">
                                                    {formatDate(asset.installDate)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${asset.status === "Active"
                                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                                            }`}
                                                    >
                                                        {asset.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="rounded-2xl border border-foreground/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                                <h2 className="text-lg font-semibold text-foreground">
                                    Recent activity
                                </h2>
                                <ul className="mt-4 space-y-4 text-sm">
                                    {data.recentActivity.length === 0 && (
                                        <li className="text-foreground/60">
                                            No activity recorded yet.
                                        </li>
                                    )}
                                    {data.recentActivity.map((activity) => (
                                        <li key={activity.id} className="flex flex-col gap-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-foreground">
                                                    {activity.actionType}
                                                </p>
                                                <span className="text-xs text-foreground/50">
                                                    {formatDateTime(activity.actionDate)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-foreground/70">
                                                {activity.assetName}
                                                {activity.assetNumber ? ` · #${activity.assetNumber}` : ""}
                                            </p>
                                            {activity.location && (
                                                <p className="text-xs text-foreground/50">
                                                    {activity.location}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-foreground/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                                <h2 className="text-lg font-semibold text-foreground">
                                    Customer footprint
                                </h2>
                                <ul className="mt-4 space-y-3 text-sm">
                                    {data.topCustomers.length === 0 && (
                                        <li className="text-foreground/60">No customers captured yet.</li>
                                    )}
                                    {data.topCustomers.map((customer) => (
                                        <li key={customer.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {customer.name}
                                                </p>
                                                <p className="text-xs text-foreground/50">
                                                    {customer.outletCount} outlet
                                                    {customer.outletCount === 1 ? "" : "s"}
                                                </p>
                                            </div>
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${customer.active
                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                    }`}
                                            >
                                                {customer.active ? "Active" : "On hold"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </ResponsiveLayout>
    );
}
