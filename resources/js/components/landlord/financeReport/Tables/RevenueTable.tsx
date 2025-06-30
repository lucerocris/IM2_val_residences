import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

interface RevenueTableProps {
    monthlyRevenue: MonthlyRevenue[];
}

const RevenueTable = ({monthlyRevenue}: RevenueTableProps) => {
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Gross Revenue</TableHead>
                        <TableHead>Operating Expenses</TableHead>
                        <TableHead>Net Profit</TableHead>
                        <TableHead>Profit Margin</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                </TableBody>
            </Table>
        </>
    );
}

export default RevenueTable;