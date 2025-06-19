
interface CarouselTextProps{
    title: string;
    description: string;
    buttonLabel: string;
}

const CarouselText = ({ title, description, buttonLabel }: CarouselTextProps) => {
    return(
        <>
            <div className = "w-[30%] flex flex-col absolute left-[10%] top-[15%]">
                <h1 className = "text-[2.4rem] pb-[30px]">{title}</h1>
                <p className = "text-[1.1rem] pb-[30px] font-medium">  {description}</p>
                <button className = "bg-[#323232] hover:bg-[#606060] transition-colors duration-300 cursor-pointer text-[1rem] w-[200px] text-white py-[10px] px-[15px]">{buttonLabel}</button>
            </div>
        </>
    );
}

export default CarouselText;