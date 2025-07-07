import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type React from 'react';
import type { PropertyFormData } from '@/types/propertyFormData.types';


interface PropertyDescriptionCardProps {
    description: string;
    onInputChange: (field: keyof PropertyFormData, value: string | string[]) => void;
    errors: Partial<Record<keyof PropertyFormData, string>>;
}

const PropertyDescriptionCard = ({description, onInputChange, errors}: PropertyDescriptionCardProps) => {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Property Description</CardTitle>
            <CardDescription>Provide additional details about the property</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Describe the property, neighborhood, special features, etc."
                    value={description}
                    onChange={(e) =>onInputChange('description', e.target.value)}
                    rows={4}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
        </CardContent>
    </Card>
    )
}

export default PropertyDescriptionCard;
