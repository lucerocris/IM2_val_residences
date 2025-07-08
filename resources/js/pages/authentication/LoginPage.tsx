"use client"

import type React from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useState } from "react"

interface LoginPageProps {
    errors?: Record<string, string>
    status?: string
    remember: boolean;
}

type LoginFormData = {
    email: string;
    password: string;
    remember: boolean
}

export default function LoginPage({ errors = {}, status }: LoginPageProps) {
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, post, processing, reset } = useForm<LoginFormData>({
        email: "",
        password: "",
        remember: false,
    })


    const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
        setData(field, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post("/login", {
            onFinish: () => reset("password"),
        })
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
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
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={data.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={data.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <Label htmlFor="remember" className="ml-2 text-sm">
                                        Remember me
                                    </Label>
                                </div>

                                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </a>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 mt-5">
                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? "Signing in..." : "Sign in"}
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                {"Don't have an account? "}
                                <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                                    Sign up
                                </a>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
