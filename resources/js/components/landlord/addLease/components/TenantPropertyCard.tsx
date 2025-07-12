import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type React from 'react';
import type { LeaseFormData, RentalUnit } from '@/types/addLease.types';
import type { Tenant } from '@/types/addLease.types';

interface TenantPropertyCardProps {
    tenant_id: string;
    tenants: Tenant[];
    tenant?: Tenant;
    unit?: RentalUnit;
    isEditing?: boolean;
    availableUnits: RentalUnit[];
    unit_id: string;
    onInputChange: (field: keyof LeaseFormData, value: string) => void;
    onUnitChange: (unitId: string) => void;
    errors: Partial<Record<keyof LeaseFormData, string>>;
}

const TenantPropertyCard = ({tenant_id, onInputChange, tenants, errors, unit_id, onUnitChange, availableUnits, tenant, unit, isEditing}: TenantPropertyCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Tenant & Property Selection
                </CardTitle>
                <CardDescription>Select the tenant and rental unit for this lease</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isEditing ? (
                    // Edit mode: Show only tenant and unit information (read-only)
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Tenant</Label>
                            <div className="rounded-md text-sm">
                                {tenant ? `${tenant.user_name} (${tenant.email})` : 'No tenant selected'}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Rental Unit</Label>
                            <div className="rounded-md text-sm">
                                {unit ? `${unit.address} ${unit.unit_number ? `- Unit ${unit.unit_number}` : ''} ($${unit.rent_price}/month)` : 'No unit selected'}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Create mode: Show select dropdowns
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="tenant_id">Tenant *</Label>
                            <Select value={tenant_id} onValueChange={(value) => onInputChange('tenant_id', value)}>
                                <SelectTrigger className={errors.tenant_id ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select a tenant" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tenants.map((tenant) => (
                                        <SelectItem key={tenant.id} value={tenant.id.toString()}>
                                            {tenant.user_name} ({tenant.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.tenant_id && <p className="text-sm text-red-500">{errors.tenant_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="unit_id">Rental Unit *</Label>
                            <Select value={unit_id} onValueChange={onUnitChange}>
                                <SelectTrigger className={errors.unit_id ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select a rental unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableUnits.map((unit) => (
                                        <SelectItem key={unit.id} value={unit.id.toString()}>
                                            {unit.address} {unit.unit_number && `- Unit ${unit.unit_number}`} (${unit.rent_price}/month)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.unit_id && <p className="text-sm text-red-500">{errors.unit_id}</p>}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default TenantPropertyCard;
