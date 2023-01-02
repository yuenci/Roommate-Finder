import {changeTimeStrListTOStamp} from "../../tools/dataTools.js";

export function getWhereConditions (data) {
    const filteredData = Object.keys(data).filter(key => data[key] !== null).reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});

    let queries = [];

    for (let key in filteredData) {
        if(typeof filteredData[key] === "object"){
            let res = compoundCondition(key,filteredData[key])
            queries.push(res[0]);
            queries.push(res[1]);
        }else{
            queries.push(simpleCondition(key,filteredData[key]));
        }
    }

    return queries;
}

function simpleCondition(key,value){
    //console.log("this is simple condition", value);
    key = key.toString();

    return [key,"==",value];
}

function compoundCondition(key,value){
    //console.log("this is compound condition", value);
    if(key==="moveInDateRange"){
        value = changeTimeStrListTOStamp(value);
    }

    key = key.toString();
    return [[key,">=",value[0]],[key,"<=",value[1]]];

}