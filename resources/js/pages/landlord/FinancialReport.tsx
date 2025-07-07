import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LandlordLayout from "@/layout/LandlordLayout";
import LandlordPageHeaderSection from "@/components/landlord/ui/LandlordPageHeaderSection";
import { TrendingUp, DollarSign, Home, Wrench } from "lucide-react"
import OverViewTab from "@/components/landlord/financeReport/Tabs/OverviewTab";
import RevenueTab from "@/components/landlord/financeReport/Tabs/RevenueTab";
import PropertiesTab from "@/components/landlord/financeReport/Tabs/PropertiesTab";
import ExpensesTab from "@/components/landlord/financeReport/Tabs/ExpensesTab";
import { MonthlyRevenue, PropertyPerformance, MaintenanceExpense } from "@/types/financialReport.types";

interface FinancialReportProps {
    monthlyRevenue: MonthlyRevenue[];
    propertyPerformance: PropertyPerformance[];
    maintenanceExpenses: MaintenanceExpense[];
    metrics: {
        totalYearlyRevenue: number;
        totalMaintenanceCosts: number;
        totalNetIncome: number;
        averageOccupancy: number;
        revenueChange: number;
    };
}

const FinanceReport = ({
                           monthlyRevenue = [],
                           propertyPerformance = [],
                           maintenanceExpenses = [],
                           metrics = {
                               totalYearlyRevenue: 0,
                               totalMaintenanceCosts: 0,
                               totalNetIncome: 0,
                               averageOccupancy: 0,
                               revenueChange: 0,
                           }
                       }: FinancialReportProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState("6months")

    // Prepare metrics data for LandlordPageHeaderSection
    const metricsData = [
        {
            title: "Total Revenue",
            metric: `₱${metrics.totalYearlyRevenue.toLocaleString()}`,
            metricDescription: (
                <span className="flex items-center text-sm text-muted-foreground">
          <TrendingUp className="w-3 h-3 mr-1" />
                    {`${metrics.revenueChange.toFixed(1)}%`} from last month
        </span>
            ),
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
        },
        {
            title: "Net Income",
            metric: `₱${metrics.totalNetIncome.toLocaleString()}`,
            metricDescription: (
                <span className="flex items-center text-sm text-muted-foreground">
          {metrics.totalYearlyRevenue > 0 ? ((metrics.totalNetIncome / metrics.totalYearlyRevenue) * 100).toFixed(1) : '0'}% profit margin
        </span>
            ),
            icon: <TrendingUp className="h-4 w-4 text-green-600" />
        },
        {
            title: "Maintenance Costs",
            metric: `₱${metrics.totalMaintenanceCosts.toLocaleString()}`,
            metricDescription: (
                <span className="flex items-center text-sm text-muted-foreground">
          {metrics.totalYearlyRevenue > 0 ? ((metrics.totalMaintenanceCosts / metrics.totalYearlyRevenue) * 100).toFixed(1) : '0'}% of revenue
        </span>
            ),
            icon: <Wrench className="h-4 w-4 text-orange-600" />
        },
        {
            title: "Occupancy Rate",
            metric: `${metrics.averageOccupancy.toFixed(1)}%`,
            metricDescription: "Across all properties",
            icon: <Home className="h-4 w-4 text-blue-600" />
        }
    ]

    return (
        <LandlordLayout>
            <div className="space-y-6">
                <div className="w-full px-6">
                    {/* Header Section with Data Summary */}
                    <LandlordPageHeaderSection
                        title="Financial Reports"
                        subtitle="Comprehensive financial analytics and insights"
                        metric={metricsData}
                    />

                    {/* Tabs Section */}
                    <div className="mt-8">
                        <TabArea
                            monthlyRevenue={monthlyRevenue}
                            propertyPerformance={propertyPerformance}
                            maintenanceExpenses={maintenanceExpenses}
                        />
                    </div>
                </div>
            </div>
        </LandlordLayout>
    );
}

interface TabAreaProps {
    monthlyRevenue: MonthlyRevenue[];
    propertyPerformance: PropertyPerformance[];
    maintenanceExpenses: MaintenanceExpense[];
}

const TabArea = ({ monthlyRevenue, propertyPerformance, maintenanceExpenses }: TabAreaProps) => {
    return(
        <>
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="properties">Properties</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>

                <OverViewTab monthlyRevenue={monthlyRevenue} propertyPerformance={propertyPerformance} />
                <RevenueTab monthlyRevenue={monthlyRevenue} />
                <PropertiesTab propertyPerformance={propertyPerformance} />
                <ExpensesTab maintenanceExpenses={maintenanceExpenses} />
            </Tabs>
        </>
    );
}

export default FinanceReport;
