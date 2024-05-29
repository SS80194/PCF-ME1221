import { useEffect, useState } from "react"
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { getGridContain, getPillList, pill_list , grid_contain } from "../KVS.js"
import styles from "../StyleSheet.js"


//---------------------------------PostPanel---------------------------------

function submitChange(box_id,new_pid)//new_pid means new_pill_id
{
    console.log(slc);
    //需要一个适用于android的弹窗逻辑
    //let ret=confirm("确定要把该药盒的药物修改为"+slc.label+"吗？")
    let gridc_stage=grid_contain;
    gridc_stage[box_id]=new_pid;
    setGc(gridc_stage)
    //待补充：关于服药计划将要作废的逻辑，以及post到页面上。
    props.close();
}
//Its a Componenent (Actual,a modal) to Post Changes of Pill Grids
function PostPanel(props)
{
    let box_id=props.box_id;
    const[newid,setNewid]=useState(grid_contain[box_id]?pill_list[grid_contain[box_id]].pill_name:"空药盒");
    const[slc,setSlc]=useState(0);
    const[options,setOpt]=useState(makeOptions());
    const [cof,setCof] =useState(false);
    //console.log(options_stage);
    function closeCof(){setCof(false);}
    function callFunc()
    {

    }
    //---------------Set available pill options&
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
        let gridc_stage=grid_contain;
        gridc_stage[box_id]=slc;
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
    return <View >
        <Text style={styles.h2}>药盒{box_id}</Text>
        <Text style={styles.h3}>当前药物：{grid_contain[box_id]?pill_list[grid_contain[box_id]].pill_name:"空"}</Text>
        <SelectList data={options} save="key" setSelected={handleSelection}></SelectList>
        <View style={styles_ch.button_row}>
            <Button title="Submit" onPress={submit} ></Button>
            <Text style={styles.p}> </Text>
            <Button title="close" onPress={props.close}></Button>
        </View>
        {
            //<Confirm callFunc={}/>
        }
        
    </View>
}


//-------------------------------Edit Page-------------------------------
function GridCard(props)
{
    //if(props.box_id<=1) return <></>
    return <Pressable onPress={()=>props.handlePress(props.box_id)}>
    <View style={[styles.card,styles_eb.cotc]}>
        {
            props.pill_id?
            <Text style={styles.h1}>{pill_list[props.pill_id].pill_name}</Text>
            :<Text style={styles.h1}>空药盒</Text>
        }

        <View style={styles.container}>
            <Text styles={styles.p}>点击进行编辑</Text>
        </View>

    </View>
    </Pressable>
}
export default function EditPage()
{
    const[gridc,setGc]=useState([]);
    const[mdv,setMdv]=useState(false);
    const[mdt,setMdt]=useState(0);
    useEffect(()=>setGc(grid_contain),[grid_contain]);
    //gridc stands for grid_contain
    
    //closeModal: The function to close the EditModal
    function closeModal(){setMdv(false);}

    //handlePress:The function to open the specified EditModal
    function handlePress(props){setMdv(true);setMdt(props);}

    //单个的药盒大小
    
    //console.log(Object.entries(gridc));
    return <View style={[styles.container,styles.flexable,styles.vertical]}>
        <ScrollView>
            <View >
            {
                Object.entries(gridc).map((grid)=>
                <GridCard 
                    key={grid[0]}
                    box_id={grid[0]}
                    pill_id={grid[1]}
                    handlePress={handlePress}
                />)
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