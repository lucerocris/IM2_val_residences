import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface  QuickActionsButtonsProps {
    icon: ReactNode,
    buttonTitle: string,
}

const QuickActionsButtons = ({icon, buttonTitle}: QuickActionsButtonsProps) => {
    return (
        <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
            {icon}
            {buttonTitle}
        </Button>
    );
}

export default QuickActionsButtons;
