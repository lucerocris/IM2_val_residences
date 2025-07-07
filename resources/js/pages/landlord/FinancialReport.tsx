import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LandlordLayout from "@/layout/LandlordLayout";
import LandlordPageHeaderSection from "@/components/landlord/ui/LandlordPageHeaderSection";
import { TrendingUp, DollarSign, Home, Wrench } from "lucide-react"
import OverViewTab from "@/components/landlord/financeReport/Tabs/OverviewTab";
import RevenueTab from "@/components/landlord/financeReport/Tabs/RevenueTab";
import PropertiesTab from "@/components/landlord/financeReport/Tabs/PropertiesTab";
import ExpensesTab from "@/components/landlord/financeReport/Tabs/ExpensesTab";

const monthlyRevenue = [
  { month: "Jan 2024", revenue: 18500, expenses: 3200, profit: 15300 },
  { month: "Feb 2024", revenue: 18500, expenses: 2800, profit: 15700 },
  { month: "Mar 2024", revenue: 19200, expenses: 4100, profit: 15100 },
  { month: "Apr 2024", revenue: 19200, expenses: 2900, profit: 16300 },
  { month: "May 2024", revenue: 19900, expenses: 3500, profit: 16400 },
  { month: "Jun 2024", revenue: 19900, expenses: 2600, profit: 17300 },
]

const propertyPerformance = [
  {
    address: "123 Oak Street",
    units: 2,
    occupancy: 100,
    monthlyRent: 3000,
    yearlyRevenue: 36000,
    maintenanceCosts: 2400,
    netIncome: 33600,
  },
  {
    address: "456 Pine Avenue",
    units: 3,
    occupancy: 67,
    monthlyRent: 4500,
    yearlyRevenue: 36000,
    maintenanceCosts: 1800,
    netIncome: 34200,
  },
  {
    address: "789 Elm Drive",
    units: 2,
    occupancy: 100,
    monthlyRent: 3200,
    yearlyRevenue: 38400,
    maintenanceCosts: 3200,
    netIncome: 35200,
  },
  {
    address: "321 Maple Court",
    units: 3,
    occupancy: 100,
    monthlyRent: 4200,
    yearlyRevenue: 50400,
    maintenanceCosts: 2100,
    netIncome: 48300,
  },
  {
    address: "654 Cedar Lane",
    units: 2,
    occupancy: 50,
    monthlyRent: 3400,
    yearlyRevenue: 20400,
    maintenanceCosts: 1600,
    netIncome: 18800,
  },
]

const maintenanceExpenses = [
  { date: "2024-01-15", property: "123 Oak Street", description: "Plumbing repair", cost: 450, category: "Plumbing" },
  { date: "2024-01-22", property: "456 Pine Avenue", description: "HVAC maintenance", cost: 320, category: "HVAC" },
  { date: "2024-02-05", property: "789 Elm Drive", description: "Roof repair", cost: 1200, category: "Roofing" },
  {
    date: "2024-02-18",
    property: "321 Maple Court",
    description: "Appliance replacement",
    cost: 800,
    category: "Appliances",
  },
  { date: "2024-03-10", property: "654 Cedar Lane", description: "Painting", cost: 600, category: "Cosmetic" },
]

const FinanceReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const currentMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1]
  const previousMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2]
  const revenueChange =
    ((currentMonthRevenue.revenue - previousMonthRevenue.revenue) / previousMonthRevenue.revenue) * 100

  const totalYearlyRevenue = propertyPerformance.reduce((sum, prop) => sum + prop.yearlyRevenue, 0)
  const totalMaintenanceCosts = propertyPerformance.reduce((sum, prop) => sum + prop.maintenanceCosts, 0)
  const totalNetIncome = propertyPerformance.reduce((sum, prop) => sum + prop.netIncome, 0)
  const averageOccupancy = propertyPerformance.reduce((sum, prop) => sum + prop.occupancy, 0) / propertyPerformance.length

  // Prepare metrics data for LandlordPageHeaderSection
  const metrics = [
    {
      title: "Total Revenue",
      metric: `₱${totalYearlyRevenue.toLocaleString()}`,
      metricDescription: (
        <span className="flex items-center text-sm text-muted-foreground">
          <TrendingUp className="w-3 h-3 mr-1" />
          {`${revenueChange.toFixed(1)}%`} from last month
        </span>
      ),
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Net Income",
      metric: `₱${totalNetIncome.toLocaleString()}`,
      metricDescription: (
        <span className="flex items-center text-sm text-muted-foreground">
          {((totalNetIncome / totalYearlyRevenue) * 100).toFixed(1)}% profit margin
        </span>
      ),
      icon: <TrendingUp className="h-4 w-4 text-green-600" />
    },
    {
      title: "Maintenance Costs",
      metric: `₱${totalMaintenanceCosts.toLocaleString()}`,
      metricDescription: (
        <span className="flex items-center text-sm text-muted-foreground">
          {((totalMaintenanceCosts / totalYearlyRevenue) * 100).toFixed(1)}% of revenue
        </span>
      ),
      icon: <Wrench className="h-4 w-4 text-orange-600" />
    },
    {
      title: "Occupancy Rate",
      metric: `${averageOccupancy.toFixed(1)}%`,
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
            metric={metrics}
          />

          {/* Tabs Section */}
          <div className="mt-8">
            <TabArea />
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
}

const TabArea = () => {
    return(
        <>
            <Tabs defaultValue = "overview" className = "space-y-6">
                <TabsList className = "grid w-full grid-cols-4">
                    <TabsTrigger value = "overview">Overview</TabsTrigger>
                    <TabsTrigger value = "revenue">Revenue</TabsTrigger>
                    <TabsTrigger value = "properties">Properties</TabsTrigger>
                    <TabsTrigger value = "expenses">Expenses</TabsTrigger>
                </TabsList>

                <OverViewTab monthlyRevenue = {monthlyRevenue} propertyPerformance={propertyPerformance} />
                <RevenueTab monthlyRevenue = {monthlyRevenue} />
                <PropertiesTab propertyPerformance={propertyPerformance}  />
                <ExpensesTab maintenanceExpenses={maintenanceExpenses} />
            </Tabs>
        </>
    );
}

export default FinanceReport;
