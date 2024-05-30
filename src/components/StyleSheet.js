import {StyleSheet} from "react-native"

const styles=StyleSheet.create({
    container:{
        borderRadius:15,
        padding:15,
        margin:16
    },
    card:{
        backgroundColor:'white',
        borderRadius:12,
        margin:16,
        height:150,
    },
    card_dh:{//card with default height
        backgroundColor:'white',
        borderRadius:12,
        margin:16,
    },
    card_msg:{
        borderRadius:12,
        margin:16,
        height:400,
        width:280,
    },
    outdated:{
        backgroundColor:"lightpink"
    },
    coming:{
        backgroundColor:"white"
    },
    p:{
        fontSize:16
    },
    h1:{
        fontSize:40
    },
    h2:{
        fontSize:28
    },
    h3:{
        fontSize:20,
        fontWeight:"bold"
    },
    username:{
        height:40,
        width:280,
        borderWidth:1,
        borderColor:'grey'
    },
    passwd:{
        height:40,
        width:280,
        borderWidth:1,
        borderColor:'grey',
    },
    button:{
        width:240,
    },
    img:{
        width:200,
        height:200
    },
    vertical:{
        flexDirection:"column"
    },
    horizontal:{
        flexDirection:"row"
    },
    middle:{
        justifyContent:"center"
    },
    middle_c:{
        alignItems:"center"
    },
    list_row:{
        borderLeftColor:"green",
        borderLeftWidth:1
    },
    flexable:{
        flex:1
    },
    flexable_n:{
        flex:0
    },
    endplace:{
        alignSelf: "end"
    },
    bot:{
        justifyContent:"flex-end"
    },
    bot2:{
        position:"absolute",
        bottom:20
    },
    abs:{
        position:"absolute"
    },
    bdb:{
        borderWidth:1
    }
})

export default styles;