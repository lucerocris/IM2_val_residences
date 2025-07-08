import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TenantFormData } from '@/types/addTenant.types';

interface AccountSecurityCardProps {
    password: string;
    password_confirmation: string;
    onInputChange: (field: keyof TenantFormData, value: string) => void;
    errors: Partial<Record<keyof TenantFormData, string>>;
}

const AccountSecurityCard = ({ password, password_confirmation, errors, onInputChange }: AccountSecurityCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Set up login credentials for the tenant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => onInputChange('password', e.target.value)}
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirm Password *</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="Confirm password"
                            value={password_confirmation}
                            onChange={(e) => onInputChange('password_confirmation', e.target.value)}
                            className={errors.password_confirmation ? 'border-red-500' : ''}
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AccountSecurityCard;
