import {Text,StyleSheet,Dimensions,ScrollView,View} from "react-native"
import {useState,useEffect,useContext} from "react"
import styles from "../StyleSheet.js"


const window_width=Dimensions.get('window').width;
const window_height=Dimensions.get('window').height;

const ava_limit=30*3600*1000;
//

function bef(time_t)
{
    //console.log(Date.now())
    return (time_t<Date.now());
}
function bef_del(time_t,time_d)
{
    //time_t
    return (time_t<Date.now+time_d);
}

function FlowCard(props)
{
    //console.log(props.time)
    //console.log(new Date(props.time).toLocaleString());
    let date_string=new Date(props.time).toLocaleString();
    return <View style={[styles.container,bef(props.time)?styles.outdated:styles.coming]}>
        <Text style={styles.h2}>{props.name}</Text>
        <Text style={styles.p}>计划服用时间：{date_string}</Text>
        {()=>{if(bef_del(props.time,-ava_limit)) return <Text style={styles.p}>已过期！</Text>}}
    </View>
}
export function FlowPage()
{
    const [data,setData]=useState([]);
    function getFlow()
    {
        //fetch("",{});
        setData([{"time":1615637120000,"name":"一种药","description":"cow horse",id:118},{"time":1815637120000,"name":"二种药","description":"cow house",id:119}]);
    }
    useEffect(getFlow,[]);
    return <>
        <ScrollView>
            {data.map(datap=><FlowCard {...datap} id={datap.id}/>)}
        </ScrollView>
    </>
}

export default function DatePage()
{
    /*
    const DPNavigator=createDrawerNavigator();
    const [simp,setSimp]=useContext(SimpData);
    console.log(simp);
    if(simp) return <FlowPage></FlowPage>
    else return  <Text>Remosk</Text>
    */
    
}