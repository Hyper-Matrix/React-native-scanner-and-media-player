import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View,Alert,ScrollView,Dimensions,Image} from 'react-native';
import { Modal,Button,Portal,Provider } from 'react-native-paper';
import { createStackNavigator, createAppContainer,StackActions,NavigationActions} from "react-navigation";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { Ionicons } from '@expo/vector-icons';


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
    VIDEO/AUDIO/IMAGE
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
  const handleBarCodeScanned = ({ type, data }) => {
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
  marginTop:100
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
        height:  470,
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


class playvideo extends React.Component {

  constructor() {
    super();
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape'
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });

  }
  static navigationOptions = {
    headerMode:'none'
  };



  render(){
   var url = 'https://qmecontent.s3.amazonaws.com/856f5906-d9d1-4c2f-9942-3d0b3800a93d-1590310437118.mp4';
var m = url.split(".")
var k;
for(var i = 0;i<m.length;i++){
  if(m[i] == 'jpeg' || m[i] == 'jpg' || m[i]=='png'){
     k = m[i]
  }
}

if(k == 'jpeg' || k == 'jpg' || k=='png'){
return(
<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'black',}}>
<Ionicons name="md-close" size={32} color="white" 
      style={{alignSelf:'flex-end',marginTop:50,marginRight:20}}
      onPress={()=> this.props
      .navigation
      .dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'App',
          
        }),
      ],
      }))}/>
  <Image source={{uri:url}} style={{alignSelf:'center',justifyContent:'center',marginTop:29,
  borderRadius:20,borderColor:'black',borderWidth:4,height:Dimensions.get('screen').height*0.9,width:Dimensions.get('screen').width}}/>
</View>
);
}
else{
  
  if (this.state.orientation === 'portrait') {
    return (
      <View style={{backgroundColor:'black',flex:1}}>
      <Ionicons name="md-close" size={60} color="white" 
      style={{alignSelf:'flex-end',marginTop:30,marginRight:30}}
      onPress={()=> this.props
      .navigation
      .dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'App',
          
        }),
      ],
      }))}/>
      <VideoPlayer
      videoProps={{
       shouldPlay:true,
        resizeMode: Video.RESIZE_MODE_CONTAIN,
        source: {
        uri: url,
      },
   
  }}
  inFullscreen={false}
  showControlsOnLoad={true}
  showFullscreenButton={false}
  width={Dimensions.get('screen').width}
  height={500}
  isPortrait={true}
 // switchToLandscape={()=> Orientation.lockToLandscape()}
  //switchToPortrait={()=> Orientation.lockToPotrait()}
  videoBackground='transparent'
/>
</View>
     );
  }
  else {
    return (
      <View style={{backgroundColor:'black',flex:1}}>
      <Ionicons name="md-close" size={60} color="white" 
      style={{alignSelf:'flex-end',marginTop:30,marginRight:50}}
onPress={()=> this.props
    .navigation
    .dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'App',
          
        }),
      ],
    }))}/>
      <VideoPlayer
  videoProps={{
    shouldPlay:true,
    resizeMode: Video.RESIZE_MODE_CONTAIN,
    source: {
      uri: url,
    },
   
  }}
  inFullscreen={true}
  showControlsOnLoad={true}
  showFullscreenButton={false}
  width={Dimensions.get('screen').width}
  height={300}
  isPortrait={false}
 // switchToLandscape={()=> Orientation.lockToLandscape()}
  //switchToPortrait={()=> Orientation.lockToPotrait()}
  videoBackground='transparent'
/>
</View>
    );
  }
}
   
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
    headerMode:'none',
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
  
},
toolbar: {
  marginTop: 30,
  backgroundColor: "white",
  padding: 10,
  borderRadius: 5
},
mediaPlayer: {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "black"
}
});
