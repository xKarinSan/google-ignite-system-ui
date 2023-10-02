import { Input } from "@chakra-ui/react";

export function ModifiedInput({
    type,
    value,
    placeholder,
    onChange,
}: {
    type: string;
    value: any;
    placeholder: string;
    onChange: (value: any) => void;
}) {
    return (
        <>
            {/* <Text>{placeholder}:</Text> */}
            <Input
                type={type}
                value={value}
                placeholder={placeholder ? placeholder : ""}
                margin={5}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    );
}
