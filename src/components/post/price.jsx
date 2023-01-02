import "./post.css";
import {Slider} from "@arco-design/web-react";

export  function  Price (props) {
    function formatTooltip(val) {
        return <span>RM {val}</span>;
    }

    function onChange(value) {
        //console.log(value);
        props.setPrice(value);
    }

    return(
        <div className={"price-con"}>
            <span className={"post-title"}>Price:</span>
            <Slider
                defaultValue={props.price}
                showInput={{
                    hideControl: false,
                    style: {
                        width: 80,
                    },
                }}
                range
                max={5000}
                className={"price-slider"}
                formatTooltip={formatTooltip}
                onChange={onChange}
            />
        </div>
    )
}