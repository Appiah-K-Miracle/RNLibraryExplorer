export interface Category {
  id: string
  name: string
  slug: string
}

export interface Library {
  id: string
  name: string
  slug: string
  description: string
  categoryId: string
  githubUrl: string
  npmUrl: string
  pros?: string
  cons?: string
  installNpm?: string
  installExpo?: string
  codeExample?: string
  lastUpdated?: Date
  alternatives?: string[]
}

export const categoriesData: Category[] = [
  { id: "1", name: "Navigation", slug: "navigation" },
  { id: "2", name: "UI Components", slug: "ui-components" },
  { id: "3", name: "State Management", slug: "state-management" },
  { id: "4", name: "API & Networking", slug: "api-networking" },
  { id: "5", name: "Animation", slug: "animation" },
  { id: "6", name: "Storage", slug: "storage" },
]

export const librariesData: Library[] = [
  {
    id: "1",
    name: "React Navigation",
    slug: "react-navigation",
    description:
      "Routing and navigation for Expo and React Native apps. Built with TypeScript and loved by the community.",
    categoryId: "1",
    githubUrl: "https://github.com/react-navigation/react-navigation",
    npmUrl: "https://www.npmjs.com/package/@react-navigation/native",
    pros: "Easy to use\nGreat documentation\nFlexible\nWell maintained",
    cons: "Learning curve for complex navigation\nPerformance with deep nesting",
    installNpm: "npm install @react-navigation/native react-native-screens",
    installExpo: "expo install @react-navigation/native react-native-screens",
    codeExample: `import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`,
    lastUpdated: new Date("2024-10-15"),
    alternatives: ["2", "3"],
  },
  {
    id: "2",
    name: "React Native Paper",
    slug: "react-native-paper",
    description: "Material Design 3 components library for React Native. Production-ready with dark mode support.",
    categoryId: "2",
    githubUrl: "https://github.com/callstack/react-native-paper",
    npmUrl: "https://www.npmjs.com/package/react-native-paper",
    pros: "Material Design\nGreat theming system\nAccessible\nMany components",
    cons: "Can be heavyweight\nCustomization limitations",
    installNpm: "npm install react-native-paper",
    installExpo: "expo install react-native-paper",
    codeExample: `import { Button, Card } from 'react-native-paper';

export default function App() {
  return (
    <Card>
      <Card.Title>Hello</Card.Title>
      <Button mode="contained">Press me</Button>
    </Card>
  );
}`,
    lastUpdated: new Date("2024-10-10"),
    alternatives: ["1", "3"],
  },
  {
    id: "3",
    name: "Redux Toolkit",
    slug: "redux-toolkit",
    description: "Official, opinionated, batteries-included toolset for efficient Redux development.",
    categoryId: "3",
    githubUrl: "https://github.com/reduxjs/redux-toolkit",
    npmUrl: "https://www.npmjs.com/package/@reduxjs/toolkit",
    pros: "Less boilerplate\nImmer integration\nBuilt-in dev tools\nGreat docs",
    cons: "Learning curve\nOverkill for small apps",
    installNpm: "npm install @reduxjs/toolkit react-redux",
    installExpo: "expo install @reduxjs/toolkit react-redux",
    codeExample: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value++; }
  }
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});`,
    lastUpdated: new Date("2024-10-12"),
    alternatives: ["4", "5"],
  },
  {
    id: "4",
    name: "Zustand",
    slug: "zustand",
    description: "A small, fast and scalable state management solution. No dependencies, minimal API.",
    categoryId: "3",
    githubUrl: "https://github.com/pmndrs/zustand",
    npmUrl: "https://www.npmjs.com/package/zustand",
    pros: "Minimal API\nNo dependencies\nVery fast\nSimple to learn",
    cons: "Smaller ecosystem\nFewer patterns",
    installNpm: "npm install zustand",
    installExpo: "expo install zustand",
    codeExample: `import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));

function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}`,
    lastUpdated: new Date("2024-10-14"),
    alternatives: ["3", "5"],
  },
  {
    id: "5",
    name: "Recoil",
    slug: "recoil",
    description: "An experimental state management library by Facebook. Built for React with hooks API.",
    categoryId: "3",
    githubUrl: "https://github.com/facebookexperimental/Recoil",
    npmUrl: "https://www.npmjs.com/package/recoil",
    pros: "Fine-grained reactivity\nGreat DevTools\nAtoms & selectors pattern\nAsync support",
    cons: "Still experimental\nSmaller community",
    installNpm: "npm install recoil",
    installExpo: "expo install recoil",
    codeExample: `import { atom, selector, useRecoilState } from 'recoil';

