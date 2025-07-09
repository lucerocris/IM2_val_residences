import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import InputLabel from "./contact-landlord-inputs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactLandlord = () => {
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle className = "flex items-center gap-2">
                        <Mail className = "w-5 h-5"/>
                        Contact Landlord
                    </CardTitle>
                </CardHeader>
                <CardContent className = "space-y-4">
                    <InputLabel label = "email" labelText="Email" input = {<Input id = "email" placeholder = "Enter your email"/>} />
                    <InputLabel label = "subject" labelText="Subject" input = {<Input id = "subject" placeholder = "Enter subject"/>} />
                    <InputLabel label = "message" labelText="Message" input = {<Textarea className = "h-[133px]" id = "message" placeholder = "Enter your message" rows = {4}/>} />
                    <Button className = "w-full">
                        <Mail className = "w-4 h-4 mr-2" />
                        Send Message
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}

export default ContactLandlord;