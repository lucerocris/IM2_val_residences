import { Link } from '@inertiajs/react';

const Header = () => {
    return (
        <>
            <div className="flex h-[80px] flex-col justify-center gap-[8px] self-stretch px-[70px]">
                <div className="flex justify-between items-center self-stretch">

                    <div className="flex flex-col">
                        <span>Val</span>
                        <span>Residences</span>
                    </div>
                    {/*Nav bar links*/}
                    <div className="flex items-center gap-[24px]">
                        <Link href="/">Login</Link>
                        <Link href="/">Sign up</Link>
                        <Link href="/">Home</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact us</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
