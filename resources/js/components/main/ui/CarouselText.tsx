import Btn from '@/components/main/ui/Button'

interface CarouselTextProps {
    title: string;
    subTitle?: string;
    description?: string;
    buttonLabel?: string; // Make this optional
}

const CarouselText = ({ title, subTitle, description, buttonLabel }: CarouselTextProps) => {
    return (
        <>
            <div className="w-[30%] flex flex-col absolute left-[10%] top-[15%]">
                <h1 className="text-[2.4rem] pb-[15px]">{title}</h1>
                <h5 className = "text-[1.1rem] pb-[20px] font-semibold">{subTitle}</h5>
                <p className="text-[1.1rem] pb-[30px] font-medium">{description}</p>
                {buttonLabel && (
                    <Btn className="py-[10px] px-[15px] w-[200px]">{buttonLabel}</Btn>
                )}
            </div>
        </>
    );
}

export default CarouselText;