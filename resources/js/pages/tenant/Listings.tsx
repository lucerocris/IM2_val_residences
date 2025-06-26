import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import { CardContent } from "../main/landing";
import CarouselText from "@/components/main/ui/CarouselText";

const TenantListings = () => {
    const title = "Welcome, Jose"
    const subtitle = "Signed in as Tenant"
    const desc = "Wake up to refreshing mornings in our apartments at Corona del Mar, a Spanish Mediterranean-inspired seaside community in Cebu."
    const btnLabel = "VIEW LISTINGS"

    return(
        <>
            <Header links = {[
                {label: "VIEW LISTINGS", href: "/tenant/listings"},
                {label: "TENANT DASHBOARD", href: "/tenant"},
                {label: "LOG OUT", href: "/"}
            ]}
            />
            <MainLayout carouselText = {<CarouselText description = {desc} title = {title} subTitle= {subtitle} buttonLabel = {btnLabel}></CarouselText>}>
                <div className = "w-full pt-[4.3rem] pb-[4.3rem] bg-white">
                    <div className = "grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-[30px] justify-center px-[100px] py-0">
                        {/* Boxes here */}

                        <div className = "w-full max-w-[350px] h-[450px] bg-[#e8e8e8] text-left m-auto">
                            <CardContent />
                        </div>

                        <div className = "w-full max-w-[350px] h-[450px] bg-[#e8e8e8] text-left m-auto">
                            <CardContent />
                        </div>

                        <div className = "w-full max-w-[350px] h-[450px] bg-[#e8e8e8] text-left m-auto">
                            <CardContent />
                        </div>

                        <div className = "w-full max-w-[350px] h-[450px] bg-[#e8e8e8] text-left m-auto">
                            <CardContent />
                        </div>
                    </div>
                </div>    
            </MainLayout>
        </>
    );
}

export default TenantListings;