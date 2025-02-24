interface Props {
    label?: string;
    value: string;
    onChange: (newValue: string) => void;
  }
  
  
  export const TextInput = ({ label, value, onChange }: Props) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input 
                type="text" 
                className="form-control" 
                id={label}
                value={value}
                onChange={(e) => onChange(e.target.value)} />
        </> 
    );
  };
  
  export default TextInput;