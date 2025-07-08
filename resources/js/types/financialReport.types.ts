export interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

export interface PropertyPerformance {
    address: string;
    units: number;
    occupancy: number;
    monthlyRent: number;
    yearlyRevenue: number;
    maintenanceCosts: number;
    netIncome: number;
}

export interface MaintenanceExpense {
    date: string;
    property: string;
    description: string;
    cost: number;
    category: string;
}

export interface FinancialReportData {
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
