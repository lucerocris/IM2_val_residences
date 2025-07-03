import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputLabelProps {
    label: string;
    input: React.ReactNode;
}

const InputLabel = ({ label, input }:InputLabelProps) => {
    return(
        <>
            <div className = "space-y-2">
                <Label htmlFor = {label}>{label}</Label>
                {input}
            </div>
        </>
    );
}

export default InputLabel;