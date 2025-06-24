import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import CarouselText from "@/components/main/ui/CarouselText";

const tenantHome = () => {   
    const title = "Welcome, Jose"
    const desc = "Signed in as tenant"
    return(
        <>
            <Header links = {[ 
                {label: "VIEW LISTINGS", href: "/tenant/listings"},
                {label: "TENANT DASHBOARD", href: "/tenant"},
                {label: "LOG OUT", href: "/"}
            ]}
            />
            <MainLayout carouselText = {<CarouselText title = {title} description = {desc}/>}>
                nigga
            </MainLayout>
        </>
    );
}

export default tenantHome;