import LandingLayout from '@/layout/LandingLayout';
import CarouselText from '@/components/main/ui/CarouselText'
import Btn from '@/components/main/ui/Button'
import Header from '@/components/main/ui/Header';
import LoginModal from '@/components/main/ui/LoginModal';
import SignUpModal from '@/components/main/ui/SignUpModal';
import { Map } from 'lucide-react'
import ListingsFilter from '@/components/main/ui/Listings/Filter';
import ListingsMain from '@/components/main/ui/Listings/main';

const landing = () => {
    const desc = "Wake up to refreshing mornings in our apartments at Corona del Mar, a Spanish Mediterranean-inspired seaside community in Cebu.";
    const btnLabel = "View Listings";
    const title = "Val Residences";

    return (
        <>
            <LandingLayout
                title={title}
                subtitle={desc}
                buttonLabel={btnLabel}
            >
                <ListingsMain />
            </LandingLayout>
        </>
    )
}

export const CardContent = () => {
    return(
        <>
            <div className = "h-[40%] overflow-hidden">
                <img src="https://media.istockphoto.com/id/2155879397/photo/house-in-a-charming-neighborhood-with-stunning-sidewalk-landscaping.jpg?s=612x612&w=0&k=20&c=nQJOUoNb2RNev3QVNjIohcmxQABCTetCdgfnc8MV8sU=" alt="pic" className = "w-full h-full object-cover"/>
            </div>
            <div className = "p-[20px] h-[41%]">
                <h3 className = "text-[1.2rem] mb-[10px] font-bold">Ph. 4, Lot 6, Block 8</h3>
                <p className = "mt-[5px] text-[0.8rem]">Corona del Mar, Pooc, Talisay City, Cebu</p>
                <br />
                <p className = "mt-[5px] text-[0.8rem]">Duplex</p>
                <p className = "mt-[5px] text-[0.8rem]">Vacant Units: 0</p>
                <p className = "mt-[5px] text-[0.8rem]">PHP 11,000.00 - PHP 20,000.00</p>
            </div>
            <div className = "h-[19%] w-full overflow-hidden flex flex-row justify-evenly items-center">
                <Btn className = "px-[33px] h-[35px]"><Map/></Btn>
                <Btn className = "px-[42px] h-[35px]">VIEW UNITS</Btn>
            </div>
        </>
    );
}

export default landing;