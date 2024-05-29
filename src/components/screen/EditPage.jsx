import { useEffect, useState } from "react"
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { getGridContain, getPillList, pill_list , grid_contain,setGridContain,default_gc } from "../KVS.js"
import styles from "../StyleSheet.js"
import { ConfirmPopup } from "../resources/Popup.jsx"


//---------------------------------PostPanel---------------------------------

//submitChange 适用于确定要提交的情况
function submitChange(box_id,new_pid)//new_pid means new_pill_id
{
    let gridc_stage=grid_contain;
    gridc_stage[box_id]=new_pid;
    setGridContain(gridc_stage)
}
//Its a Componenent (Actual,a modal) to Post Changes of Pill Grids
function PostPanel(props)
{
    let box_id=props.box_id;
    const[newid,setNewid]=useState(grid_contain[box_id]?pill_list[grid_contain[box_id]].pill_name:"空药盒");
    const[slc,setSlc]=useState(0);
    const[options,setOpt]=useState(makeOptions());
    function makeOptions(){
        let options_t=Object.keys(pill_list).length?Object.values(pill_list).map((obj)=>({key:obj.pill_id,value:obj.pill_name})):[];
        options_t.push({key:0,value:"清空"});
        return options_t;
    }
    useEffect(()=>setOpt(makeOptions()),[pill_list]);


    //-----------------------------Confirm Panel Start----------------------------
    const [cof,setCof] =useState(false);//cof控制确认界面的显示与否
    let warn_msg="";
    //console.log(options_stage);
    function closeCof(){setCof(false);}
    function callFunc()
    {
        submitChange(box_id,slc);
        setCof(false);
        props.close();
    }
    //-----------------------------Confirm Panel End----------------------------


    function getMsg()
    {
        if(!slc||!pill_list) return "";
        return "确定要把该药盒的药物修改为"+pill_list[slc].pill_name+"吗？";
    }
    function submit()
    {
        warn_msg="确定要把该药盒的药物修改为"+pill_list[slc].pill_name+"吗？"
        //console.log(warn_msg);
        setCof(true);
    }
    function handleSelection(props)
    {
        //console.log(props);
        setSlc(props);
        //console.log(value);
    }
    return <View >
        <Text style={styles.h2}>药盒{box_id}</Text>
        <Text style={styles.h3}>当前药物：{grid_contain[box_id]?pill_list[grid_contain[box_id]].pill_name:"空"}</Text>
        <SelectList data={options} save="key" setSelected={handleSelection}></SelectList>
        <View style={styles_ch.button_row}>
            <Button title="Submit" onPress={submit} ></Button>
            <Text style={styles.p}> </Text>
            <Button title="close" onPress={props.close}></Button>
        </View>
        <View style={[styles.vertical,styles.flexable,styles.bot]}>
            <ConfirmPopup callFunc={callFunc} closeModal={closeCof} infotext={getMsg()} mdv={cof}/>
        </View>
        
    </View>
    
   //return <Text>Renot</Text>
}


//-------------------------------Edit Page-------------------------------
function GridCard(props)
{
    //if(props.box_id<=1) return <></>
    
    return <Pressable onPress={()=>props.handlePress(props.box_id)}>
    <View style={[styles.card,styles_eb.cotc]}>
        {
            pill_list?(
            (props.pill_id)?
            <Text style={styles.h1}>{pill_list[props.pill_id].pill_name}</Text>
            :<Text style={styles.h1}>空药盒</Text>)
            :<Text style={styles.p}>pill_list unready</Text>
        }

        <View style={styles.container}>
            <Text styles={styles.p}>点击进行编辑</Text>
        </View>

    </View>
    </Pressable>
    
   //return <Text style={styles.p}>Reaje {props.box_id} {props.pill_id}</Text>
}
export default function EditPage()
{
    
    const[gridc,setGc]=useState(default_gc);
    const[mdv,setMdv]=useState(false);
    const[mdt,setMdt]=useState(0);
    
    function updateGridC()
    {
        getGridContain().then((res)=>{
            setGc(res);
        })
    }
    useEffect(updateGridC,[]);
    useEffect(updateGridC,[grid_contain]);
    
    //closeModal: The function to close the EditModal
    function closeModal(){setMdv(false);}

    //handlePress:The function to open the specified EditModal
    function handlePress(props){console.log("renoot");setMdv(true);setMdt(props);}
    
    console.log(gridc);
    //if(gridc) console.log(Object.entries(gridc));
    return <View style={[styles.container,styles.flexable,styles.vertical]}>
        <ScrollView>
            <View >
            {
                gridc?
                Object.entries(gridc).map((grid)=>
                <GridCard 
                    key={grid[0]}
                    box_id={grid[0]}
                    pill_id={grid[1]}
                    handlePress={handlePress}
                />)
                :
                <Text style={styles.p}>Renoot</Text>
            }
            </View>
        </ScrollView>
        <Modal style={styles_eb.modalself} transparent={true} visible={mdv} onRequestClose={closeModal}>
            <View style={{alignItems:"center",justifyContent:"center"}}>
                <View style={[styles_eb.modalView]}>
                        <PostPanel close={closeModal} box_id={mdt}></PostPanel>
                </View>
            </View>
        </Modal>
        
    </View>
}


//-------------------------------StyleSheets-------------------------------
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
        minHeight:100,
    },
    pic:{
        width:"80%",
        height:"80%"
    },
    centeredView:{
        justifyContent:"center",
        alignItems:"center",
        minHeight:100,
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