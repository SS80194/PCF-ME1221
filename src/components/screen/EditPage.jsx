import {View,Text,StyleSheet,Pressable,Image,Modal,TextInput,Button} from "react-native"
import Select from "react-select"
import {SelectList} from "react-native-dropdown-select-list"
import {useState,useEffect,useRef} from "react"
import {getPillList,getGridContain,getPhotoPlace} from "../KVS.js"
import {SimpData} from "../Contexts.js"
import styles from "../StyleSheet.js"
import MultiSelect from 'react-native-multiple-select';

export default function EditPage()
{
    const[gridc,setGc]=useState([]);
    const[pill_list,setPillList]=useState([]);  
    const[mdv,setMdv]=useState(false);
    const[mdt,setMdt]=useState(0);

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
    function closeModal()
    {
        //console.log("关闭")
        setMdv(false);
    }
    //PostPanel:A panel to submit changes!
    function PostPanel(props)
    {
        const[newid,setNewid]=useState(gridc[mdt]?pill_list[gridc[mdt]].pill_name:"空药盒");
        const[slc,setSlc]=useState(0);
        const[options,setOpt]=useState(makeOptions());
        //console.log(options_stage);
        function makeOptions(){
            let options_t=Object.keys(pill_list).length?Object.values(pill_list).map((obj)=>({key:obj.pill_id,value:obj.pill_name})):[];
            options_t.push({key:0,value:"清空"});
            return options_t;
        }
        useEffect(()=>setOpt(makeOptions()),[pill_list]);
        function submit()
        {
            console.log(slc);
            //需要一个适用于android的弹窗逻辑
            //let ret=confirm("确定要把该药盒的药物修改为"+slc.label+"吗？")
            let gridc_stage=gridc;
            gridc_stage[mdt]=slc;
            setGc(gridc_stage)
            //待补充：关于服药计划将要作废的逻辑，以及post到页面上。
            props.close();
            //alert(confirm("确定要把该药盒的药物修改为"+slc.label+"吗？"))
        }
        function handleSelection(props)
        {
            console.log(props);
            setSlc(props);
            //console.log(value);
        }
        //useEffect(handleOptions,[newid]);
        //useEffect(()=>{console.log(options)},[options]);
        return <View >
            <Text style={styles.h2}>药盒{mdt}</Text>
            <Text style={styles.h3}>当前药物：{gridc[mdt]?pill_list[gridc[mdt]].pill_name:"空"}</Text>
            <SelectList data={options} save="key" setSelected={handleSelection}></SelectList>
            <View style={styles_ch.button_row}>
                <Button title="Submit" onPress={submit} ></Button>
                <Text style={styles.p}> </Text>
                <Button title="close" onPress={props.close}></Button>
            </View>
        </View>
    }
    function handlePress(props)
    {
        //console.log("love from box"+props);
        setMdv(true);
        setMdt(props);
        //任务是召唤出一个什么东西来！
    }
    //单个的药盒大小
    function GridCard(props)
    {
        //console.log("Remosk");
        //console.log(props);
        //console.log(pill_list[props.pill_id]);
        return <Pressable onPress={()=>handlePress(props.box_id)}>
        <View style={[styles.card,styles_eb.cotc]}>
        {
            props.pill_id?
            <Text style={styles.h1}>{pill_list[props.pill_id].pill_name}</Text>
            :<Text style={styles.h1}>空药盒</Text>
        }
        {
            //图片功能有点问题！
            //<Image styles={styles_eb.pic} source={()=>{getPhotoPlace(props.pill_id)}}></Image>
        }
        
        <View style={styles.container}>
            <Text styles={styles.p}>点击进行编辑</Text>
        </View>

        </View>
        </Pressable>
    }
    useEffect(InitBoxes,[]);
    //console.log(Object.entries(gridc));
    return <View style={styles.container}>
        <View style={styles_eb.container}>
        {
            Object.entries(gridc).map((grid)=>
                <GridCard 
                    key={grid[0]}
                    box_id={grid[0]}
                    pill_id={grid[1]}
                />)
        }
        </View>
        <Modal style={styles_eb.modalself} transparent={true} visible={mdv} onRequestClose={closeModal}>
            
        <View style={{alignItems:"center",justifyContent:"center"}}><View style={[styles_eb.modalView]}>
                <PostPanel close={closeModal}></PostPanel>
            </View></View>
        </Modal>
        
    </View>
}
const styles_eb=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center"
    },
    cotc:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        minHeight:200,
    },
    pic:{
        width:"80%",
        height:"80%"
    },
    centeredView:{
        justifyContent:"center",
        alignItems:"center",
        minHeight:200,
        //position:"absolute"
    },
    modalself:{
        backgroundcolor:"yellow",
        width:"80%",
        height:"80%"
    },
    modalView:{
        
        width:300,
        height:300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});
const styles_ch=StyleSheet.create({
    button_row:{
        flex:1,
        flexDirection:"row",
    }
})