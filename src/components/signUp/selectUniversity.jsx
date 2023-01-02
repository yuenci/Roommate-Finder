import {Select} from "@arco-design/web-react";
import {useState} from "react";

export function SelectUniversity(props) {

    const Option = Select.Option;
    const options = ['APU', 'Harvard', 'MIT'];


    return(
        <Select
            className="input-sign"
            placeholder='Please select your university'
            // className="select"
            onChange={(value) =>props.setUniversity(value)}
        >
            {options.map((option, index) => (
                <Option key={option} disabled={index === 3} value={option}>
                    {option}
                </Option>
            ))}
        </Select>
    )
}