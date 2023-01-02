import {Button, ConfigProvider, DatePicker, InputNumber, Radio, Select, Slider} from "@arco-design/web-react";

import enUS from "@arco-design/web-react/es/locale/en-US.js";
import {useState} from "react";
import {getWhereConditions,filterPriceAndMoveInDate} from "./getWhereConditions.js";
import {StatusContainer} from "../../StatusContainer.js";
import {useNavigate} from "react-router-dom";

export function Filter(){
    const filterCSS = {
        marginTop: "40px",
        width: "250px",
        height: "620px",
        boxShadow: "0 0 5px 0 rgba(0,0,0,0.1)",
        boxSizing: "border-box",
        padding: "20px 10px",
        marginLeft: "20px",
        borderRadius: "10px",
    }

    const componentCSS = {
        marginBottom: "10px",
    }

    const RadioGroup = Radio.Group;
    const options1 = ['I am looking for a room', "I am offering a room"]


    const Option = Select.Option;
    const options2 = ["Endah Regal", "Endah Promenade", "Endah Ria", "Parkhill", "One South", "Fortune Park", "Vista"];

    const { RangePicker } = DatePicker;

    const [value, setValue] = useState(30);

    function formatTooltip(val) {
        return <span>RM {val}</span>;
    }

    const [type, setType] = useState(null);
    const [apartment, setApartment] = useState(null);
    const [moveInDateRange, setMoveInDateRange] = useState(null);
    const [bedroomNum, setBedroomNum] = useState(null);
    const [gender, setGender] = useState(null);
    const [size, setSize] = useState(null);
    const [priceRange, setPriceRange] = useState(null);

    const navigate = useNavigate();

    async function search() {
        //console.log(type);
        //console.log(apartment);
        //console.log(moveInDateRange);
        //console.log(bedroomNum);
        // console.log(gender);
        // console.log(size);
        // console.log(priceRange);
        let data = {
            type: type,
            apartment: apartment,
            moveInDateRange: moveInDateRange,
            bedroomNum: bedroomNum,
            gender:gender,
            size: size,
            priceRange: priceRange,
        }
        let queries = getWhereConditions(data);

        let simpleQueries =queries[0];

        //console.log(simpleQueries);
        //console.log(queries);

        let fbStore = StatusContainer.fireBaseStore;

        let res;
        if(simpleQueries.length !== 0){
            res = await fbStore.query("rooms", simpleQueries);
        }else{
            res = StatusContainer.currentAllRoomsData;
        }


        StatusContainer.currentSearchRoomsData = filterPriceAndMoveInDate(res, queries[1]);

        navigate("/home/search");

        //console.log(res);

    }

    function typeChange(value){
        if(value===options1[0]){
            setType(true);
        }else{
            setType(false);
        }
    }

    /*function onChangeType(value) {
        setType(value);
    }*/

    return(
        <div style={filterCSS}>
           <div className={"post-title"}>
                <span >Type</span>
               <RadioGroup options={options1} className={"radios"} onChange={typeChange}/>
           </div>

            <div>
                <span className={"post-title"}>Apartment</span>
                <Select placeholder='Please select'
                        style={{ width: "100%", marginBottom: "10px" }}
                        allowClear allowCreate
                        onChange={(value)=>setApartment(value)}>
                    {options2.map((option, index) => (
                        <Option key={index} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            </div>

            <div  >
                <span className={"post-title"}>Move in date</span>
                <ConfigProvider locale={enUS}>
                    <RangePicker
                        style={componentCSS}
                        format='YYYY-MM-DD'
                        onChange={(value)=>setMoveInDateRange(value)}
                    />
                </ConfigProvider>
            </div>

            <div>
                <span className={"post-title"}>Bedroom number:</span>
                <InputNumber
                    mode='button'
                    defaultValue={3}
                    style={componentCSS}
                    onChange={(value)=>setBedroomNum(value)}
                />
            </div>

            <div >
                <span className={"post-title"}>Gender:</span>
                <RadioGroup options={['Male', "Female","Any"]} className={"radios"}
                            style={componentCSS} onChange={(value)=>setGender(value)} />
            </div>

            <div >
                <span className={"post-title"}>Size:</span>
                <RadioGroup options={["Small", "Medium", "Master"]} className={"radios"}
                            style={componentCSS} onChange={(value)=>setSize(value)} />
            </div>

            <div >
                <span className={"post-title"}>Price:</span>
                <Slider
                    range
                        // value={value}
                        onChange={(value)=>setPriceRange(value)}
                        defaultValue={[0, 2000]}
                        max={5000}
                    formatTooltip={formatTooltip}
                />
            </div>

            <Button type="primary" style={{width:100,margin:"10px auto",display:"block"}} onClick={search}>Search</Button>
        </div>
    )
}