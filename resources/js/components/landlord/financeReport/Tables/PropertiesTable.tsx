import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PropertyPerformance {
    address: string;
    units: number;
    occupancy: number;
    monthlyRent: number;
    yearlyRevenue: number;
    maintenanceCosts: number;
    netIncome: number;
}

interface PropertiesTableProps {
    propertyPerformance: PropertyPerformance[]
}

const PropertiesTable = ( { propertyPerformance }:PropertiesTableProps) => {
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead>Occupancy</TableHead>
                        <TableHead>Monthly Rent</TableHead>
                        <TableHead>Annual Revenue</TableHead>
                        <TableHead>Maintenance</TableHead>
                        <TableHead>Net Income</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {propertyPerformance.map((property, idx) => (
                        <TableRow key = {idx}>
                            <TableCell className = "font-medium">{property.address}</TableCell>
                            <TableCell>{property.units}</TableCell>
                            <TableCell>
                                <Badge variant = {
                                    property.occupancy === 100
                                    ? "default"
                                    : property.occupancy >= 75
                                    ? "secondary"
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
                </TableBody>
            </Table>
        </>
    );
}

export default PropertiesTable;