import React, { useState } from 'react'

interface SidebarProps {
    children?:React.ReactNode;
}

const Sidebar = ({children}:SidebarProps) => {
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if(e.clientX < 32) {
                setOpen(true);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return() => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleMouseLeave = () => setOpen(false);

    return(
        <>
            <div className = {`fixed top-0 left-0 h-full bg-[#e8e8e8] text-black shadow-lg transition-transform duration-300 z-50
                ${open ? "translate-x-0" : "-translate-x-full"}`}
                style = {{width: 240}}
                onMouseLeave = {handleMouseLeave}
                >
                    <div className = "p-6">
                        <h2 className = "text-xl font-bold mb-6">Sidebar</h2>

                        {children || (
                            <ul className = "space-y-4">
                                
                            </ul>
                        )}
                    </div>
            </div>
        </>
    );
}

export default Sidebar;