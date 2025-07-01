import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import ExpensesTable from "../Tables/ExpensesTable";

interface MaintenanceExpense {
    date: string;
    property: string;
    description: string;
    cost: number;
    category: string;
}

interface ExpensesTabProps {
    maintenanceExpenses: MaintenanceExpense[];
}

const ExpensesTab = ({ maintenanceExpenses }: ExpensesTabProps) => {
    return(
        <>
            <TabsContent value = "expenses" className = "space-y-6">
                <MaintenanceExpenses maintenanceExpenses = {maintenanceExpenses} />
                <ExpenseSummary maintenanceExpenses = {maintenanceExpenses} />
            </TabsContent>
        </>
    );
}

const MaintenanceExpenses = ({ maintenanceExpenses }: ExpensesTabProps) => {
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Expenses</CardTitle>
                    <CardDescription>Recent maintenance and repair costs</CardDescription>
                </CardHeader>
                <CardContent>
                    <ExpensesTable maintenanceExpenses={maintenanceExpenses} />
                </CardContent>
            </Card>
        </>
    );
}

const ExpenseSummary = ({ maintenanceExpenses }: ExpensesTabProps) => {
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Expense Summary</CardTitle>
                    <CardDescription>Breakdown of expenses by category</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["Plumbing", "HVAC", "Roofing", "Appliances", "Cosmetic", "Other"].map((category) => {
                        const categoryTotal = maintenanceExpenses
                            .filter((expense) => expense.category === category)
                            .reduce((sum, expense) => sum + expense.cost, 0)

                        return (
                            <div key={category} className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">{category}</div>
                            <div className="text-xl font-bold">₱{categoryTotal.toLocaleString()}</div>
                            </div>
                        )
                        })}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default ExpensesTab;