import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import {
    ChevronRight,
    ChevronsUpDown,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
    Home,
    Users,
    DollarSign,
    Wrench,
    HelpCircle,
    File
} from 'lucide-react';
import React from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SubMenuItem {
    name: string;
    href: string;
}

interface NavigationType {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
    submenu?: SubMenuItem[];
}

const dashboardNavigation: NavigationType[] = [
    {
        name: 'Dashboard',
        href: '/landlord/dashboard',
        icon: LayoutDashboard,
    },
];

const propertiesNavigation: NavigationType[] = [
    {
        name: 'Properties',
        href: 'properties',
        icon: Home,
        submenu: [
            {
                name: 'My Properties',
                href: '/landlord/properties',
            },
            {
                name: 'Add Property',
                href: '/landlord/properties/create',
            },
        ],
    },
];

const tenantsNavigation: NavigationType[] = [
    {
        name: 'Tenants',
        href: 'tenants',
        icon: Users,
        submenu: [
            {
                name: 'Current Tenants',
                href: '/landlord/tenants',
            },
            {
                name: 'Applications',
                href: '/landlord/applications',
            },
            {
                name: 'Add Tenant',
                href: '/landlord/tenants/create',
            },
        ],
    },
];

const leaseNavigation: NavigationType[] = [
    {
        name: 'Leases',
        href: 'leases',
        icon: File,
        submenu: [
            {
                name: 'Leases',
                href: '/landlord/leases',
            },
            {
                name: 'Add Lease',
                href: '/landlord/leases/create',
            },
        ]
    }
]


const paymentsNavigation: NavigationType[] = [
    {
        name: 'Payments',
        href: 'payments',
        icon: DollarSign,
        submenu: [
            {
                name: 'Rent Collection',
                href: '/landlord/payments/rent-collection',
            },
        ],
    },
];

const maintenanceNavigation: NavigationType[] = [
    {
        name: 'Maintenance',
        href: 'maintenance',
        icon: Wrench,
        submenu: [
            {
                name: 'Requests',
                href: '/landlord/maintenance/requests',
            },
        ],
    },
];

const usersNavigation: NavigationType[] = [
    {
        name: 'Users',
        href: 'users',
        icon: Users,
        submenu: [
            {
                name: 'Users',
                href: '/landlord/users',
            },
        ],
    },
];

const user = {
    name: 'Simon Lawrence Jemuel Yu',
    email: 'simonlawrencejemuelyu@gmail.com',
    avatar: '/images/jimmy.jpg',
};

const LandlordSidebar = () => {
    const renderNavigationGroup = (items: NavigationType[], hasSubmenu: boolean = true) => {
        return items.map((item) => {
            const IconComponent = item.icon;
            if (item.submenu && hasSubmenu) {
                return (
                    <Collapsible key={item.name} asChild className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.name}>
                                    <IconComponent size={16} />
                                    <span>{item.name}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.submenu.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.name}>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={subItem.href}>
                                                    <span>{subItem.name}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                );
            }

            return (
                <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild tooltip={item.name}>
                        <Link href={item.href}>
                            <IconComponent size={16} />
                            <span>{item.name}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );
        });
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader>
                    <div className="flex items-center gap-2 py-2">
                        {/* Icon stays visible in collapsed state */}
                        <div className="flex size-8 items-center justify-center">
                            <img src="/images/Val.svg" alt="" className="w-20 h-20" />
                        </div>

                        {/* This section hides in collapsed icon mode */}
                        <div className="grid flex-1 text-left group-data-[collapsible=icon]:hidden">
                            <span className="truncate text-xs font-semibold">Val Residences</span>
                            <span className="text-sidebar-foreground/70 truncate text-xs">Apartment Management System</span>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {renderNavigationGroup(dashboardNavigation, false)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Property & Tenant Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {renderNavigationGroup(propertiesNavigation)}
                            {renderNavigationGroup(tenantsNavigation)}
                            {renderNavigationGroup(leaseNavigation)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Operations</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {renderNavigationGroup(paymentsNavigation)}
                            {renderNavigationGroup(maintenanceNavigation)}
                            {renderNavigationGroup(usersNavigation)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    tooltip={`${user.name} (${user.email})`}
                                >
                                    <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-green-500 to-teal-600">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="size-8 rounded-lg object-cover" />
                                        ) : (
                                            <span className="text-sm font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                        <span className="truncate font-semibold">{user.name}</span>
                                        <span className="text-sidebar-foreground/70 truncate text-xs">{user.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2">
                                        <User className="size-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="flex items-center gap-2">
                                        <Settings className="size-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/help" className="flex items-center gap-2">
                                        <HelpCircle className="size-4" />
                                        Help & Support
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center gap-2 text-red-600 hover:text-red-700"
                                    >
                                        <LogOut className="size-4" />
                                        Sign out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default LandlordSidebar;
