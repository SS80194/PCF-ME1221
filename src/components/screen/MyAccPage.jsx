import {Text,Pressable,StyleSheet,Switch,Image,View,ScrollView} from "react-native"
import {SimpData} from "../Contexts.js"
import {useContext,useState} from "react"
import styles from "../StyleSheet.js"

function BadgerCard()
{
    const default_header_link="https://img.xj163.com/uploadimg/image/20200911/20200911150652_82270.jpg";
    return <View style={[styles.container,styles.card]}>
    <Image source={{uri:default_header_link}} style={styles.img}></Image>
    </View>
}

function BindPage()
{

} 

export default function MyAccPage()
{
    const[simp,setSimp]=useContext(SimpData);
    const[simpT,setSimpT]=useState(simp);
    function toggleSwitch()
    {
        console.log(!simpT);
        setSimp(!simpT);
        setSimpT(simpT=>!simpT);
    }
    return <View style={styles.container}>
        <ScrollView>
        <BadgerCard ></BadgerCard>
        <Text style={styles.p}> 老人模式开关 </Text>
        <Switch value={simpT} onValueChange={toggleSwitch}></Switch>
        <Text>This is Account Page</Text>
    </ScrollView></View>
}