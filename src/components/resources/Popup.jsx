import {View,Modal,StyleSheet,Button,Text} from "react-native" 
import {useState} from "react"
import styles from "../StyleSheet.js"

/*
Popup You need to fill:
- ActualComp(A component to be inside the modal)
- visible(a var to define whether open) 
- closeModal (function to close )
*/

export default function Popup(props)
{
    return <Modal transparent={true} visible={props.visible} onRequestClose={props.closeModal}>
        <View style={[styles.vertical,styles.flexable,styles.bot,styles.middle_c]}>
            <View style={[styles_pu.modalView]}>
                {
                    props.ActualComp()
                }
                <Button title="Close" onPress={props.closeModal}></Button>
            </View>
        </View>
    </Modal>
}

/*Component Confirm:
Intro: Locate at the middle of the screen
//Bug: How to start it?
You need to Provide:
- mdv: A state Variable to decide whether shown
- callFunc: A function to be called when you choose Yes
- closeModal: A function to be called when you choose to close
- infotext: the text to be alert
*/
export function ConfirmPopup(props)
{
    //const [mdv,setMdv] = useState(false);
    //console.log(props.infotext);
    return <Modal transparent={true} visible={props.mdv}>
      <View style={[styles.vertical,styles.middle,styles.middle_c,styles.flexable,styles_pu.modalbg]}>
        <View style={[styles_pu.littlePopup,styles.middle_c]}>
          <Text style={styles.h1}>提醒</Text>
          <Text style={styles.p}>{props.infotext}</Text>
          <Text style={styles.p}></Text>
          <View style={[styles.horizontal,styles.middle]}>
            <Button title="确认" color="green" onPress={props.callFunc}/>
            <Button title="取消" color="grey" onPress={props.closeModal}/>
          </View>
        </View>
      </View>
    </Modal>
}

const styles_pu=StyleSheet.create({
    modalself:{
        backgroundcolor:"yellow",
        width:"80%",
        height:"80%"
    },
    modalbg:{
        
    },
    modalView:{
        width:"100%",
        height:"80%",
        //margin: 20,
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
    },
    littlePopup:{
        width:"70%",
        height:"30%",
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
})