import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import RevenueTable from "../Tables/RevenueTable";

interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

interface RevenueTabProps {
    monthlyRevenue: MonthlyRevenue[];
}

const RevenueTab = ({ monthlyRevenue }: RevenueTabProps) => {
    return(
        <>
            <TabsContent value = "revenue" className = "space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Analysis</CardTitle>
                        <CardDescription>Detailed breakdown of revenue streams</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RevenueTable monthlyRevenue={monthlyRevenue} />
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    );
}

export default RevenueTab;