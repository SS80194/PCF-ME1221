import {View,Text,StyleSheet,Pressable,Image,Modal,TextInput,Button} from "react-native"
import Select from "react-select"
import {useState,useEffect,useRef} from "react"
import {getPillList,getGridContain,getPhotoPlace} from "../KVS.js"
import {SimpData} from "../Contexts.js"
import styles from "../StyleSheet.js"


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
    function PostPanel(props)
    {
        const[newid,setNewid]=useState(gridc[mdt]?pill_list[gridc[mdt]].pill_name:"空药盒");
        const[slc,setSlc]=useState(0);
        const selectBox=useRef();
        let options_stage=pill_list.length?Object.values(pill_list).map((obj)=>({value:obj.pill_id,label:obj.pill_name})):[];
        options_stage.push({value:0,label:"清空"});
        const[options,setOpt]=useState(options_stage);
        function handleOptions()
        {
            //console.log(Object.values(pill_list));
            let options_stage2=Object.values(pill_list).filter((obj)=>{return (!newid)||obj.pill_name.includes(newid)}).map((obj)=>({
                value:obj.pill_id,label:obj.pill_name
            }));
            options_stage2.push({value:0,label:"清空"});
            setOpt(options_stage2);
        }
        function submit()
        {
            console.log(selectBox);
        }
        function handleSelection(props)
        {
            console.log(props);
            setSlc(props);
            //console.log(value);
        }
        useEffect(handleOptions,[newid]);
        //useEffect(()=>{console.log(options)},[options]);
        return <View style={styles.tanchuang}>
            <Text style={styles.h2}>药盒{mdt}</Text>
            <Text style={styles.h3}>当前药物：{gridc[mdt]?pill_list[gridc[mdt]].pill_name:"空"}</Text>
            <TextInput value={newid} onChangeText={(text)=>setNewid(text)}></TextInput>
            <Select ref={selectBox} search={false} options={options} value={slc} onChange={handleSelection}></Select>
            <Button title="Submit" onPress={submit} ></Button>
            <Button title="close" onPress={props.close}></Button>
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
        }
        <Image styles={styles_eb.pic} source={()=>{getPhotoPlace(props.pill_id)}}></Image>
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
        width:400,
        height:400
    },
    modalView:{
        
        width:400,
        height:400,
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