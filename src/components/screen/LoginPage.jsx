import {useState} from "react"
import {TextInput,View,Text,Button,Pressable,StyleSheet} from "react-native"

export default function LoginPage(props)
{
    const[username,setName]=useState("");
    const[passwd,setPwd]=useState("");
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>登录</Text>
        <Text style={styles.p}>用户名</Text>
        <TextInput style={styles.username} value={username} onChangeText={(cur)=>setName(cur)}/>
        <Text style={styles.p}>密码</Text>
        <TextInput style={styles.passwd} value={passwd} onChangeText={(cur)=>setPwd(cur)} secureTextEntry={true}/>
        <Button color="crimson" style={styles.button} title="登录" onPress={()=>props.handleLogin(username,passwd)} />
        <Button color="grey" style={styles.button} title="没有账号？去注册！" onPress={() => props.setIsRegistering(true)} />
        <Button color="crimson" style={styles.button} title="FastLogin" onPress={()=>props.handleLogin("Remosk","588handles")} />
    </View>
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    p:{
        fontSize:18,
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
    }
});
