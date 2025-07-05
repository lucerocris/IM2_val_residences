'use client';

import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LandlordLayout from '@/layout/LandlordLayout';
import { router, useForm } from '@inertiajs/react';
import { Briefcase, Calendar, Mail, Phone, Save, User } from 'lucide-react';
import type React from 'react';

interface TenantFormData {
    user_name: string;
    email: string;
    user_contact_number: string;
    password: string;
    password_confirmation: string;
    move_in_date: string;
    employment_status: string;
    emergency_contact: string;
    tenant_occupation: string;
    current_address: string;
    monthly_income: string;
    user_type: string;
    // Allow additional dynamic fields to satisfy Inertia's FormDataType constraint
    [key: string]: string | number | boolean | Blob | File | null | (string | number | boolean | Blob | File | null)[];
}

export default function AddTenant() {
    const { data, setData, post, processing, errors, reset } = useForm<TenantFormData>({
        user_name: '',
        email: '',
        user_contact_number: '',
        password: '',
        password_confirmation: '',
        move_in_date: '',
        employment_status: '',
        emergency_contact: '',
        tenant_occupation: '',
        current_address: '',
        monthly_income: '',
        user_type: 'tenant',
    });

    const handleInputChange = (field: keyof TenantFormData, value: string) => {
        setData(field, value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        post('/landlord/tenants', {
            onSuccess: () => {
                router.visit('/landlord/tenants');
            },
            onError: (errors: Record<string, string>) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    const handleCancel = () => {
        router.visit('/landlord/tenants');
    };

    return (
        <LandlordLayout>
            <div className="space-y-6">
                {/* Header */}
                <LandlordPageHeader title={'Add Tenant'} subtitle={'Create a new tenant account'} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
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
                                        value={data.user_name}
                                        onChange={(e) => handleInputChange('user_name', e.target.value)}
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
                                            value={data.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
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
                                            value={data.user_contact_number}
                                            onChange={(e) => handleInputChange('user_contact_number', e.target.value)}
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
                                        value={data.emergency_contact}
                                        onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
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
                                    value={data.current_address}
                                    onChange={(e) => handleInputChange('current_address', e.target.value)}
                                    className={errors.current_address ? 'border-red-500' : ''}
                                />
                                {errors.current_address && <p className="text-sm text-red-500">{errors.current_address}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Employment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Employment Information
                            </CardTitle>
                            <CardDescription>Employment and financial details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="tenant_occupation">Occupation</Label>
                                    <Input
                                        id="tenant_occupation"
                                        placeholder="Software Engineer"
                                        value={data.tenant_occupation}
                                        onChange={(e) => handleInputChange('tenant_occupation', e.target.value)}
                                        className={errors.tenant_occupation ? 'border-red-500' : ''}
                                    />
                                    {errors.tenant_occupation && <p className="text-sm text-red-500">{errors.tenant_occupation}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="employment_status">Employment Status</Label>
                                    <Select value={data.employment_status} onValueChange={(value) => handleInputChange('employment_status', value)}>
                                        <SelectTrigger className={errors.employment_status ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select employment status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="full_time">Full Time</SelectItem>
                                            <SelectItem value="part_time">Part Time</SelectItem>
                                            <SelectItem value="contract">Contract</SelectItem>
                                            <SelectItem value="self_employed">Self Employed</SelectItem>
                                            <SelectItem value="unemployed">Unemployed</SelectItem>
                                            <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="retired">Retired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.employment_status && <p className="text-sm text-red-500">{errors.employment_status}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="monthly_income">Monthly Income</Label>
                                    <Input
                                        id="monthly_income"
                                        type="number"
                                        placeholder="5000"
                                        value={data.monthly_income}
                                        onChange={(e) => handleInputChange('monthly_income', e.target.value)}
                                        className={errors.monthly_income ? 'border-red-500' : ''}
                                    />
                                    {errors.monthly_income && <p className="text-sm text-red-500">{errors.monthly_income}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="move_in_date">Preferred Move-in Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="move_in_date"
                                            type="date"
                                            value={data.move_in_date}
                                            onChange={(e) => handleInputChange('move_in_date', e.target.value)}
                                            className={`pl-10 ${errors.move_in_date ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.move_in_date && <p className="text-sm text-red-500">{errors.move_in_date}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Security</CardTitle>
                            <CardDescription>Set up login credentials for the tenant</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password *</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        value={data.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={errors.password ? 'border-red-500' : ''}
                                    />
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirm Password *</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={data.password_confirmation}
                                        onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                        className={errors.password_confirmation ? 'border-red-500' : ''}
                                    />
                                    {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-32">
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Creating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Create Tenant
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </LandlordLayout>
    );
}
