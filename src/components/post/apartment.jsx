import "./post.css";
import {Select} from "@arco-design/web-react";
import {apartments} from "../../config.js";

export default function Apartment(props) {
    const Option = Select.Option;
    function handleChange(value) {
        //console.log(value);
        props.setApartment(value);
    }

    return(
        <div className={"apartment-con"}>
            <span className={"post-title"}>Apartment</span>
            <Select placeholder='Please select' style={{ width: 154 }} allowClear allowCreate className={"select-apartment"} onChange={handleChange}>
                {apartments.map((option, index) => (
                    <Option key={index} value={option}>
                        {option}
                    </Option>
                ))}
            </Select>
        </div>
    )
}