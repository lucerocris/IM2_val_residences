import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import CarouselText from "@/components/main/ui/CarouselText";


const tenantHome = () => {   
    const title = "Welcome, Cris"
    const subtitle = "Signed in as User"

    return(
        <>
            <Header links = {[ 
                {label: "VIEW LISTINGS", href: "/user/listings"},
                {label: "TENANT DASHBOARD", href: "/user"},
                {label: "LOG OUT", href: "/"}
            ]}/>
            <MainLayout carouselText = {<CarouselText title = {title} subTitle= {subtitle}/>}>
                <div className = "flex flex-col py-[3rem] gap-[3rem] items-center">

                    <ApplicationForm/>

                    
                </div>
            </MainLayout>
        </>
    );
}

const ApplicationForm = () => {
    return(
        <>
            <div className = "flex flex-col w-[90%]">
                <div className = "bg-[#474747] text-white p-[0.8rem] text-[1.2rem] text-left">
                    <h5>APPLICATION STATUS</h5>
                </div>

                <div className = "flex bg-[#e8e8e8] p-[1rem]">
                    <p>No applications found</p>
                </div>
            </div>
        </>
    );
}

export default tenantHome;