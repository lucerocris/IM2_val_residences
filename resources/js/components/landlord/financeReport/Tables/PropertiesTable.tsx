import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PropertyPerformance } from '@/types/financialReport.types';

interface PropertiesTableProps {
    propertyPerformance: PropertyPerformance[];
}

const PropertiesTable = ( { propertyPerformance }:PropertiesTableProps) => {
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeads />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <Body propertyPerformance={propertyPerformance} />
                </TableBody>
            </Table>
        </>
    );
}

const TableHeads = () => {
    return(
        <>
            <TableHead>Property</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead>Monthly Rent</TableHead>
            <TableHead>Annual Revenue</TableHead>
            <TableHead>Maintenance</TableHead>
            <TableHead>Net Income</TableHead>
        </>
    );
}

const Body = ({ propertyPerformance }:PropertiesTableProps) => {
    return(
        <>
            {propertyPerformance.map((property, idx) => (
                <TableRow key = {idx}>
                    <TableCell className = "font-medium">{property.address}</TableCell>
                    <TableCell>{property.units}</TableCell>
                    <TableCell>
                        <Badge variant = {
                            property.occupancy === 100
                            ? "success"
                            : property.occupancy >= 75
                            ? "orange"
                            : "destructive"
                        }>
                            {property.occupancy}%
                        </Badge>
                    </TableCell>
                    <TableCell>₱{property.monthlyRent.toLocaleString()}</TableCell>
                    <TableCell>₱{property.yearlyRevenue.toLocaleString()}</TableCell>
                    <TableCell className = "text-orange-600">₱{property.maintenanceCosts.toLocaleString()}</TableCell>
                    <TableCell className = "text-green-600 font-medium">₱{property.netIncome.toLocaleString()}</TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default PropertiesTable;
