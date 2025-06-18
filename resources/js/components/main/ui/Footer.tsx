import { Phone, MapPinned, MailIcon, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
    return(
        <>
            <footer className = "bg-[#323232] text-white flex flex-wrap justify-between p-[30px] text-left">
                <Left />
                <Middle />
                <Right />
            </footer>
        </>
    );
}

const Left = () => {
    return(
        <>
            <div className = "flex-1 p-[20px] min-w-[280px] relative">
                <div className = "text-[2rem] mb-[25px]">Val Residences</div>

                <div className = "flex items-center mb-[10px]">
                    <div className = "mr-[10px]">
                        <MapPinned />
                    </div>

                    <div className = "flex-1">
                        Corona del Mar, Pooc, Talisay City, Cebu, Philippines
                    </div>
                </div>

                <div className = "flex items-center mb-[10px]">
                    <div className = "mr-[10px]">
                        <Phone />
                    </div>

                    <div className = "flex-1">               
                        +639999732452 +639186936086 
                    </div>
                </div>

                    <div className = "flex items-center mb-[10px]">
                    <div className = "mr-[10px]">
                        <MailIcon />
                    </div>

                    <div className = "flex-1">           
                        valresidences@gmail.com
                    </div>
                </div>
            </div>
        </>
    );
}

const Middle = () => {
    return(
        <>
            <div className = "flex-1 p-[20px] min-w-[280px] relative border-l border-r  border-gray-500">
                <h3 className = "text-[1.3rem] mb-[30px]">Socials</h3>

                <div className = "grid grid-cols-2 gap-[15px] justify-start">
                    <a href=""><Facebook /></a>
                    <a href=""><Instagram /></a>
                    <a href=""><Twitter /></a>
                    <a href=""><Youtube /></a>
                </div>
            </div>
        </>
    );
}

const Right = () => {
    return (
        <>
            <div className = "flex-1 p-[20px] min-w-[280px] relative">
                <h3 className = "text-[1.3rem] mb-[30px]">Subscribe to Vacancy Alerts</h3>
                <p className = "mb-[10px]">Subscribe to our vacancy alerts and be the first to know when a unit becomes available.</p>

                <form method="post" className = "flex flex-col items-start">
                    <input type="email" placeholder="Your email here" className = "w-full p-[10px] mt-[8px] border rounded-lg"/>
                    <input type="submit" className = "bg-[#606060] border-none p-[10px] cursor-pointer text-white w-full mt-[5px]" />
                </form>
            </div>
        </>
    );
}

export default Footer;