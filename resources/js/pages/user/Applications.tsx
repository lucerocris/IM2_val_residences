import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import ApplicationMain from "@/components/prospective-tenant/application-status/application-main";

const tenantHome = () => {
    return(
        <>
            <Header 
            links = {[
                {label: "VIEW LISTINGS", href: "/user/listings"},
                {label: "USER DASHBOARD", href: "/user"},
            ]}
            links2 = {[
                {label: "LOG OUT", href: "/logout", method: 'post'}
            ]}
            />
            <MainLayout>
                <div className = "flex flex-col py-[3rem] gap-[3rem] items-center">
                    <ApplicationMain />
                </div>
            </MainLayout>
        </>
    );
}

export default tenantHome;
