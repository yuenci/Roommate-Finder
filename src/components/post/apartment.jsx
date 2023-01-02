import "./post.css";
import {Select} from "@arco-design/web-react";

export default function Apartment(props) {
    const Option = Select.Option;
    const options = ["Endah Regal", "Endah Promenade", "Endah Ria", "Parkhill", "One South", "Fortune Park", "Vista"];

    function handleChange(value) {
        //console.log(value);
        props.setApartment(value);
    }

    return(
        <div className={"apartment-con"}>
            <span className={"post-title"}>Apartment</span>
            <Select placeholder='Please select' style={{ width: 154 }} allowClear allowCreate className={"select-apartment"} onChange={handleChange}>
                {options.map((option, index) => (
                    <Option key={index} value={option}>
                        {option}
                    </Option>
                ))}
            </Select>
        </div>
    )
}