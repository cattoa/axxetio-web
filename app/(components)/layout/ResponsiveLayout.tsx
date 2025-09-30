'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export function ResponsiveLayout({ children, title }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = [
        { name: 'Dashboard', href: '/', icon: '📊' },
        { name: 'Users', href: '/users', icon: '👥' },
        { name: 'Teams', href: '/teams', icon: '🤽' },
        { name: 'Players', href: '/players', icon: '🤽' },
        { name: 'Clubs', href: '/clubs', icon: '🏢' },
        { name: 'Institutes', href: '/institutes', icon: '🏛️' },
        { name: 'Competitions', href: '/competitions', icon: '🏆' },
        { name: 'Matches', href: '/matches', icon: '📅' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
                </div>
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="h-10 w-10 rounded-full border-2 border-black overflow-hidden flex-shrink-0 relative">
                            <Image
                                src="/favicon-32.png"
                                alt="Art of Water Polo"
                                fill
                                sizes="40px"
                                className="object-cover logo_bg"
                            />
                        </div>
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                            <span className="hidden sm:inline">Art of Water Polo</span>
                            <span className="sm:hidden">AOW</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 flex-shrink-0"
                    >
                        <span className="sr-only">Close sidebar</span>
                        ✕
                    </button>
                </div>

                <nav className="mt-8 px-4">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col lg:ml-0">
                {/* Top navigation */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        <div className="flex items-center min-w-0 flex-1">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 mr-2 flex-shrink-0"
                            >
                                <span className="sr-only">Open sidebar</span>
                                ☰
                            </button>
                            {title && (
                                <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
                            )}
                        </div>

                        <div className="flex items-center space-x-4 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full border-2 border-black overflow-hidden flex-shrink-0 relative">
                                <Image
                                    src="/favicon-32.png"
                                    alt="Art of Water Polo"
                                    fill
                                    sizes="40px"
                                    className="object-cover logo_bg flip-x"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto">
                    <div className="py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

interface CardProps {
    children: React.ReactNode;
    title?: string | React.ReactNode;
    description?: string;
    className?: string;
    actions?: React.ReactNode;
}

export function Card({ children, title, description, className, actions }: CardProps) {
    return (
        <div className={cn("bg-white shadow-sm rounded-lg border border-gray-200", className)}>
            {(title || description || actions) && (
                <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                        <div>
                            {title && (
                                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                            )}
                            {description && (
                                <p className="mt-1 text-sm text-gray-500">{description}</p>
                            )}
                        </div>
                        {actions && (
                            <div className="ml-4 flex-shrink-0">{actions}</div>
                        )}
                    </div>
                </div>
            )}
            <div className="px-4 py-5 sm:p-6">
                {children}
            </div>
        </div>
    );
}

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: string;
}

export function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
    const trendColors = {
        up: 'text-green-600',
        down: 'text-red-600',
        neutral: 'text-gray-600',
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {icon && (
                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                                <span className="text-lg">{icon}</span>
                            </div>
                        )}
                    </div>
                    <div className="ml-4 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                                {change && trend && (
                                    <div className={cn("ml-2 flex items-baseline text-sm", trendColors[trend])}>
                                        <span>{change}</span>
                                    </div>
                                )}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ResponsiveGridProps {
    children: React.ReactNode;
    cols?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ResponsiveGrid({ children, cols = 1, gap = 'md', className }: ResponsiveGridProps) {
    const colsClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const gapClasses = {
        sm: 'gap-3',
        md: 'gap-4 sm:gap-6',
        lg: 'gap-6 sm:gap-8',
    };

    return (
        <div className={cn(
            'grid',
            colsClasses[cols],
            gapClasses[gap],
            className
        )}>
            {children}
        </div>
    );
}

interface EmptyStateProps {
    icon?: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            {icon && (
                <div className="mx-auto h-12 w-12 text-gray-400 text-4xl mb-4">
                    {icon}
                </div>
            )}
            <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            {action && (
                <div className="mt-6">
                    <button
                        onClick={action.onClick}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {action.label}
                    </button>
                </div>
            )}
        </div>
    );
}