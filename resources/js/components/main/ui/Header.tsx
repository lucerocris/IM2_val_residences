import { Link } from '@inertiajs/react';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';
type HeaderLink = { label: string; href: string; method?: Method };
type HeaderLink2 = { label: string; href: string; method?: Method };
type HeaderProps = {
    links: HeaderLink[];
    links2?: HeaderLink2[];
    actions?: React.ReactNode;
};

const Header = ({ links, links2, actions }: HeaderProps) => {
    return (
        <>
            <div className="flex h-[80px] flex-col justify-center gap-[8px] self-stretch bg-[#323232] px-[50px]">
                <div className="flex items-center justify-between self-stretch">
                    {/*Nav bar links*/}
                    <div className="flex w-full items-center justify-between gap-[24px] text-white">
                        <div className="flex flex-col">
                            <img src="/images/Val.svg" className="h-20 w-20" />
                        </div>

                        <div className="space-evenly flex items-center gap-[24px] self-center">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    method={link.method}
                                    className="relative text-white after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="space-evenly flex items-center gap-[24px]">
                            {links2 && (
                                <div className="flex items-center gap-[24px]">
                                    {links2.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            method={link.method}
                                            as="button"
                                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-white px-4 text-sm font-medium whitespace-nowrap text-black opacity-90 transition-colors duration-400 hover:bg-accent hover:text-accent-foreground hover:opacity-70 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {actions && <div className="flex items-center gap-[12px]">{actions}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
