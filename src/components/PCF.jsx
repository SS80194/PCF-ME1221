import {useState,useEffect} from "react"
import {Text,StyleSheet,Container} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import EditPage from './screen/EditPage'
import DatePage,{FlowPage} from './screen/FlowPage'
import MyAccPage from './screen/MyAccPage'
import LoginPage from "./screen/LoginPage"
import {initArrays} from "./KVS.js"

const MPNavigator=createBottomTabNavigator();
export default function PCF(props)
{
    const [isLoggedin,setLoggedin]=useState(true);
    //Before release set it to false
    const [isRegistering,setRegistering]=useState(false);
    //useEffect(initArrays,[]);
    function handleLogin(username,passwd)
    {
        //fetch(,{})
        //Waiting to handle fetch/login
        setLoggedin(true)
    }
    function handleRegistering()
    {
        //Waiting to handle Register
    }

    //return Part
    if(isLoggedin) return <>
        <NavigationContainer>
            <MPNavigator.Navigator>
                <MPNavigator.Screen name="Edit" options={{title:"编辑药盒"}}>
                    {(props)=><EditPage {...props} />}
                </MPNavigator.Screen>
                <MPNavigator.Screen name="Flow" options={{title:"服药计划"}} component={DatePage}>
                </MPNavigator.Screen>
                <MPNavigator.Screen name="MyAcc" options={{title:"设置",headerShown:false}}>
                    {(props)=><MyAccPage {...props} />}
                </MPNavigator.Screen>
            </MPNavigator.Navigator>
        </NavigationContainer>
    </>
    else return <>
        <Text>Not Logged in</Text>
        <LoginPage handleLogin={handleLogin} handleRegistering={handleRegistering}></LoginPage>
    </>
}