const countAtom = atom({
  key: 'count',
  default: 0
});

function Counter() {
  const [count, setCount] = useRecoilState(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    lastUpdated: new Date("2024-09-28"),
    alternatives: ["3", "4"],
  },
  {
    id: "6",
    name: "Axios",
    slug: "axios",
    description: "Promise-based HTTP client. Works great for making API requests in React Native apps.",
    categoryId: "4",
    githubUrl: "https://github.com/axios/axios",
    npmUrl: "https://www.npmjs.com/package/axios",
    pros: "Request/response interceptors\nCancel requests\nTimeout support\nGreat docs",
    cons: "Extra dependency\nFetch might be enough",
    installNpm: "npm install axios",
    installExpo: "expo install axios",
    codeExample: `import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com'
});

api.get('/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,
    lastUpdated: new Date("2024-10-11"),
    alternatives: ["7"],
  },
  {
    id: "7",
    name: "React Query",
    slug: "react-query",
    description: "Powerful data synchronization library. Handles caching, background updates, and more.",
    categoryId: "4",
    githubUrl: "https://github.com/TanStack/query",
    npmUrl: "https://www.npmjs.com/package/@tanstack/react-query",
    pros: "Auto caching\nBackground refetch\nInfinite queries\nDevTools",
    cons: "Learning curve\nMore setup needed",
    installNpm: "npm install @tanstack/react-query",
    installExpo: "expo install @tanstack/react-query",
    codeExample: `import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json())
  });

  if (isLoading) return <Text>Loading...</Text>;
  return <Text>{data?.length} users</Text>;
}`,
    lastUpdated: new Date("2024-10-13"),
    alternatives: ["6"],
  },
  {
    id: "8",
    name: "React Native Reanimated",
    slug: "react-native-reanimated",
    description: "Performant animations and interactions. Built with the new React Native architecture in mind.",
    categoryId: "5",
    githubUrl: "https://github.com/software-mansion/react-native-reanimated",
    npmUrl: "https://www.npmjs.com/package/react-native-reanimated",
    pros: "60 FPS animations\nShared values\nGesture support\nGreat performance",
    cons: "Setup complexity\nLearning curve",
    installNpm: "npm install react-native-reanimated",
    installExpo: "expo install react-native-reanimated",
    codeExample: `import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function Animations() {
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }]
  }));

  return <Animated.View style={animatedStyle} />;
}`,
    lastUpdated: new Date("2024-10-09"),
    alternatives: ["9"],
  },
  {
    id: "9",
    name: "Framer Motion",
    slug: "framer-motion",
    description: "Production-ready motion library. Simple syntax, powerful animations. Supports web and mobile.",
    categoryId: "5",
    githubUrl: "https://github.com/framer/motion",
    npmUrl: "https://www.npmjs.com/package/framer-motion",
    pros: "Easy API\nLayout animations\nGestures\nGreat documentation",
    cons: "Web focused\nMobile support limited",
    installNpm: "npm install framer-motion",
    installExpo: "expo install framer-motion",
    codeExample: `import { motion } from 'framer-motion';

export default function Box() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2 }}
    />
  );
}`,
    lastUpdated: new Date("2024-10-08"),
    alternatives: ["8"],
  },
  {
    id: "10",
    name: "AsyncStorage",
    slug: "async-storage",
    description: "Unencrypted, asynchronous, persistent storage for React Native. Easy key-value storage.",
    categoryId: "6",
    githubUrl: "https://github.com/react-native-async-storage/async-storage",
    npmUrl: "https://www.npmjs.com/package/@react-native-async-storage/async-storage",
    pros: "Easy API\nGood documentation\nWide adoption\nReliable",
    cons: "No encryption\nNot suitable for sensitive data",
    installNpm: "npm install @react-native-async-storage/async-storage",
    installExpo: "expo install @react-native-async-storage/async-storage",
    codeExample: `import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

const getData = async () => {
  const value = await AsyncStorage.getItem('user');
  return JSON.parse(value);
};`,
    lastUpdated: new Date("2024-10-07"),
    alternatives: ["11"],
  },
  {
    id: "11",
    name: "SQLite",
    slug: "sqlite",
    description: "Native SQL database for React Native. Perfect for complex data management.",
    categoryId: "6",
    githubUrl: "https://github.com/react-native-sqlite-storage/react-native-sqlite-storage",
    npmUrl: "https://www.npmjs.com/package/react-native-sqlite-storage",
    pros: "SQL queries\nRelational data\nLarge datasets\nTransactions",
    cons: "More complex\nSetup required",
    installNpm: "npm install react-native-sqlite-storage",
    installExpo: "expo install react-native-sqlite-storage",
    codeExample: `import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'app.db',
  location: 'default'
});

