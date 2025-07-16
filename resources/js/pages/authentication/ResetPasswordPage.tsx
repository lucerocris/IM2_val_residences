// resources/js/Pages/Auth/ResetPassword.tsx
'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { ResetPasswordData, AuthPageProps } from '@/types/auth.types';

interface Props extends AuthPageProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email, errors = {} }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, reset } = useForm<ResetPasswordData>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const handleInputChange = (field: keyof ResetPasswordData, value: string) => {
        setData(field, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('password.update'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6">
                <div className="w-full max-w-4xl">
                    <Card className="overflow-hidden p-0 shadow-lg">
                        <div className="flex max-h-[600px] flex-col lg:flex-row">
                            {/* Left side - Image placeholder */}
                            <div className="flex h-full items-center justify-center lg:w-1/2">
                                <img src="/images/authImage.png" alt="" className="h-[600px] w-full object-cover object-center" />
                            </div>

                            {/* Right side - Form */}
                            <div className="flex flex-col items-center justify-center lg:w-1/2">
                                <div className="w-full max-w-md">
                                    <CardHeader className="space-y-1 px-8 pb-6 text-center">
                                        <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
                                        <CardDescription>
                                            Enter your new password below to reset your account password.
                                        </CardDescription>
                                    </CardHeader>

                                    <form onSubmit={handleSubmit}>
                                        <CardContent className="space-y-4 px-8 py-2">
                                            {Object.keys(errors).length > 0 && (
                                                <Alert variant="destructive">
                                                    <AlertDescription>
                                                        {Object.values(errors).map((error, index) => (
                                                            <div key={index}>{Array.isArray(error) ? error[0] : error}</div>
                                                        ))}
                                                    </AlertDescription>
                                                </Alert>
                                            )}

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
                                                {errors.email && (
                                                    <p className="text-sm text-red-600">
                                                        {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password">New Password</Label>
                                                <div className="relative">
                                                    <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter your new password"
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
                                                {errors.password && (
                                                    <p className="text-sm text-red-600">
                                                        {Array.isArray(errors.password) ? errors.password[0] : errors.password}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                                <div className="relative">
                                                    <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        id="password_confirmation"
                                                        name="password_confirmation"
                                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                                        placeholder="Confirm your new password"
                                                        value={data.password_confirmation}
                                                        onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                                        className={`pr-10 pl-10 ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPasswordConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                {errors.password_confirmation && (
                                                    <p className="text-sm text-red-600">
                                                        {Array.isArray(errors.password_confirmation) ? errors.password_confirmation[0] : errors.password_confirmation}
                                                    </p>
                                                )}
                                            </div>

                                            <Button type="submit" className="w-full" disabled={processing}>
                                                {processing ? 'Resetting...' : 'Reset Password'}
                                            </Button>

                                            <div className="text-center text-sm text-gray-600">
                                                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                                    Back to login
                                                </a>
                                            </div>
                                        </CardContent>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
