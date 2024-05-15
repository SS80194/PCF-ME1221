import {Text,Pressable,StyleSheet,Switch,Image,View,ScrollView,Button} from "react-native"
import {SimpData} from "../Contexts.js"
import {useContext,useState,useEffect} from "react"
import styles from "../StyleSheet.js"
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import {initBLE} from "../Ble.js"

//头像栏
function BadgerCard()
{
    const default_header_link="https://img.xj163.com/uploadimg/image/20200911/20200911150652_82270.jpg";
    return <View style={[styles.container,styles.card]}>
    <Image source={{uri:default_header_link}} style={styles.img}></Image>
    </View>
}

//蓝牙配对页面
function MyDevice()
{
    const default_device_link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4aT_X0-f-P8reIpBpkvrf45-q81RfD4mVb1E6MI-dA&s";
    
    return <View style={[styles.container,styles.card]}>
    <Text style={styles.p}>我的设备</Text>
    <Image source={{uri:default_device_link}} style={styles.img}></Image>
    
    </View>
}
function BindPage()
{
    const[isPairing,setPairing]=useState(false);//是否在配对
    function startSearch()//开始设置蓝牙
    {
        console.log(isPairing);
        if(isPairing===false) return ;
        //console.log("A");
        initBLE();
        ///console.log("B");
    }
    useEffect(startSearch,[isPairing]);
    //BindPage start from here
    return <View style={[styles.vertical,styles.middle]}>
    <MyDevice/>
    <View style={[styles.horizontal,styles.middle]}>
        <Text style={styles.p}>配对</Text>
        <Switch value={isPairing} onValueChange={()=>{console.log(!isPairing);setPairing(!isPairing)}}/>
    </View>
    {
    isPairing?(
    <View style={[styles.vertical]}>
    <ScrollView>
        <Text style={styles.p}>设备们</Text>
    </ScrollView>
    </View>)
    :<></>
    }
    </View>
} 

function BasicSettings()
{
    //console.log("renoot");
    const[simp,setSimp]=useContext(SimpData);
    const[simpT,setSimpT]=useState(simp);
    function toggleSwitch()
    {
        console.log(!simpT);
        setSimp(!simpT);
        setSimpT(simpT=>!simpT);
    }
    const navigation=useNavigation();
    return <View style={[styles.container,styles.vertical,styles.middle]}>
        <ScrollView>
        <BadgerCard ></BadgerCard>
        <Text style={styles.p}> 老人模式开关 </Text>
        <Switch value={simpT} onValueChange={toggleSwitch}></Switch>
        <Text>This is Account Page</Text>
        <Button title="绑定设备" onPress={()=>{navigation.push("BindPage")}}/>
    </ScrollView></View>
}
const AccStack=createStackNavigator();
export default function MyAccPage()
{
    return <AccStack.Navigator>
        <AccStack.Screen name="BasicSettings" component={BasicSettings} options={{title:"个人信息"}}/>
        <AccStack.Screen name="BindPage" component={BindPage}/>
    </AccStack.Navigator>
}