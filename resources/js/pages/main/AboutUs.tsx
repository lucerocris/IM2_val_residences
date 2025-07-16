import MainLayout from '@/layout/MainLayout';
import Header from '@/components/main/ui/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, MapPin, Clock, Star } from 'lucide-react';
import { router } from '@inertiajs/react';
import FeatureAmenities from '@/components/main/ui/AboutUs/Feature-Amenities';

const landing = () => {
    const amenities = [
        "Beach Frontage facing Bohol Strait",
        "Well-lighted Spine Road with Tree Lines",
        "Clubhouse",
        "Infinity Pool with Shower Rooms",
        "View Tower",
        "Gazebo",
        "Tennis and Basketball Courts",
        "Landscaped Open Area",
        "Pocket Parks",
    ]

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

    return (
        <>
            <Header links = {[
                {label: "Home", href: "/"},
                {label: "About Us", href: "/about"},
                {label: "Contact Us", href: "contact"}
            ]}
            actions = { headerActions }
            />
            <MainLayout heroTitle = "About Val Residences" heroSubtitle = "Your Gateway to Exclusive Seaside Living">
                <section className = "py-20 bg-white">
                    <div className = "container mx-auto px-4">
                        <div className = "grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

                            <LeftContent />
                            <RightContent />
                            
                        </div>
                    </div>
                </section>

                <FeatureAmenities amenities={amenities} />
            </MainLayout>
        </>

    )
}

const LeftContent = () => {
    return(
        <>
            <div className = "space-y-8">
                <Card className = "border-0 shadow-lg bg-white">
                    <CardContent className = "p-8">
                        <div className = "flex items-center gap-3 mb-6">
                            <div className = "size-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Waves className = "size-6 text-emerald-600" />
                            </div>
                            <h2 className = "text-2xl font-semibold text-slate-900">Your Seaside Sanctuary</h2>
                        </div>
                        <p className = "text-lg text-slate-700 leading-relaxed mb-6">
                            Your home in the exclusive seaside community of Corona del Mar in Talisay City, Cebu. Nestled within
                            this Spanish Mediterranean-inspired beachfront subdivision, our apartments offer the perfect blend
                            of resort-style living and modern city convenience.
                        </p>
                        <div className = "flex items-center gap-2 text-slate-600">
                            <Clock className = "size-5" />
                            <span>Just 15 minutes from Cebu City</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className = "border-0 shadow-lg bg-white">
                    <CardContent className = "p-8">
                        <div className = "flex items-center gap-3 mb-6">
                            <div className = "size-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <MapPin className = "size-6 text-emerald-600" />
                            </div>
                            <h2 className = "text-2xl font-semibold text-slate-900">Prime Location</h2>
                        </div>
                        <p className = "text-lg leading-relaxed text-slate-900">
                            Just a 15-minute drive from Cebu City via the South Coastal Road, Corona del Mar is the first
                            residential beachfront development of its kind in Cebu. Here, you'll wake up to breathtaking
                            panoramic views, a refreshing sea breeze, and the serenity of living close to nature—while still
                            enjoying easy access to schools, businesses, and shopping centers.
                        </p>
                    </CardContent>
                </Card>

                <Card className = "border-0 shadow-lg bg-white">
                    <CardContent className = "p-8">
                        <div className = "flex items-center gap-3 mb-6">
                            <div className = "size-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Star className = "size-6 text-emerald-600" />
                            </div>
                            <h2 className = "text-2xl font-semibold text-slate-900">First of Its Kind</h2>
                        </div>
                        <p className = "text-lg text-slate-700 leading-relaxed">
                            Val Residences stands as a pioneering development in Cebu's real estate landscape. As the first
                            residential beachfront community of its kind, we've set new standards for luxury coastal living,
                            combining world-class amenities with the natural beauty of the Philippine coastline.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

const RightContent = () => {
    return(
        <>
            <div className = "space-y-6">
                <div className = "grid grid-cols-2 gap-4">
                    <div className = "space-y-4">
                        <div className = "aspect-square overflow-hidden rounded-2xl shadow-lg">
                            <img 
                            alt = "shi"
                            width = {300}
                            height = {300}
                            className = "size-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className = "aspect-square overflow-hidden rounded-2xl shadow-lg">
                            <img 
                            alt = "shi"
                            width = {300}
                            height = {300}
                            className = "size-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                    <div className = "space-y-4 pt-8">
                        <div className = "aspect-square overflow-hidden rounded-2xl shadow-lg">
                            <img 
                            alt = "shi"
                            width = {300}
                            height = {300}
                            className = "size-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className = "aspect-square overflow-hidden rounded-2xl shadow-lg">
                            <img 
                            alt = "shi"
                            width = {300}
                            height = {300}
                            className = "size-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
                <FeatureHighlight />
            </div>
        </>
    );
}

const FeatureHighlight = () => {
    return(
        <>
            <Card className = "border-0 shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <CardContent className = "p-6 text-center">
                    <h4 className = "text-xl font-bold mb-2">Spanish Mediterranean Design</h4>
                    <p className = "text-emerald-100">Inspired architecture meets tropical paradise</p>
                </CardContent>
            </Card>
        </>
    );
}

export default landing;
