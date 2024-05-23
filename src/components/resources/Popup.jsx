import {View,Modal,StyleSheet,Button} from "react-native" 
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
    return <Modal style={styles_pu.modalself} transparent={true} visible={props.visible} onRequestClose={props.closeModal}>
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

const styles_pu=StyleSheet.create({
    modalself:{
        backgroundcolor:"yellow",
        width:"80%",
        height:"80%"
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
    }
})