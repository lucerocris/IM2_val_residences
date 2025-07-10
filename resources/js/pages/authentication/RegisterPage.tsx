'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Check, Eye, EyeOff, Lock, Mail, Phone, User, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface RegisterPageProps {
    errors?: Record<string, string>;
}

type RegisterData = {
    user_name: string;
    email: string;
    user_contact_number: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterPage({ errors = {} }: RegisterPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing } = useForm<RegisterData>({
        user_name: '',
        email: '',
        user_contact_number: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/register');
    };

    const handleInputChange = (field: keyof RegisterData, value: string) => {
        setData(field, value);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6">
            <div className="w-full max-w-4xl">
                <Card className="overflow-hidden p-0 shadow-lg">
                    <div className="flex max-h-[600px] flex-col lg:flex-row">
                        {/* Left side - Image placeholder */}
                        <div className="flex h-full items-center justify-center lg:w-1/2">
                            <img src="/images/authImage.png" alt="" className="h-[600px] w-full object-cover object-center" />
                        </div>

                        {/* Right side - Form */}
                        <div className="flex flex-col lg:w-1/2">
                            <CardHeader className="space-y-1 px-8 pt-8 text-center">
                                <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
                                <CardDescription>Enter your information to get started</CardDescription>
                            </CardHeader>

                            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                                <CardContent className="flex-1 space-y-4 px-8 py-4">
                                    {Object.keys(errors).length > 0 && (
                                        <Alert variant="destructive">
                                            <AlertDescription>
                                                {Object.values(errors).map((error, index) => (
                                                    <div key={index}>{error}</div>
                                                ))}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="user_name">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="user_name"
                                                name="user_name"
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={data.user_name}
                                                onChange={(e) => handleInputChange('user_name', e.target.value)}
                                                className={`pl-10 ${errors.user_name ? 'border-red-500' : ''}`}
                                                required
                                            />
                                        </div>
                                        {errors.user_name && <p className="text-sm text-red-600">{errors.user_name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={data.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                                required
                                            />
                                        </div>
                                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="contact_number">Contact Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="contact_number"
                                                name="contact_number"
                                                type="tel"
                                                placeholder="Enter your contact number"
                                                value={data.user_contact_number}
                                                onChange={(e) => handleInputChange('user_contact_number', e.target.value)}
                                                className={`pl-10 ${errors.user_contact_number ? 'border-red-500' : ''}`}
                                                required
                                            />
                                        </div>
                                        {errors.contact_number && <p className="text-sm text-red-600">{errors.contact_number}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Create a strong password"
                                                value={data.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                className={`pr-10 pl-10 ${errors.password ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="Confirm your password"
                                                value={data.password_confirmation}
                                                onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                                className="pr-10 pl-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                            {data.password_confirmation && (
                                                <div className="absolute top-3 right-10">
                                                    {data.password === data.password_confirmation ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full" disabled={processing}>
                                        {processing ? 'Creating account...' : 'Create account'}
                                    </Button>
                                    <div className="text-center text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                            Sign in
                                        </a>
                                    </div>

                                    {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}
                                </CardContent>
                            </form>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
