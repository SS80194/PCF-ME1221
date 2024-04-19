import {View,Text,StyleSheet,Pressable} from "react-native"
import {useState,useEffect} from "react"
import {getPillList,getGridContain} from "../KVS.js"
import {SimpData} from "../Contexts.js"
import styles from "../StyleSheet.js"


export default function EditPage()
{
    const[gridc,setGc]=useState([]);
    const[pill_list,setPillList]=useState([]);
    //gridc stands for grid_contain
    let list_n=0;
    function InitBoxes()
    {
        getPillList().then((res)=>{
            setPillList(res);
        })
        getGridContain().then((res)=>{
            setGc(res);
        })
    }
    
    function GridCard(props)
    {
        console.log("Remosk");
        console.log(pill_list[props.pill_id]);
        return <Pressable>
        <Text style={styles.p}>Remosk</Text>
        <View style={styles.card}>
        {
            props.pill_id?
            <Text style={styles.p}>{pill_list[props.pill_id].pill_name}</Text>
            :<Text style={styles.p}>这个药盒是空的</Text>
        }
        </View>
        </Pressable>
    }
    useEffect(InitBoxes,[]);
    //console.log(Object.entries(gridc));
    return <View style={styles.container}>
        <Text style={styles.p}> 这个页面用来编辑药盒 </Text>
        <View style={styles_eb.container}>
        {
            Object.entries(gridc).map((grid)=>
                <GridCard 
                    key={grid[0]}
                    pill_id={grid[1]}
                />)
        }
        </View>
    </View>
}
const styles_eb=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        flewWrap:"wrap"
    }
});