db.transaction(tx => {
  tx.executeSql('CREATE TABLE IF NOT EXISTS users (id, name)');
});`,
    lastUpdated: new Date("2024-10-06"),
    alternatives: ["10"],
  },
  {
    id: "12",
    name: "React Native SVG",
    slug: "react-native-svg",
    description: "SVG support for React Native. Render vector graphics natively.",
    categoryId: "2",
    githubUrl: "https://github.com/software-mansion/react-native-svg",
    npmUrl: "https://www.npmjs.com/package/react-native-svg",
    pros: "Scalable graphics\nAnimatable\nNative rendering\nSmall file size",
    cons: "Learning curve\nSome features limited",
    installNpm: "npm install react-native-svg",
    installExpo: "expo install react-native-svg",
    codeExample: `import Svg, { Circle, Rect } from 'react-native-svg';

export default function SVGs() {
  return (
    <Svg width={100} height={100}>
      <Circle cx={50} cy={50} r={40} fill="blue" />
      <Rect x={10} y={10} width={30} height={30} fill="red" />
    </Svg>
  );
}`,
    lastUpdated: new Date("2024-10-05"),
    alternatives: ["13"],
  },
  {
    id: "13",
    name: "NativeBase",
    slug: "nativebase",
    description: "Universal components library. Cross-platform components with consistent APIs.",
    categoryId: "2",
    githubUrl: "https://github.com/GeekyAnts/nativebase",
    npmUrl: "https://www.npmjs.com/package/native-base",
    pros: "Many components\nCross-platform\nGood theming\nActive community",
    cons: "Bundle size\nSteeper learning curve",
    installNpm: "npm install native-base",
    installExpo: "expo install native-base",
    codeExample: `import { Button, Box, Text } from 'native-base';

export default function App() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Button colorScheme="blue">
        <Text>Press me</Text>
      </Button>
    </Box>
  );
}`,
    lastUpdated: new Date("2024-10-04"),
    alternatives: ["2", "12"],
  },
  {
    id: "14",
    name: "React Native Gesture Handler",
    slug: "react-native-gesture-handler",
    description: "Native gesture handler library. Better performance and responsiveness than JS solutions.",
    categoryId: "5",
    githubUrl: "https://github.com/software-mansion/react-native-gesture-handler",
    npmUrl: "https://www.npmjs.com/package/react-native-gesture-handler",
    pros: "60 FPS gestures\nNative performance\nMany gesture types\nWell maintained",
    cons: "Setup required\nNative code knowledge",
    installNpm: "npm install react-native-gesture-handler",
    installExpo: "expo install react-native-gesture-handler",
    codeExample: `import { GestureHandlerRootView, LongPressGestureHandler } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <LongPressGestureHandler onActivated={() => console.log('Long press')}>
        <View>Long press me</View>
      </LongPressGestureHandler>
    </GestureHandlerRootView>
  );
}`,
    lastUpdated: new Date("2024-10-03"),
    alternatives: ["8"],
  },
  {
    id: "15",
    name: "TypeScript",
    slug: "typescript",
    description: "Typed superset of JavaScript. Essential for React Native development.",
    categoryId: "3",
    githubUrl: "https://github.com/microsoft/TypeScript",
    npmUrl: "https://www.npmjs.com/package/typescript",
    pros: "Type safety\nBetter tooling\nError prevention\nCode documentation",
    cons: "Setup overhead\nLearning curve",
    installNpm: "npm install --save-dev typescript",
    installExpo: "expo install --save-dev typescript",
    codeExample: `interface User {
  id: number;
  name: string;
}

const getUser = (id: number): User => {
  return { id, name: 'John' };
};`,
    lastUpdated: new Date("2024-10-02"),
  },
  {
    id: "16",
    name: "Expo",
    slug: "expo",
    description: "Platform for building universal React Native applications. Simplifies development workflow.",
    categoryId: "1",
    githubUrl: "https://github.com/expo/expo",
    npmUrl: "https://www.npmjs.com/package/expo",
    pros: "Easy setup\nNo native compilation\nGreat tooling\nWeb support",
    cons: "Limited native modules\nLarger bundle",
    installNpm: "npm install expo expo-cli",
    installExpo: "expo install expo",
    codeExample: `import Expo from 'expo';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Hello Expo!</Text>
    </View>
  );
}`,
    lastUpdated: new Date("2024-10-01"),
  },
]
