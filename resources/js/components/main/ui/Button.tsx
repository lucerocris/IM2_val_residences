import { ReactNode } from 'react'


interface BtnProps{
    children: ReactNode;
    className?: string;
};

const Btn = ({children, className = ''}:BtnProps) => {
    return (
        <>
            <button className = {`bg-[#323232] border-none cursor-pointer transition-colors duration-300 text-[1rem] text-white hover:bg-[#606060] ${className}`}>{children}</button>
        </>
    );
}

export default Btn;