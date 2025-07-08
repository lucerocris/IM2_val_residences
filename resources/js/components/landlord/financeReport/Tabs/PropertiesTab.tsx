import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import PropertiesTable from "../Tables/PropertiesTable";
import { PropertyPerformance} from '@/types/financialReport.types';

interface PropertiesTabProps {
    propertyPerformance: PropertyPerformance[]
}

const PropertiesTab = ({ propertyPerformance }: PropertiesTabProps) => {
    return(
        <>
            <TabsContent value = "properties" className = "space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Property Performance</CardTitle>
                        <CardDescription>Individual property financial performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PropertiesTable propertyPerformance = {propertyPerformance} />
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    );
}

export default PropertiesTab;
