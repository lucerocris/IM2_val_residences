import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Home, MapPin, MoreHorizontal, Trash2 } from 'lucide-react';

export type Unit = {
    id: string;
    landlord_id: string;
    landlord: {
        id: string;
        user_name: string;
        email: string;
        user_contact_number: string;
    };
    address: string;
    unit_number: string | null;
    availability_status: 'available' | 'occupied' | 'maintenance' | 'unavailable';
    floor_area: number | null;
    rent_price: number;
    property_type: 'duplex' | 'triplex';
    description: string | null;
    amenities: string[] | null;
    unit_photos: string[] | null;
    created_at: string;
    updated_at: string;
};

const handleDelete = (unitID: string)=> {
    if (confirm('Are you sure you want to delete this unit?')) {
        router.delete(`/landlord/properties/${unitID}`, {
            preserveScroll: true,
        });
    }
}

export const propertyColumns: ColumnDef<Unit>[] = [
    {
        accessorKey: 'unit_photos',
        header: () => {
            return (
                <>
                    <p className="pl-3">Images</p>
                </>
            )
        },
        cell: ({ row }) => {
            const photos = row.getValue('unit_photos') as string[] | null;
            const primaryPhoto = photos && Array.isArray(photos) && photos.length > 0 ? photos[0] : null;
            console.log(primaryPhoto);
            return (
                <div className="pl-3 flex items-center justify-center">
                    {primaryPhoto ? (
                        <div className="relative">
                            <img
                                src={primaryPhoto}
                                alt={`${row.original.address} ${row.original.unit_number || ''}`}
                                width={50}
                                height={40}
                                className="rounded-md object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-10 w-12 items-center justify-center rounded-md bg-muted">
                            <Home className="h-4 w-4 text-muted-foreground" />
                        </div>
                    )}
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: 'address',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Property Address
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const address = row.getValue('address') as string;
            const unitNumber = row.original.unit_number;

            return (
                <div className="pl-4 flex max-w-[200px] flex-col">
                    <span className="truncate font-medium">{address}</span>
                    {unitNumber && <span className="text-xs text-muted-foreground">Unit: {unitNumber}</span>}
                    <span className="text-xs text-muted-foreground">ID: {row.original.id}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'property_type',
        header: 'Property Type',
        cell: ({ row }) => {
            const type = row.getValue('property_type') as string;

            const typeConfig = {
                duplex: {
                    backgroundColor: '#dbeafe',
                    color: '#2563eb',
                    borderColor: '#bfdbfe',
                },
                triplex: {
                    backgroundColor: '#f3e8ff',
                    color: '#7c3aed',
                    borderColor: '#e9d5ff',
                },
            };

            const config = typeConfig[type as keyof typeof typeConfig] || {
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                borderColor: '#e5e7eb',
            };

            return (
                <Badge
                    variant="secondary"
                    className="font-medium capitalize"
                    style={{
                        backgroundColor: config.backgroundColor,
                        color: config.color,
                        borderColor: config.borderColor,
                        border: '1px solid',
                    }}
                >
                    {type}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'availability_status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('availability_status') as string;

            const statusConfig = {
                available: {
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    borderColor: '#bbf7d0',
                    label: 'Available',
                },
                occupied: {
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    borderColor: '#fecaca',
                    label: 'Occupied',
                },
                maintenance: {
                    backgroundColor: '#fef3c7',
                    color: '#d97706',
                    borderColor: '#fde68a',
                    label: 'Maintenance',
                },
                unavailable: {
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    borderColor: '#e5e7eb',
                    label: 'Unavailable',
                },
            };

            const config = statusConfig[status as keyof typeof statusConfig];

            return (
                <Badge
                    variant="secondary"
                    className="font-medium"
                    style={{
                        backgroundColor: config.backgroundColor,
                        color: config.color,
                        borderColor: config.borderColor,
                        border: '1px solid',
                    }}
                >
                    {config.label}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'rent_price',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="whitespace-nowrap">
                    Rent Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const price = Number.parseFloat(row.getValue('rent_price'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP',
            }).format(price);

            return <span className="pl-4 font-medium">{formatted}</span>;
        },
    },
    {
        accessorKey: 'floor_area',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Floor Area
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const raw = row.getValue('floor_area');
            const area = Number(raw);

            return Number.isFinite(area) && area > 0 ? <span className="pl-3">{Math.round(area)} sq ft</span> : <span className="text-muted-foreground">N/A</span>;
        },
    },
    {
        accessorKey: 'amenities',
        header: 'Amenities',
        cell: ({ row }) => {
            const amenities = row.getValue('amenities') as Record<string, any> | null;

            // Check if amenities exists and is an object
            if (!amenities || typeof amenities !== 'object') {
                return <span className="text-muted-foreground">None listed</span>;
            }

            // Convert amenities object to display-friendly format
            const amenityDisplays: string[] = [];

            // Handle specific amenities with better formatting
            if (amenities.floors) {
                amenityDisplays.push(`${amenities.floors} Floor${amenities.floors > 1 ? 's' : ''}`);
            }
            if (amenities.bedrooms) {
                amenityDisplays.push(`${amenities.bedrooms} BR`);
            }
            if (amenities.bathrooms) {
                amenityDisplays.push(`${amenities.bathrooms} Bath`);
            }
            if (amenities.balcony === true) {
                amenityDisplays.push('Balcony');
            }
            if (amenities.parking === true) {
                amenityDisplays.push('Parking');
            }
            if (amenities.tile_floors === true) {
                amenityDisplays.push('Tile Floors');
            }
            if (amenities.dirty_kitchen === true) {
                amenityDisplays.push('Dirty Kitchen');
            }
            if (amenities.pet_friendly === true) {
                amenityDisplays.push('Pet Friendly');
            }

            if (amenityDisplays.length === 0) {
                return <span className="text-muted-foreground">None listed</span>;
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {amenityDisplays.slice(0, 3).map((amenity, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs font-medium"
                            style={{
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                borderColor: '#e2e8f0',
                                border: '1px solid',
                            }}
                        >
                            {amenity}
                        </Badge>
                    ))}
                    {amenityDisplays.length > 3 && (
                        <Badge
                            variant="secondary"
                            className="text-xs font-medium"
                            style={{
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                borderColor: '#e2e8f0',
                                border: '1px solid',
                            }}
                        >
                            +{amenityDisplays.length - 3} more
                        </Badge>
                    )}
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Date Added
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'));
            return (
                <div className="pl-3 flex flex-col">
                    <span>{date.toLocaleDateString()}</span>
                    <span className="text-xs text-muted-foreground">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const property = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.visit(`/landlord/properties/${property.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit property
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(property.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete property
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
