import {Text,Pressable,StyleSheet,Image,View,ScrollView} from "react-native"

function BadgerCard()
{
    const default_header_link="https://img.xj163.com/uploadimg/image/20200911/20200911150652_82270.jpg";
    return <View style={[styles.container,styles.card]}>
    <Image source={{uri:default_header_link}} style={styles.img}></Image>
    </View>
}

function BindPage()
{

} 

export default function MyAccPage()
{
    return <View>
    <ScrollView>
    <BadgerCard ></BadgerCard>
    <Text>This is Account Page</Text>
    </ScrollView></View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card:{
        backgroundColor:'white',
        borderRadius:12,
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
    },
    img:{
        width:200,
        height:200
    }
});
