import {StyleSheet} from "react-native"

const styles=StyleSheet.create({
    container:{
        borderRadius:15,
        padding:15,
        height:400,
        margin:16
    },
    card:{
        backgroundColor:'white',
        borderRadius:12,
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
    }
})

export default styles;