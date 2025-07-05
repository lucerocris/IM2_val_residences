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
            <div className="flex h-[80px] flex-col justify-center gap-[8px] self-stretch px-[70px] bg-[#323232]">
                <div className="flex justify-between items-center self-stretch">

                    <div className="flex flex-col">
                        <img src = "/images/Val.svg" className = "w-20 h-20" />
                    </div>
                    {/*Nav bar links*/}
                    <div className="flex items-center gap-[24px] text-white">
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