import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";

interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

interface RevenueTabProps {
    monthlyRevenue: MonthlyRevenue[];
}

const RevenueTab = () => {
    return(
        <>
            <TabsContent value = "revenue" className = "space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Analysis</CardTitle>
                        <CardDescription>Detailed breakdown of revenue streams</CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    );
}

export default RevenueTab;