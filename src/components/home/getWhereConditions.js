import {changeTimeStrListTOStamp} from "../../tools/dataTools.js";

export function getWhereConditions (data) {
    const filteredData = Object.keys(data).filter(key => data[key] !== null).reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});

    let queries = [];
    let compoundQueries = [];

    for (let key in filteredData) {
        if(typeof filteredData[key] === "object"){
            let res = compoundCondition(key,filteredData[key])
            compoundQueries.push(res[0]);
            compoundQueries.push(res[1]);
        }else{
            queries.push(simpleCondition(key,filteredData[key]));
        }
    }

    return [queries,compoundQueries];
}

function simpleCondition(key,value){
    //console.log("this is simple condition", value);
    key = key.toString();

    if(key === "gender" && value === "any") return;

    return [key,"==",value];
}

function compoundCondition(key,value){
    //console.log("this is compound condition", value);
    key = key.toString();
    if(key==="moveInDateRange"){
        value = changeTimeStrListTOStamp(value);
        return [["moveInStart",">=",value[0]],["moveInEnd","<=",value[1]]];
    }else{
        return [["priceMin",">=",value[0]],["priceMax","<=",value[1]]];
    }
}


export function filterPriceAndMoveInDate(res, compoundQueries){
    if (compoundQueries.length === 0) return res;
    let queries = {};
    for (let query of compoundQueries){
        queries[query[0]] = query[2];
    }

    let filteredRes;

    let compoundQueriesKeys = Object.keys(queries);

    if (compoundQueriesKeys.includes("priceMin") && compoundQueriesKeys.includes("priceMax")){
        let priceMin = queries["priceMin"];
        let priceMax = queries["priceMax"];

        filteredRes = Object.keys(res).filter(key => {
            return res[key]["priceMin"] >= priceMin && res[key]["priceMax"] <= priceMax;
        }).reduce((obj, key) => {
            obj[key] = res[key];
            return obj;
        }  , {});
    }

    if (compoundQueriesKeys.includes("moveInStart") && compoundQueriesKeys.includes("moveInEnd")){
        let moveInStart = queries["moveInStart"].getTime() / 1000;
        let moveInEnd = queries["moveInEnd"].getTime() / 1000;

        filteredRes = Object.keys(res).filter(key => {
            return res[key]["moveInStart"].seconds <= moveInStart && res[key]["moveInEnd"].seconds >= moveInEnd;
        }).reduce((obj, key) => {
            obj[key] = res[key];
            return obj;
        }  , {});
    }
    //console.log("filteredRes",filteredRes)

    return filteredRes
}