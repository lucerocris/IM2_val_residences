import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import CarouselText from "@/components/main/ui/CarouselText";

const tenantHome = () => {   
    return(
        <>
            <Header links = {[ 
                {label: "VIEW LISTINGS", href: "/user/listings"},
                {label: "TENANT DASHBOARD", href: "/user"},
                {label: "LOG OUT", href: "/"}
            ]}/>
            <MainLayout carouselText = {<CarouselText />}>
                
            </MainLayout>
        </>
    );
}

export default tenantHome;