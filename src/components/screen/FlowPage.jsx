import {Text,StyleSheet,Dimensions,ScrollView,View,Button} from "react-native"
import {useState,useEffect,useContext} from "react"
import styles from "../StyleSheet.js"
import {SimpData} from "../Contexts.js"
import {getPillList,getGridContain} from "../KVS.js"
import { createDrawerNavigator } from '@react-navigation/drawer';

const window_width=Dimensions.get('window').width;
const window_height=Dimensions.get('window').height;

const ava_limit=30*3600*1000;
const DrawerNavi=createDrawerNavigator();

function bef(time_t)
{
    //console.log(Date.now())
    return (time_t<Date.now());
}
function bef_del(time_t,time_d)
{
    //time_t
    return (time_t<Date.now()+time_d);
}

function FlowCard(props)
{
    //console.log(props.time)
    //console.log(new Date(props.time).toLocaleString());
    let date_string=new Date(props.time).toLocaleString();
    return <View style={[styles.container,bef(props.time)?styles.outdated:styles.coming]}>
        <Text style={styles.h2}>{props.name}</Text>
        <Text style={styles.h2}>在盒子 {props.grid}</Text>
        <Text style={styles.p}>计划服用时间：{date_string}</Text>
        {
            bef_del(props.time,-ava_limit)?<Text style={styles.p}>已过期！</Text>:<></>
        }
    </View>
}
export function FlowPage()
{
    const [data,setData]=useState([]);
    function getFlow()
    {
        //fetch("",{});
        const flowGet=[{
        "id":18,
        "grid":3,
        "count":2,
        "time":1615637120000,
        },{
        "id":19,
        "grid":2,
        "count":1,
        "time":1815637120000,
        }];
        let pill_list;
        let grid_contain;//waiting to modify it to sync
        getGridContain().then(gc_res=>{grid_contain=gc_res})
        .then(()=>getPillList())
        .then((list_res)=>{
            pill_list=list_res;
        }).then(()=>{
            console.log(pill_list);
            console.log(grid_contain);
            const msgData=flowGet.map((res)=>({
            id:res.id,
            time:res.time,
            count:res.count,
            grid:res.grid,
            name:(grid_contain[res.grid]?pill_list[grid_contain[res.grid]].pill_name:"")
            }))
            //console.log(grid_contain[1]);
            console.log(pill_list[grid_contain[1]])
            console.log(msgData);
            setData(msgData);
        })
        
        //setData([{"time":1615637120000,"name":"一种药A","description":"cow horse",id:118},{"time":1815637120000,"name":"二种药","description":"cow house",id:119}]);
    
    }
    useEffect(getFlow,[]);
    function testFunction()
    {
        getPillList()
        .then((res)=>{
            console.log(res);
        })
        
    }
    return <>
        {/*<Button title="编辑" onPress={testFunction}></Button>*/}
        
        <ScrollView>
            {data.map(datap=><FlowCard {...datap} key={datap.id}/>)}
        </ScrollView>
    </>
}

export default function DatePage()
{
    const [simp,setSimp]=useContext(SimpData);
    console.log("At Flow Page "+simp);
    //setSimp(true)
    if(simp) return <FlowPage></FlowPage>
    else return(<DrawerNavi.Navigator>
        <DrawerNavi.Screen name="卡片视图" component={FlowPage}/>
    </DrawerNavi.Navigator>)
    //如果 not simplify 就返回一个Drawer Navigator
}