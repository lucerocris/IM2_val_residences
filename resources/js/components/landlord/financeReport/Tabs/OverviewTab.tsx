import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

interface PropertyPerformance {
    address: string;
    units: number;
    occupancy: number;
    monthlyRent: number;
    yearlyRevenue: number;
    maintenanceCosts: number;
    netIncome: number;
}

interface OverviewTabProps {
    monthlyRevenue?: MonthlyRevenue[];
    propertyPerformance?: PropertyPerformance[];
}

const OverViewTab = ({ monthlyRevenue, propertyPerformance }: OverviewTabProps) => {
    return(
        <>
            <TabsContent value = "overview" className = "space-y-6">
                <div className = "grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MonthlyRevenueTrend monthlyRevenue={monthlyRevenue} />
                    <TopPerformingProperties propertyPerformance={propertyPerformance} />
                </div>
            </TabsContent>
        </>
    );
}

const MonthlyRevenueTrend = ({ monthlyRevenue }:OverviewTabProps) => {
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Revenue Trend</CardTitle>
                    <CardDescription>Revenue, expenses, and profit over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className = "space-y-4">
                        {monthlyRevenue.slice(-3).map((monthly, idx) => (
                            <div key = {idx} className = "flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className = "font-medium">{monthly.month}</div>
                                    <div className = "text-sm tex-gray-500">
                                        Revenue: ₱{monthly.revenue.toLocaleString()} | Expenses: ₱{monthly.expenses.toLocaleString()}
                                    </div>
                                </div>
                                <div className = "text-right">
                                    <div className = "font-bold text-green-600">₱{monthly.profit.toLocaleString()}</div>
                                    <div className = "text-xs text-gray-500">Net Profit</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

const TopPerformingProperties = ({ propertyPerformance }:OverviewTabProps) => {
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Top Performing Properties</CardTitle>
                    <CardDescription>Properties ranked by net income</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className = "space-y-4">
                        {propertyPerformance
                        .sort((a, b) => b.netIncome - a.netIncome)
                        .slice(0,3)
                        .map((property, idx) => (
                            <div key = {idx} className = "flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className = "font-medium"> {property.address }</div>
                                    <div className = "text-sm text-gray-500">{property.units} units • {property.occupancy}% occupied</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default OverViewTab