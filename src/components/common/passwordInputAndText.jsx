import {Input} from "@arco-design/web-react";

export function PasswordInputAndText(props) {
    const {text,textCss,inputCss,disabled, setValue} = props;

    function onChange(value) {
        setValue(value);
    }


    return (
        <div>
            <div style={textCss}>{text}</div>
            <Input.Password
                defaultVisibility={false}
                style={inputCss}
                onChange={onChange}
            />
        </div>
    );
}