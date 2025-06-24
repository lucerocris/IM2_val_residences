import { Link } from '@inertiajs/react';
import Modal from './Modal';
import LoginForm from './Login'
import SignUpForm from './SignUp'

type HeaderLink = { label: string, href: string }
type HeaderProps = {
    links: HeaderLink[],
    actions?: React.ReactNode
}

const Header = ({links, actions}: HeaderProps) => {
    return (
        <>
            <div className="w-full h-[30px] bg-[#323232]"></div>
            <div className="flex h-[80px] flex-col justify-center gap-[8px] self-stretch px-[70px]">
                <div className="flex justify-between items-center self-stretch">

                    <div className="flex flex-col">
                        <span>Val</span>
                        <span>Residences</span>
                    </div>
                    {/*Nav bar links*/}
                    <div className="flex items-center gap-[24px]">
                        {links.map(link => (
                            <Link key = {link.href} href = {link.href}>{link.label}</Link>
                        ))}
                        {actions}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;