'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface LoginPageProps {
    errors?: Record<string, string>;
    status?: string;
    remember: boolean;
}

type LoginFormData = {
    email: string;
    password: string;
    remember: boolean;
};

export default function LoginPage({ errors = {}, status }: LoginPageProps) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, reset } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });

    const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
        setData(field, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
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
                        <div className="flex flex-col items-center justify-center lg:w-1/2">
                            <div className="w-full max-w-md">
                                <CardHeader className="space-y-1 px-8 pb-6 text-center">
                                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                                    <CardDescription>Enter your credentials to access your account</CardDescription>
                                </CardHeader>

                                <form onSubmit={handleSubmit}>
                                    <CardContent className="space-y-4 px-8 py-2">
                                        {status && (
                                            <Alert>
                                                <AlertDescription>{status}</AlertDescription>
                                            </Alert>
                                        )}

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
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter your password"
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

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    id="remember"
                                                    name="remember"
                                                    type="checkbox"
                                                    checked={data.remember}
                                                    onChange={(e) => handleInputChange('remember', e.target.checked)}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <Label htmlFor="remember" className="ml-2 text-sm">
                                                    Remember me
                                                </Label>
                                            </div>

                                            <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                        <Button type="submit" className="w-full" disabled={processing}>
                                            {processing ? 'Signing in...' : 'Sign in'}
                                        </Button>

                                        <div className="text-center text-sm text-gray-600">
                                            {"Don't have an account? "}
                                            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                                Sign up
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
    );
}
