import MainLayout from '@/layout/MainLayout'
import Btn from '@/components/main/ui/Button';
import Header from '@/components/main/ui/Header';
import LoginModal from '@/components/main/ui/LoginModal';
import SignUpModal from '@/components/main/ui/SignUpModal';
import { MapPinned, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button';

const landing = () => {

    const headerActions = (
        <>
            <Button variant = "outline" className = "bg-transparent hover:opacity-70 duration-400 opacity-90 px-4">
                <LoginModal />
            </Button>

            <Button variant = "outline" className = "bg-white text-black hover:opacity-70 duration-400 opacity-90 px-4">
                <SignUpModal />
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
            <MainLayout>
                <div className = "pt-[4.3rem] pb-[4.3rem]">
                    <div className = "p-[4.3rem] flex items-center justify-center">
                        <div className = "w-[80%] max-w-[1000px] p-[20px] h-auto bg-[#e8e8e8] flex">
                            <ContactInfo />
                            <Form />
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

const ContactInfo = () => {
    return(
        <>
            <div className = "w-[30%] p-[1.8rem] flex flex-col items-center justify-around relative border-r border-gray-300">
                <div className = "flex flex-col items-center text-center mb-[1.5rem]">
                    <MapPinned />
                    <h3 className = "text-[1rem] font-bold">ADDRESS</h3>
                    <p className = "text-[0.8rem]">Corona del Mar, Pooc, Talisay City, Cebu, Philippines</p>
                </div>

                <div className = "flex flex-col items-center text-center mb-[1.5rem]">
                    <Phone />
                    <h3 className = "text-[1rem] font-bold">PHONE</h3>
                    <p className = "text-[0.8rem]">+639999732452 +639186936086</p>
                </div>

                <div className = "flex flex-col items-center text-center mb-[1.5rem]">
                    <Mail />
                    <h3 className = "text-[1rem] font-bold">EMAIL</h3>
                    <p className = "text-[0.8rem]">valresidences@gmail.com</p>
                </div>
            </div>
        </>
    );
}

const Form = () => {
    return(
        <>
            <div className = "w-[70%] p-[1.8rem]">
                <form action="" className = "flex flex-col">
                    <h3 className = "text-[1.3rem] mb-[1.5rem]">SEND US A MESSAGE</h3>

                    <label htmlFor="">Name</label>
                    <input type="text" placeholder = "Enter your name" className = "w-full p-[10px] mt-[10px] mb-[1rem] text-[0.9rem] bg-white"/>

                    <label htmlFor="">Email</label>
                    <input type="text" placeholder = "Enter your email" className = "w-full p-[10px] mt-[10px] mb-[1rem] text-[0.9rem] bg-white"/>

                    <label htmlFor="">Message</label>
                    <input type="text" placeholder = "Enter your message" className = "w-full p-[10px] mt-[10px] mb-[1rem] text-[0.9rem] bg-white"/>

                    <Btn className = "py-2">Submit</Btn>
                </form>
            </div>
        </>
    );
}

export default landing;