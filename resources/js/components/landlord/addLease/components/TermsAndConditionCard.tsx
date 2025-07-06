import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type React from 'react';
import type { LeaseFormData } from '@/types/addLease.types';

interface TermsAndConditionCardProps {
    terms_and_conditions: string;
    onInputChange: (field: keyof LeaseFormData, value: string) => void;
    errors: Partial<Record<keyof LeaseFormData, string>>;
}

const TermsAndConditionCard = ({terms_and_conditions, onInputChange, errors}: TermsAndConditionCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Terms and Conditions
                </CardTitle>
                <CardDescription>Additional lease terms and conditions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="terms_and_conditions">Terms and Conditions</Label>
                    <Textarea
                        id="terms_and_conditions"
                        placeholder="Enter specific lease terms, rules, and conditions..."
                        value={terms_and_conditions}
                        onChange={(e) => onInputChange('terms_and_conditions', e.target.value)}
                        rows={6}
                        className={errors.terms_and_conditions ? 'border-red-500' : ''}
                    />
                    {errors.terms_and_conditions && <p className="text-sm text-red-500">{errors.terms_and_conditions}</p>}
                </div>
            </CardContent>
        </Card>
    )
}

export default TermsAndConditionCard;
