import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';


type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';
type HeaderLink = { label: string, href: string, method?: Method }
type HeaderLink2 = { label: string, href: string, method?: Method }
type HeaderProps = {
    links: HeaderLink[],
    links2?: HeaderLink2[],
    actions?: React.ReactNode
}

const Header = ({links, links2, actions}: HeaderProps) => {
    return (
        <>
            <div className="flex h-[80px] flex-col justify-center gap-[8px] self-stretch px-[50px] bg-[#323232]">
                <div className="flex justify-between items-center self-stretch">

                    {/*Nav bar links*/}
                    <div className="flex justify-between items-center gap-[24px] text-white w-full">

                    <div className="flex flex-col">
                        <img src = "/images/Val.svg" className = "w-20 h-20" />
                    </div>

                        <div className = "flex items-center self-center space-evenly gap-[24px]">
                             {links.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    method={link.method}
                                    className = "relative text-white after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className = "flex items-center space-evenly gap-[24px]">
                            {links2 && (
                                <div className = "flex items-center gap-[24px]">
                                    {links2.map(link => (
                                        <Link
                                          key = {link.href}
                                          href = {link.href}
                                          method= {link.method}
                                        >
                                            <Button
                                              type = "button"
                                              variant = "outline"
                                              className = "bg-white text-black hover:opacity-70 duration-400 opacity-90 px-4"
                                            >
                                                {link.label}
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            
                            {actions && (
                                <div className = "flex items-center gap-[12px]">
                                        {actions}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
