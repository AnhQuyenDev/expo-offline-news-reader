import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let fallbackTimeout: ReturnType<typeof setTimeout>;

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      setIsChecking(false);
    });

    // Kiểm tra ban đầu
    NetInfo.fetch()
      .then(state => {
        setIsOnline(state.isConnected ?? false);
        setIsChecking(false);
      })
      .catch(() => {
        setIsOnline(false);
        setIsChecking(false);
      });

    // Fallback: Sau 3s mà chưa xác định được mạng thì coi như offline
    fallbackTimeout = setTimeout(() => {
      setIsChecking(false);
      setIsOnline(false);
    }, 3000);

    return () => {
      clearTimeout(fallbackTimeout);
      unsubscribe();
    };
  }, []);

  return { isOnline, isChecking };
}
