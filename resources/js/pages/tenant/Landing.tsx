import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import CarouselText from "@/components/main/ui/CarouselText";
import Btn from "@/components/main/ui/Button";

const tenantHome = () => {   
    const title = "Welcome, Jose"
    const subtitle = "Signed in as Tenant"
    
    return(
        <>
            <Header links = {[ 
                {label: "VIEW LISTINGS", href: "/tenant/listings"},
                {label: "TENANT DASHBOARD", href: "/tenant"},
                {label: "LOG OUT", href: "/"}
            ]}
            />
            <MainLayout carouselText = {<CarouselText title = {title} subTitle = {subtitle}/>}>
                <div className = "flex flex-col items-center gap-[3rem] py-[4.3rem]">
                    <Lease />
                    <Contact />
                </div>
            </MainLayout>
        </>
    );
}

const Lease = () => {
    return(
        <>
            <div className = "flex flex-col w-[90%]">
                <div className = "bg-[#474747] p-[0.8rem] text-[1.2rem] text-left">
                    <h5 className = "text-lg text-white">LEASE DETAILS</h5>
                </div>

                <div className = "flex flex-col bg-[#e8e8e8] p-[1rem]">
                    <table className = "mb-[20px] w-full border-collapse table-auto text-[11px]">
                        <thead>
                            <tr>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Apartment</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Unit No.</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Total Floors</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Living Area (sqm)</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Bedrooms</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Toilet & Baths</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Balcony</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Parking Space</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Pet Friendly</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Furnished</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">Ph. 4, Lot 6, Block 8</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">3</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">2</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">70.00</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">3</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">2</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">Yes</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">Yes</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">Yes</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">Unfurnished</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className = "w-full border-collapse table-auto text-[11px]">
                        <thead>
                            <tr>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Lease Term (months)</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Rent Price (Php)</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Deposit (Months)</th>
                                <th className = "bg-[#f2f2f2] font-semibold border-1 border-solid border-[#ccc]">Advance (Months)</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">1</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">20000.00</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">2</td>
                                <td className = "pt-[4px] pr-[6px] text-center border-1 border-solid border-[#ccc] whitespace-nowrap">1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const Contact = () => {
    return(
        <>
            <div className = "flex flex-col w-[90%]">
                <div className = "bg-[#474747] text-white p-[0.8rem] text-[1.2rem] text-left">
                    <h5>CONTACT LANDLORD</h5>
                </div>


                <div className = "flex bg-[#e8e8e8] p-[1rem]">
                    <div className = "w-full">
                        <form action="" className = "flex flex-col">
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder = "Enter your name" className = "w-full p-[10px] mt-[10px] mb-[1rem] text-[0.9rem] bg-white border-1 border-solid border-neutral-400"/>

                            <label htmlFor="">Subject</label>
                            <input type="text" placeholder = "Enter your email" className = "w-full p-[10px] mt-[10px] mb-[1rem] text-[0.9rem] bg-white border-1 border-solid border-neutral-400"/>

                            <label htmlFor="">Message</label>
                            <textarea placeholder = "Enter your message" className = "w-full p-[10px] mt-[10px] mb-[1rem] text-[0.9rem] bg-white border-1 border-solid border-neutral-400"/>

                            <Btn className = "py-2 w-2/3 self-center">Submit</Btn>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default tenantHome;