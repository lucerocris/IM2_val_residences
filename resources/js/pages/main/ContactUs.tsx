import MainLayout from '@/layout/MainLayout'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/main/ui/Header';
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const landing = () => {

    const headerActions = (
        <>
            <Button variant = "outline" className = "bg-transparent hover:opacity-70 duration-400 opacity-90 px-4" onClick = {() => router.visit('/login')}>
                Log In
            </Button>

            <Button variant = "outline" className = "bg-white text-black hover:opacity-70 duration-400 opacity-90 px-4" onClick = {() => router.visit('/register')}>
                Sign Up
            </Button>
        </>
    );

    return(
        <>
            <Header links = {[
                {label: "Home", href: "/"},
                {label: "About Us", href: "/about"},
                {label: "Contact Us", href: "contact"}
            ]}
            actions = { headerActions }
            />
            <MainLayout heroTitle = "Contact Us" heroSubtitle = "Get in Touch with Val Residences">
                <section className = "py-20 bg-white">
                    <div className = "container mx-auto px-4">
                        <div className = "grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                            <ContactInfo />
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
}

const ContactInfo = () => {
    return(
        <>
            <div className = "space-y-8">
                <Card className = "border-0 shadow-lg bg-slate-50">
                    <CardHeader>
                        <CardTitle className = "flex items-center gap-3 text-2xl">
                            <MessageCircle className = "size-8 text-slate-600" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className = "space-y-8">

                        <div className = "flex items-start gap-4">
                            <div className = "size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                                <MapPin className = "size-6 text-slate-600" />
                            </div>
                            <div>
                                <h3 className = "text-lg font-semibold mb-2 text-slate-900">Address</h3>
                                <p className = "text-slate-700 leading-relaxed">
                                    Corona del Mar, Pooc, Talisay City,
                                    <br />
                                    Cebu, Philippines
                                </p>
                            </div>
                        </div>

                        <div className = "flex items-start gap-4">
                            <div className = "size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                                <Phone className = "size-6 text-slate-600" />
                            </div>
                            <div>
                                <h3 className = "text-lg font-semibold mb-2 text-slate-900">Phone</h3>
                                <div className = "space-y-1 text-slate-700">
                                    <p>+639999732452</p>
                                    <p>+639186936086</p>
                                </div>
                            </div>
                        </div>

                        <div className = "flex items-start gap-4">
                            <div className = "size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                                <Mail className = "size-6 text-slate-600" />
                            </div>
                            <div>
                                <h3 className = "text-lg font-semibold mb-2 text-slate-900">Email</h3>
                                <p className = "text-slate-700">valresidences@gmail.com</p>
                            </div>
                        </div>

                        <div className = "flex items-start gap-4">
                            <div className = "size-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                                <Clock className = "size-6 text-slate-600" />
                            </div>
                            <div>
                                <h3 className = "text-lg font-semibold mb-2 text-slate-900">Office Hours</h3>
                                <div className = "space-y-1 text-slate-700">
                                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                                    <p>Sunday: By appointment only</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        console.log("Form submitted:", formData)
        
        setFormData({ name: "", email: "", phone: "", message: "" })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }))
    }

    return(
        <>
            <Card className = "border-0 shadow-lg bg-white">
                <CardHeader>
                    <CardTitle className = "flex items-center gap-3 text-2xl">
                        <Send className = "size-8 text-slate-600" />
                        Send Us a Message
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className = "space-y-6" onSubmit = {handleSubmit}>
                        <div className = "grid md:grid-cols-1 gap-4">

                            <div className = "space-y-2">
                                <Label htmlFor = "name" className = "text-slate-900 font-medium">Name *</Label>
                                <Input 
                                    id = "name" 
                                    name = "name" 
                                    value = {formData.name}
                                    onChange = {handleChange}
                                    placeholder = "Enter your name" 
                                    className = "border-slate-300 focus:border-slate-500 focus:ring-slate-500" 
                                    required 
                                />
                            </div>

                            <div className = "space-y-2">
                                <Label htmlFor = "phone" className = "text-slate-900 font-medium">Phone</Label>
                                <Input 
                                id = "phone" 
                                name = "phone"
                                type = "tel"
                                value = {formData.phone}
                                onChange = {handleChange}
                                placeholder = "Enter your phone number" 
                                className = "border-slate-300 focus:border-slate-500 focus:ring-slate-500" 
                                />
                            </div>

                            <div className = "space-y-2">
                                <Label htmlFor = "email" className = "text-slate-900 font-medium">Email</Label>
                                <Input 
                                id = "email"
                                name = "email"
                                type = "email"
                                value = {formData.email}
                                onChange = {handleChange} 
                                placeholder = "Enter your email" 
                                className = "border-slate-300 focus:border-slate-500 focus:ring-slate-500" 
                                required
                                />
                            </div>

                            <div className = "space-y-2">
                                <Label htmlFor = "message" className = "text-slate-900 font-medium">Message *</Label>
                                <Textarea 
                                id = "message"
                                name = "message"
                                value = {formData.message}
                                onChange = {handleChange}
                                placeholder = "Tell us about your interest in Val Residences..." 
                                rows = {6}
                                className = "border-slate-300 focus:border-slate-500 focus:ring-slate-500 resize-none"
                                required
                                />
                            </div>

                            <Button type = "submit" className = "w-full bg-gradient-to-r from-slate-500 to-neutral-500 hover:from-slate-600 hover:to-neutral-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                <Send className = "size-5 mr-2" />
                                Send Message
                            </Button>

                            <p className = "text-sm text-slate-600 text-center">We'll get back to you within 24 hours during business days.</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

export default landing;