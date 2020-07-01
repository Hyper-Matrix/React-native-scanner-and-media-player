import React,{useState} from 'react';
import { StyleSheet, Text, View,Alert,ScrollView,Dimensions} from 'react-native';
import { Modal,Button,Portal,Provider } from 'react-native-paper';
import { createStackNavigator, createAppContainer} from "react-navigation";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import {Video} from 'expo-av';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
 function App(props) {
  return (
    <View style={styles.container}>
      <Button  mode="contained" 
    onPress={()=>props.navigation.navigate('Scanner') }
color="#00BCD4"
labelStyle={{color:"white",letterSpacing:3}}
 style ={{margin:5, height:50,padding:8,width:360,borderRadius:30,opacity:0.7,borderColor
 :"black",borderWidth:3,padding:5,marginTop:22} }>
    SCANNER
  </Button>
  <Button  mode="contained" 
     onPress={()=>props.navigation.navigate('playvideo') }
color="#00BCD4"
labelStyle={{color:"white",letterSpacing:3}}
 style ={{margin:5, height:50,padding:8,width:360,borderRadius:30,opacity:0.7,borderColor
 :"black",borderWidth:3,padding:5,marginTop:22} }>
    PLAY VIDEO/AUDIO
  </Button>
      
    </View>
  );
}
function Scanner(props)
{const[hasCameraPermission,sethasCameraPermission ]=useState(null)
  const[isScanned,setisScanned ]=useState(false)
  
  
  async function componentDidMount(){
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    if( status === "granted"){
      
      sethasCameraPermission(true)
    }
  else{
    sethasCameraPermission(false)
  }
    
    console.log(hasCameraPermission)
  }
  componentDidMount()
  handleBarCodeScanned = ({ type, data }) => {
    // Do something here
    props.navigation.navigate('LoadingPage', {
      data: data 
    });
}
//const { hasCameraPermission, isScanned } = useState;

if(hasCameraPermission === null){
  console.log("Requesting permission");
  return (
    <Text style={{color:'white',fontSize:30,marginTop:10,alignSelf:'center',fontWeight:'bold',textShadowColor:'black',textShadowOffset: {width: -1, height: 1},
textShadowRadius: 15,letterSpacing:2}}>REQUESTING PERMISSION</Text>
 
  );
}
if(hasCameraPermission === false){
  
  return ( 
    
     Alert.alert("Please grant Camera permission")
    
  )
}
if(hasCameraPermission === true && !isScanned && props.navigation.isFocused() ){
  return <View style = {{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  
  }}>
   <ScrollView>
    <Text style={{color:'white',fontSize:30,marginTop:10,alignSelf:'center',fontWeight:'bold',textShadowColor:'black',textShadowOffset: {width: -1, height: 1},
textShadowRadius: 15,letterSpacing:2}}>Scan code inside window</Text>
<View style={{borderColor:'white',
       borderRadius:10,
       borderWidth:5,
       backgroundColor:'rgba(0,0,0,0.6)',
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',}
       }>
    <BarCodeScanner
      onBarCodeScanned = { isScanned ? undefined : handleBarCodeScanned }
      style = {{
        height:  600,
        width: 350
      }}
    >
    </BarCodeScanner>
    </View>
    </ScrollView>
  </View>
 
  
}
else{
  return (
    <Text>LOADING</Text>
  );
}
}


class playvideo  extends React.Component {
  state = {
    mute: false,
    fullScreen: false,
    shouldPlay: true,
  }
  handlePlayAndPause = () => {
		this.setState(prevState => ({
			shouldPlay: !prevState.shouldPlay
		}));
	}

	handleVolume = () => {
		this.setState(prevState => ({
			mute: !prevState.mute,
		}));
	}
  render(){
    const { width } = Dimensions.get('screen');
    
    return(
      <View style={styles.container}>
      <View>
          
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            shouldPlay={this.state.shouldPlay}
            resizeMode="contain"
            style={{ width, height: 300 }}
            isMuted={this.state.mute}
          />
          <View style={styles.controlBar}>
            <MaterialIcons 
              name={this.state.mute ? "volume-mute" : "volume-up"}
              size={45} 
              color="white" 
              onPress={this.handleVolume} 
            />
            <MaterialIcons 
              name={this.state.shouldPlay ? "pause" : "play-arrow"} 
              size={45} 
              color="white" 
              onPress={this.handlePlayAndPause} 
            />
          </View>
        </View>
    </View>
    )
  }
}
function Decode(props){
  return(
    <View style={styles.container}>
   <Text>{props.navigation.getParam("data", "NO-QR")}</Text>
  </View>
  )
}
class LoadingPage extends React.Component {
  componentDidMount(){const data =this.props.navigation.getParam("data", "NO-QR")
       // Start counting when the page is loaded
       this.timeoutHandle = setTimeout(()=>{
           this.props.navigation.navigate('Decode',{
             data
           })
       }, 5000);
       
  }

  componentWillUnmount(){
       clearTimeout(this.timeoutHandle); 
  }

  render() {
    
    console.log(this.props.navigation.getParam("data", "NO-QR"))
  return ( <Provider>
    <Portal>
    <Modal visible='true' style={{height:20,width:20}}>
      <View style={{height:100,width:100,alignSelf:'center',justifyContent:'center',backgroundColor:'white',alignContent:'center'}}>
    <Text>Example</Text>
    </View>
  </Modal>
  </Portal>
  </Provider>
  );
}


}
const Appnav = createStackNavigator(
  {
    App:App,
    Scanner:Scanner,
    playvideo:playvideo,
    Decode:Decode,
    LoadingPage:LoadingPage
  },{
    headerMode:'screen',
    initialRouteName:'App',
    title:"Home",
    
  },
  
)
export default createAppContainer(Appnav);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    flex:1,
    resizeMode: "cover",
    
    
  },
  cardimage:{
 
    resizeMode:'cover',
  },
  Textinput1:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    width:350,
    marginTop:20,
    color:"white", 
  },
  textInput: {
  height: 40,
  borderColor: 'black', 
  borderWidth: 1,
  margin: 20
},
controlBar: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 45,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  
}
});
