interface Props {
    label: string;
  }
  
  
  export const TextInput = ({ label }: Props) => {
    return (
        <>
            <label htmlFor="exampleInputPassword1">{label}</label>
            <input type="text" className="form-control" id="exampleInputPassword1" />
        </> 
    );
  };
  
  export default TextInput;