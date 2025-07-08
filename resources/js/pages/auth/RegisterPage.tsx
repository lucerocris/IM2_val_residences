"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Check, X } from "lucide-react"

interface RegisterFormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
}

interface RegisterPageProps {
    onRegister?: (userData: RegisterFormData) => Promise<void>
    onSignIn?: () => void
}

interface PasswordStrength {
    score: number
    feedback: string[]
}

export default function RegisterPage({ onRegister, onSignIn }: RegisterPageProps = {}) {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
        // Clear error when user starts typing
        if (error) setError(null)
    }

    const getPasswordStrength = (password: string): PasswordStrength => {
        let score = 0
        const feedback: string[] = []

        if (password.length >= 8) score++
        else feedback.push("At least 8 characters")

        if (/[a-z]/.test(password)) score++
        else feedback.push("One lowercase letter")

        if (/[A-Z]/.test(password)) score++
        else feedback.push("One uppercase letter")

        if (/\d/.test(password)) score++
        else feedback.push("One number")

        if (/[^a-zA-Z0-9]/.test(password)) score++
        else feedback.push("One special character")

        return { score, feedback }
    }

    const passwordStrength = getPasswordStrength(formData.password)

    const getStrengthColor = (score: number): string => {
        if (score <= 2) return "bg-red-500"
        if (score <= 3) return "bg-yellow-500"
        if (score <= 4) return "bg-blue-500"
        return "bg-green-500"
    }

    const getStrengthText = (score: number): string => {
        if (score <= 2) return "Weak"
        if (score <= 3) return "Fair"
        if (score <= 4) return "Good"
        return "Strong"
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        // Validation
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields")
            setIsLoading(false)
            return
        }

        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address")
            setIsLoading(false)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        if (passwordStrength.score < 3) {
            setError("Password is too weak. Please choose a stronger password.")
            setIsLoading(false)
            return
        }

        if (!formData.acceptTerms) {
            setError("Please accept the terms and conditions")
            setIsLoading(false)
            return
        }

        try {
            if (onRegister) {
                await onRegister(formData)
            } else {
                // Default behavior - you can replace this with your auth logic
                console.log("Registration attempt:", formData)
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500))
                alert("Registration successful! (This is a demo)")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
                        <CardDescription className="text-center">Enter your information to get started</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john.doe@example.com"
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
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10"
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

                                {formData.password && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Password strength:</span>
                                            <span
                                                className={`font-medium ${passwordStrength.score <= 2 ? "text-red-600" : passwordStrength.score <= 3 ? "text-yellow-600" : passwordStrength.score <= 4 ? "text-blue-600" : "text-green-600"}`}
                                            >
                        {getStrengthText(passwordStrength.score)}
                      </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                            />
                                        </div>
                                        {passwordStrength.feedback.length > 0 && (
                                            <div className="text-xs text-gray-600">
                                                <p>Password should include:</p>
                                                <ul className="list-none space-y-1 mt-1">
                                                    {passwordStrength.feedback.map((item, index) => (
                                                        <li key={index} className="flex items-center">
                                                            <X className="h-3 w-3 text-red-500 mr-1" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                    {formData.confirmPassword && (
                                        <div className="absolute right-10 top-3">
                                            {formData.password === formData.confirmPassword ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <X className="h-4 w-4 text-red-500" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))}
                                />
                                <Label htmlFor="acceptTerms" className="text-sm">
                                    I agree to the{" "}
                                    <button type="button" className="text-blue-600 hover:text-blue-500 underline">
                                        Terms of Service
                                    </button>{" "}
                                    and{" "}
                                    <button type="button" className="text-blue-600 hover:text-blue-500 underline">
                                        Privacy Policy
                                    </button>
                                </Label>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Create account"}
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <button type="button" onClick={onSignIn} className="text-blue-600 hover:text-blue-500 font-medium">
                                    Sign in
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
