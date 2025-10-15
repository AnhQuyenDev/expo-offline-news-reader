import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      setIsChecking(false);
    });

    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected ?? false);
      setIsChecking(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { isOnline, isChecking };
}
