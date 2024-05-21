import {Text,StyleSheet,Dimensions,ScrollView,View,Button} from "react-native"
import {useState,useEffect,useContext} from "react"
import styles from "../StyleSheet.js"
import {SimpData} from "../Contexts.js"
import {pill_list,grid_contain,getPillList,getGridContain} from "../KVS.js"
import { createDrawerNavigator } from '@react-navigation/drawer';

const window_width=Dimensions.get('window').width;
const window_height=Dimensions.get('window').height;

const ava_limit=30*3600*1000;
const DrawerNavi=createDrawerNavigator();

function bef(time_t)
{
    return (time_t<Date.now());
}
function bef_del(time_t,time_d)
{
    //time_t
    return (time_t<Date.now()+time_d);
}
async function getMsg()//get Messages and 
{
    if(!pill_list) await getPillList();
    if(!grid_contain) await getGridContain();

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
    return flowGet;
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
//--------------------Flow Page Start----------------------------
export function FlowPage()
{
    const [data,setData]=useState([]);
    function getFlow()
    {
        getMsg().then((flowGet)=>{
            const msgData=flowGet.map((res)=>({
            id:res.id,
            time:res.time,
            count:res.count,
            grid:res.grid,
            name:(grid_contain[res.grid]?pill_list[grid_contain[res.grid]].pill_name:"")
            }))
            setData(msgData);
        })
        
        //setData([{"time":1615637120000,"name":"一种药A","description":"cow horse",id:118},{"time":1815637120000,"name":"二种药","description":"cow house",id:119}]);
    
    }
    useEffect(getFlow,[]);useEffect(getFlow,[grid_contain,pill_list]);
    function testFunction()
    {
        getPillList()
        .then((res)=>{
            console.log(res);
        })
    }
    //console.log("Arriving at flow page")
    return <>
        {/*<Button title="编辑" onPress={testFunction}></Button>*/}
        
        <ScrollView>
            {data.map(datap=><FlowCard {...datap} key={datap.id}/>)}
        </ScrollView>
    </>
}
//--------------------Flow Page End----------------------------


//--------------------Cald Page Start----------------------------
function dataMerge(msgData)//日期处理 稍后写
{
    let findata;
    //console.log(msgData);
    return msgData;
}
function CaldCard(props)
{
    //data Format: time,count grid pill_name
    return <View style={[styles.container,styles.vertical]}>
        <Text style={styles.h3}>日期</Text>
        <View style={[styles.horizontal,styles.list_row]}>
            <Text style={styles.p}>7:30 </Text>
            <Text style={[styles.p,styles.endplace]}>{props.name} 盒子 {props.grid}</Text>
        </View>
        <View style={[styles.horizontal,styles.list_row]}>
            <Text style={styles.p}>7:30 </Text>
            <Text style={[styles.p,styles.endplace]}>麦当劳 盒子 2</Text>
        </View>
    </View>
}
export  function CaldPage()
{
    const [data,setData]=useState([]);
    function getFlow()
    {
        //fetch("",{});
        getMsg().then((flowGet)=>{
            const msgData=flowGet.map((res)=>({
            id:res.id,
            time:res.time,
            count:res.count,
            grid:res.grid,
            name:(grid_contain[res.grid]?pill_list[grid_contain[res.grid]].pill_name:"")
            }))
            setData(()=>dataMerge(msgData));
        })    
    }
    useEffect(getFlow,[]);useEffect(getFlow,[grid_contain,pill_list]);
    //console.log(data);
    return <View style={styles.vertical}>
        <View style={styles.horizontal}>
            <Text style={styles.p}>日程</Text>
            <Button title="+"></Button>
        </View>
        <View style={styles.vertical}>
        {
            data.map(datap=><CaldCard {...datap} key={datap.id}/>)
        }
        </View>
        <></>
    </View>
}
export default function DatePage()
{
    const [simp,setSimp]=useContext(SimpData);
    //console.log("At Flow Page "+simp);
    //setSimp(true)
    if(simp) return <FlowPage></FlowPage>
    else return(<DrawerNavi.Navigator>
        <DrawerNavi.Screen name="卡片视图" component={FlowPage}/>
        <DrawerNavi.Screen name="日历视图" component={CaldPage}/>
    </DrawerNavi.Navigator>)
    //如果 not simplify 就返回一个Drawer Navigator
}