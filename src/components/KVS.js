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