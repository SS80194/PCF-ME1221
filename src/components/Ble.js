import {BleManager} from 'react-native-ble-manager';

export function initBLE()
{
  console.log("on running initBLE")
  console.log("C");
  BleManager.start({ showAlert: true }).then(() => {
    // Success code
    console.log("Module initialized");
    }).catch((error)=>{console.log(error)})
    
}