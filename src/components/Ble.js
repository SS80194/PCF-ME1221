import { BleManager } from 'react-native-ble-plx';

const manager=new BleManager();

export function initBLE()
{
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
        console.error('扫描出错:', error);
        return;
    }

    console.log('找到设备:', device.name, device.id);

    // 连接设备
    manager.connectToDevice(device.id)
        .then((device) => {
            console.log('已连接到设备:', device.name);
            // 执行进一步的操作，如读取、写入、订阅特征等。
        })
        .catch((error) => {
            console.error('连接出错:', error);
        });
  });
}