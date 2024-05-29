import {useState} from "react"

export const default_gc={
    "1":0,
    "2":0,
    "3":0,
    "4":0
}
export let pill_list,grid_contain;

export function initArrays()
{
    //console.log("refreshing");
    getPillList().then((res)=>{pill_list=res});
    getGridContain().then((res)=>{grid_contain=res});
}

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
    /*
    const gridc_mem={
        "1":0,
        "2":3,
        "3":1,
        "4":2
    }
    return gridc_mem;
    */
    if(grid_contain) return grid_contain;
    else
    {
        let gridc_mem={
            "1":0,
            "2":3,
            "3":1,
            "4":2
        };
        grid_contain=gridc_mem;
        return grid_contain;
    }
    /*
    let gridcontain=await fetch("./data/gridContain.json",{});
    return gridcontain.json();
    */
}


export async function setPillList()
{
    //希望不需要yongdaota
    //
}
export async function setGridContain(newgc)
{
    grid_contain=newgc;
}

export function getPhotoPlace(pill_id)
{
    console.log("./data/pill_"+pill_id+".png")
    return "./data/pill_"+pill_id+".png"
}