import RegisterScreen from '@/src/features/auth/components/RegisterScreen';
import { StatusBar } from 'expo-status-bar';

export default function RegisterRoute() {  
  return (
    <>
      <StatusBar style="light" />
      <RegisterScreen />
    </>
  );
}
