import {Input} from "@arco-design/web-react";

export function InputAndText(props) {
    const {text,textCss,inputCss,placeholder,disabled,defaultValue,setValue} = props;

    function onChange(value) {
        console.log(value);
        setValue(value);
    }



    return (
        <div>
            <div style={textCss}>{text}</div>
            {disabled
                ? <Input style={inputCss} allowClear placeholder={placeholder} disabled defaultValue={defaultValue} onChange={onChange}/>
                : <Input style={inputCss} allowClear placeholder={placeholder} defaultValue={defaultValue} onChange={onChange}/>
            }
        </div>
    );
}