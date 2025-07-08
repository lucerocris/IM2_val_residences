"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

interface LoginFormData {
    email: string
    password: string
}

interface LoginPageProps {
    onLogin?: (credentials: LoginFormData) => Promise<void>
    onForgotPassword?: () => void
    onSignUp?: () => void
}

export default function LoginPage({ onLogin, onForgotPassword, onSignUp }: LoginPageProps = {}) {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error when user starts typing
        if (error) setError(null)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        // Basic validation
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields")
            setIsLoading(false)
            return
        }

        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address")
            setIsLoading(false)
            return
        }

        try {
            if (onLogin) {
                await onLogin(formData)
            } else {
                // Default behavior - you can replace this with your auth logic
                console.log("Login attempt:", formData)
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000))
                alert("Login successful! (This is a demo)")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
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
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                        required
                                    />
                                </div>
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
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <Label htmlFor="remember-me" className="ml-2 text-sm">
                                        Remember me
                                    </Label>
                                </div>

                                <button type="button" onClick={onForgotPassword} className="text-sm text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </button>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                {"Don't have an account? "}
                                <button type="button" onClick={onSignUp} className="text-blue-600 hover:text-blue-500 font-medium">
                                    Sign up
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
