import {useState} from "react"

export async function getPillList()
{
    const pilllist_mem={
        "1":{
            "pill_id": 1,
            "pill_name": "药物1",
            "pill_description": "这是第一种药物。",
            "pill_conflicts": [2,3,5]
        },
        "2":{
            "pill_id": 2,
            "pill_name": "药物2",
            "pill_description": "这是第2种药物。",
            "pill_conflicts": [1]
        },
        "3":{
            "pill_id": 3,
            "pill_name": "药物3",
            "pill_description": "这是第3种药物。",
            "pill_conflicts": []
        }
    }
    return pilllist_mem;
    /*let pilllist=await fetch("./data/pillList.json",{});
    console.log("remosk");
    console.log(pilllist.json());
    return pilllist.json();
    */
    //return 15;
}

export async function getGridContain()
{
    const gridc_mem={
        "1":0,
        "2":3,
        "3":1,
        "4":2
    }
    return gridc_mem;
    /*
    let gridcontain=await fetch("./data/gridContain.json",{});
    return gridcontain.json();
    */
}

export function getPhotoPlace(pill_id)
{
    console.log("./data/pill_"+pill_id+".png")
    return "./data/pill_"+pill_id+".png"
}