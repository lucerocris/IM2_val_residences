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

export default ExpensesTab;