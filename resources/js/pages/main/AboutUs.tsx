import MainLayout from '@/layout/MainLayout';
import Header from '@/components/main/ui/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, MapPin, Clock, Star } from 'lucide-react';
import { router } from '@inertiajs/react';

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
                <section>
                    
                </section>
            </MainLayout>
        </>

    )
}



export default landing;
