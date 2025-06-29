import { ReactNode } from 'react';

interface DashboardCardContentProps<T> {
    items: T[];
    renderItems: (item: T) => ReactNode;
    getKey: (item: T) => string | number;
}

const DashboardCardContent = <T,>({items, renderItems, getKey}: DashboardCardContentProps<T>) => {
    return (
        <div className="space-y-4 px-6">
            {items.map((item) => (
                <div key={getKey(item)}>{renderItems(item)}</div>
            ))}
        </div>
    );
};

export default DashboardCardContent;
