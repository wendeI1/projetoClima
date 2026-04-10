import { Platform } from 'react-native';

// Se estiver usando Emulador Android, o localhost é 10.0.2.2
// Se estiver usando iOS Simulator ou Web, é localhost.
// Se testar via Expo Go no celular físico, coloque o IP do seu computador na rede (ex: 'http://192.168.1.5:8000')

const LOCAL_IP = '192.168.15.5'; // ALtere aqui para o seu IP IPv4 local se usar no Expo Go!

export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';

// Se for testar no Expo Go via LAN (celular na mesma wifi), descomente a linha abaixo:
// export const API_URL = `http://${LOCAL_IP}:8000`;
