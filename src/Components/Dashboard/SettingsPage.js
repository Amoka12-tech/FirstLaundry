import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAppInfo } from '../../actions/info';
import { getItems } from '../../actions/order';

export default function SettingsPage() {
  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    getAppInfo().then(info => setAppInfo(info));
  }, []);

  return (
    <View>
      <Text></Text>
     </View>
  );
}
