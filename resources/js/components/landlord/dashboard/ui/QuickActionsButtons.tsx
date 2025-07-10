import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface  QuickActionsButtonsProps {
    icon: ReactNode;
    href: string;
    buttonTitle: string,
}

const QuickActionsButtons = ({icon, buttonTitle, href}: QuickActionsButtonsProps) => {
    return (
        <Link href={href}>
            <Button variant="outline" className="h-full flex-col gap-2 bg-transparent w-full">
                {icon}
                {buttonTitle}
            </Button>
        </Link>

    );
}

export default QuickActionsButtons;
