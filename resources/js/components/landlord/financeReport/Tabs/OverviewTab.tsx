import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { MonthlyRevenue, PropertyPerformance } from "@/types/financialReport.types";
import { TrendingUp, TrendingDown, DollarSign, Building } from "lucide-react";

interface OverviewTabProps {
    monthlyRevenue?: MonthlyRevenue[];
    propertyPerformance?: PropertyPerformance[];
}

const OverViewTab = ({ monthlyRevenue = [], propertyPerformance = [] }: OverviewTabProps) => {
    return(
        <>
            <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MonthlyRevenueTrend monthlyRevenue={monthlyRevenue} />
                    <TopPerformingProperties propertyPerformance={propertyPerformance} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FinancialSummary monthlyRevenue={monthlyRevenue} />
                    <PropertySummary propertyPerformance={propertyPerformance} />
                </div>
            </TabsContent>
        </>
    );
}

const MonthlyRevenueTrend = ({ monthlyRevenue }: { monthlyRevenue: MonthlyRevenue[] }) => {
    const displayData = monthlyRevenue.slice(-3);

    return(
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Revenue Trend
                </CardTitle>
                <CardDescription>Revenue, expenses, and profit over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {displayData.length > 0 ? (
                        displayData.map((monthly, idx) => {
                            const profitPercentage = monthly.revenue > 0 ? (monthly.profit / monthly.revenue) * 100 : 0;
                            const isPositive = monthly.profit > 0;

                            return (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-lg border">
                                    <div className="flex-1">
                                        <div className="font-semibold text-lg">{monthly.month}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Revenue: ₱{monthly.revenue.toLocaleString()} | Expenses: ₱{monthly.expenses.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            {isPositive ? (
                                                <TrendingUp className="h-3 w-3 text-green-600" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3 text-red-600" />
                                            )}
                                            <span className="text-xs text-gray-500">
                                                {profitPercentage.toFixed(1)}% margin
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold text-xl ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                            ₱{monthly.profit.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">Net Profit</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>No revenue data available for the last 3 months</p>
                            <p className="text-sm mt-2">Start generating rental bills to see your revenue trends</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

const TopPerformingProperties = ({ propertyPerformance }: { propertyPerformance: PropertyPerformance[] }) => {
    const topProperties = propertyPerformance
        .sort((a, b) => b.netIncome - a.netIncome)
        .slice(0, 3);

    return(
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Top Performing Properties
                </CardTitle>
                <CardDescription>Properties ranked by net income</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {topProperties.length > 0 ? (
                        topProperties.map((property, idx) => {
                            const profitMargin = property.yearlyRevenue > 0 ?
                                ((property.netIncome / property.yearlyRevenue) * 100) : 0;

                            return (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-lg border">
                                    <div className="flex-1">
                                        <div className="font-semibold text-lg">{property.address}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {property.units} units • {property.occupancy}% occupied
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Monthly Rent: ₱{property.monthlyRent.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-green-600">
                                            ₱{property.netIncome.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {profitMargin.toFixed(1)}% margin
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>No property performance data available</p>
                            <p className="text-sm mt-2">Add rental units and generate bills to see property performance</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

const FinancialSummary = ({ monthlyRevenue }: { monthlyRevenue: MonthlyRevenue[] }) => {
    const currentMonth = monthlyRevenue.length > 0 ? monthlyRevenue[monthlyRevenue.length - 1] : null;
    const previousMonth = monthlyRevenue.length > 1 ? monthlyRevenue[monthlyRevenue.length - 2] : null;

    const revenueChange = currentMonth && previousMonth && previousMonth.revenue > 0 ?
        ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100 : 0;

    const expenseChange = currentMonth && previousMonth && previousMonth.expenses > 0 ?
        ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100 : 0;

    return(
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Summary
                </CardTitle>
                <CardDescription>Current month financial overview</CardDescription>
            </CardHeader>
            <CardContent>
                {currentMonth ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-3 rounded-lg">
                                <div className="text-sm font-medium">Revenue</div>
                                <div className="text-xl font-bold">
                                    ₱{currentMonth.revenue.toLocaleString()}
                                </div>
                                {previousMonth && (
                                    <div className={`text-xs flex items-center gap-1 ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {revenueChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        {Math.abs(revenueChange).toFixed(1)}% vs last month
                                    </div>
                                )}
                            </Card>

                            <Card className="p-3 rounded-lg">
                                <div className="text-sm font-medium">Expenses</div>
                                <div className="text-xl font-bold">
                                    ₱{currentMonth.expenses.toLocaleString()}
                                </div>
                                {previousMonth && (
                                    <div className={`text-xs flex items-center gap-1 ${expenseChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {expenseChange <= 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                        {Math.abs(expenseChange).toFixed(1)}% vs last month
                                    </div>
                                )}
                            </Card>
                        </div>

                        <Card className="p-4 rounded-lg">
                            <div className="text-sm font-medium">Net Profit</div>
                            <div className="text-2xl font-bold">
                                ₱{currentMonth.profit.toLocaleString()}
                            </div>
                            <div className="text-xs mt-1">
                                {currentMonth.revenue > 0 ? ((currentMonth.profit / currentMonth.revenue) * 100).toFixed(1) : '0'}% profit margin
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No financial data available</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

const PropertySummary = ({ propertyPerformance }: { propertyPerformance: PropertyPerformance[] }) => {
    const totalProperties = propertyPerformance.length;
    const totalUnits = propertyPerformance.reduce((sum, prop) => sum + prop.units, 0);
    const averageOccupancy = totalProperties > 0 ?
        propertyPerformance.reduce((sum, prop) => sum + prop.occupancy, 0) / totalProperties : 0;
    const bestPerformer = propertyPerformance.length > 0 ?
        propertyPerformance.reduce((best, current) => current.netIncome > best.netIncome ? current : best) : null;

    return(
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Property Overview
                </CardTitle>
                <CardDescription>Portfolio performance summary</CardDescription>
            </CardHeader>
            <CardContent>
                {totalProperties > 0 ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-3 rounded-lg">
                                <div className="text-sm font-medium">Properties</div>
                                <div className="text-xl font-bold">{totalProperties}</div>
                                <div className="text-xs">{totalUnits} total units</div>
                            </Card>

                            <Card className="p-3 rounded-lg">
                                <div className="text-smfont-medium">Occupancy</div>
                                <div className="text-xl font-bold">{averageOccupancy.toFixed(1)}%</div>
                                <div className="text-xs">Average rate</div>
                            </Card>
                        </div>

                        {bestPerformer && (
                            <Card className="p-4 rounded-lg">
                                <div className="text-smfont-medium">Best Performer</div>
                                <div className="text-lg font-bold">{bestPerformer.address}</div>
                                <div className="text-xs mt-1">
                                    ₱{bestPerformer.netIncome.toLocaleString()} net income
                                </div>
                            </Card>
                        )}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No property data available</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default OverViewTab
