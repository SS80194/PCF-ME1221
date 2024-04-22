import {useState} from "react"

export async function getPillList()
{
    let pilllist=await fetch("./data/pillList.json",{});
    return pilllist.json();
    //return 15;
}

export async function getGridContain()
{
    let gridcontain=await fetch("./data/gridContain.json",{});
    return gridcontain.json();
}

export function getPhotoPlace(pill_id)
{
    console.log("./data/pill_"+pill_id+".png")
    return "./data/pill_"+pill_id+".png"
}