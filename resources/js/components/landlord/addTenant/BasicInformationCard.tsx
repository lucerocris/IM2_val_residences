import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TenantFormData } from '@/types/addTenant.types';
import type React from 'react';


interface BasicInformationCardProps {
    user_name: string;
    email: string;
    user_contact_number: string;
    current_address: string;
    emergency_contact: string;
    errors: Partial<Record<keyof TenantFormData, string>>;
    onInputChange: (field: keyof TenantFormData, value: string) => void;
}

const BasicInformationCard = ({user_name, email, user_contact_number, emergency_contact, current_address, onInputChange, errors}: BasicInformationCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                </CardTitle>
                <CardDescription>Basic details about the tenant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="user_name">Full Name *</Label>
                        <Input
                            id="user_name"
                            placeholder="John Doe"
                            value={user_name}
                            onChange={(e) => onInputChange('user_name', e.target.value)}
                            className={errors.user_name ? 'border-red-500' : ''}
                        />
                        {errors.user_name && <p className="text-sm text-red-500">{errors.user_name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={email}
                                onChange={(e) => onInputChange('email', e.target.value)}
                                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="user_contact_number">Contact Number *</Label>
                        <div className="relative">
                            <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="user_contact_number"
                                placeholder="+1 (555) 123-4567"
                                value={user_contact_number}
                                onChange={(e) => onInputChange('user_contact_number', e.target.value)}
                                className={`pl-10 ${errors.user_contact_number ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {errors.user_contact_number && <p className="text-sm text-red-500">{errors.user_contact_number}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emergency_contact">Emergency Contact</Label>
                        <Input
                            id="emergency_contact"
                            placeholder="Emergency contact number"
                            value={emergency_contact}
                            onChange={(e) => onInputChange('emergency_contact', e.target.value)}
                            className={errors.emergency_contact ? 'border-red-500' : ''}
                        />
                        {errors.emergency_contact && <p className="text-sm text-red-500">{errors.emergency_contact}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="current_address">Current Address</Label>
                    <Input
                        id="current_address"
                        placeholder="123 Current Street, City, State"
                        value={current_address}
                        onChange={(e) => onInputChange('current_address', e.target.value)}
                        className={errors.current_address ? 'border-red-500' : ''}
                    />
                    {errors.current_address && <p className="text-sm text-red-500">{errors.current_address}</p>}
                </div>
            </CardContent>
        </Card>
    )
}

export default BasicInformationCard;
