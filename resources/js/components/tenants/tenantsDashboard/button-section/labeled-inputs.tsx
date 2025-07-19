import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LabeledTextAreaProps{
    id: string;
    label: string;
    placeholder?: string;
    rows?: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const LabeledTextArea = ({id, label, placeholder, rows, value, onChange}:LabeledTextAreaProps) => {
    return(
        <div className = "space-y-2">
            <Label htmlFor = {id}>{label}</Label>
            <Textarea 
                id = {id}
                placeholder = {placeholder}
                rows = {rows}
                value = {value}
                onChange = {onChange}
            />
        </div>
    )
}

interface LabeledSelectProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    options: {
        label: string;
        value: string;
    }[];
}

export const LabeledSelect = ({ label, value, onValueChange, placeholder, options }:LabeledSelectProps) => {
    return(
        <div className = "space-y-4">
            <Label htmlFor = {label}>{label}</Label>
            <Select value = {value} onValueChange = {onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder = {placeholder || "Select priority level"} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key = {option.value} value = {option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

interface LabeledInputProps {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabeledInput = ({ id, label, type, placeholder, value, onChange }:LabeledInputProps) => {
    return (
        <div className = "space-y-2">
            <Label htmlFor = {id}>{label}</Label>
            <Input 
                id = {id}
                type = {type}
                placeholder = {placeholder}
                value = {value}
                onChange = {onChange}
            />
        </div>
    )
}