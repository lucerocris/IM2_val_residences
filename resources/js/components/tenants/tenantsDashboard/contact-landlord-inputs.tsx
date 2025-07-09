import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputLabelProps {
    label?: string;
    labelText: string;
    input: React.ReactNode;
}

const InputLabel = ({ label, labelText, input }:InputLabelProps) => {
    return(
        <>
            <div className = "space-y-2">
                <Label htmlFor = {label}>{labelText}</Label>
                {input}
            </div>
        </>
    );
}

export default InputLabel;