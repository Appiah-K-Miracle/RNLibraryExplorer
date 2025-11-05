 
import { PrismaClient } from '@prisma/client'
import slugify from "slugify";

const prisma = new PrismaClient();

const categories = [
  "UI Components",
  "Navigation",
  "Animation",
  "Storage & State",
  "Networking",
  "Forms & Validation",
  "Images & Media",
  "Maps & Location",
  "Hardware & Sensors",
  "Performance",
  "Expo Plugins",
  "Payments & Commerce",
];

const libraries = [
  {
    name: "React Navigation",
    description: "Routing and navigation for React Native apps.",
    category: "Navigation",
    githubUrl: "https://github.com/react-navigation/react-navigation",
    npmUrl: "https://www.npmjs.com/package/@react-navigation/native",
    pros: "Flexible, widely adopted, community-driven.",
    cons: "Complex API for deep linking.",
    installNpm: "npm install @react-navigation/native",
    installExpo: "expo install react-native-screens react-native-safe-area-context",
    codeExample: "import { NavigationContainer } from '@react-navigation/native';",
  },
  {
    name: "React Native Reanimated",
    description: "Powerful animation library for gesture-based experiences.",
    category: "Animation",
    githubUrl: "https://github.com/software-mansion/react-native-reanimated",
    npmUrl: "https://www.npmjs.com/package/react-native-reanimated",
    pros: "Very performant, native animation threads.",
    cons: "Learning curve.",
    installNpm: "npm install react-native-reanimated",
  },
  {
    name: "React Native Gesture Handler",
    description: "Gesture system for performant interactions.",
    category: "Animation",
    githubUrl: "https://github.com/software-mansion/react-native-gesture-handler",
    npmUrl: "https://www.npmjs.com/package/react-native-gesture-handler",
    installNpm: "npm install react-native-gesture-handler",
  },
  {
    name: "Redux Toolkit",
    description: "Official, modern approach to Redux state management.",
    category: "Storage & State",
    githubUrl: "https://github.com/reduxjs/redux-toolkit",
    npmUrl: "https://www.npmjs.com/package/@reduxjs/toolkit",
    installNpm: "npm install @reduxjs/toolkit react-redux",
  },
  {
    name: "Zustand",
    description: "Minimal, scalable state management.",
    category: "Storage & State",
    githubUrl: "https://github.com/pmndrs/zustand",
    npmUrl: "https://www.npmjs.com/package/zustand",
    installNpm: "npm install zustand",
  },
  {
    name: "React Query",
    description: "Data fetching and caching made simple.",
    category: "Networking",
    githubUrl: "https://github.com/TanStack/query",
    npmUrl: "https://www.npmjs.com/package/@tanstack/react-query",
    installNpm: "npm install @tanstack/react-query",
  },
  {
    name: "Axios",
    description: "Promise-based HTTP client.",
    category: "Networking",
    githubUrl: "https://github.com/axios/axios",
    npmUrl: "https://www.npmjs.com/package/axios",
    installNpm: "npm install axios",
  },
  {
    name: "Formik",
    description: "Form handling in React & React Native.",
    category: "Forms & Validation",
    githubUrl: "https://github.com/jaredpalmer/formik",
    npmUrl: "https://www.npmjs.com/package/formik",
    installNpm: "npm install formik",
  },
  {
    name: "Yup",
    description: "Validation schema builder.",
    category: "Forms & Validation",
    githubUrl: "https://github.com/jquense/yup",
    npmUrl: "https://www.npmjs.com/package/yup",
    installNpm: "npm install yup",
  },
  {
    name: "React Native Maps",
    description: "Map components using Google Maps & Apple Maps.",
    category: "Maps & Location",
    githubUrl: "https://github.com/react-native-maps/react-native-maps",
    npmUrl: "https://www.npmjs.com/package/react-native-maps",
  },
  {
    name: "Lottie for React Native",
    description: "Lottie animations for React Native.",
    category: "Animation",
    githubUrl: "https://github.com/lottie-react-native/lottie-react-native",
    npmUrl: "https://www.npmjs.com/package/lottie-react-native",
  },
  {
    name: "NativeWind",
    description: "Tailwind CSS for React Native.",
    category: "UI Components",
    githubUrl: "https://github.com/marklawlor/nativewind",
    npmUrl: "https://www.npmjs.com/package/nativewind",
  },
  {
    name: "React Native Paper",
    description: "Material Design components for RN.",
    category: "UI Components",
    githubUrl: "https://github.com/callstack/react-native-paper",
    npmUrl: "https://www.npmjs.com/package/react-native-paper",
  },
  {
    name: "React Native Elements",
    description: "Cross-platform UI toolkit.",
    category: "UI Components",
    githubUrl: "https://github.com/react-native-elements/react-native-elements",
    npmUrl: "https://www.npmjs.com/package/react-native-elements",
  },
  {
    name: "Expo Camera",
    description: "Camera support for Expo projects.",
    category: "Hardware & Sensors",
    githubUrl: "https://github.com/expo/expo",
    npmUrl: "https://www.npmjs.com/package/expo-camera",
  },
  {
    name: "React Native Device Info",
    description: "Access device information",
    category: "Hardware & Sensors",
    githubUrl: "https://github.com/react-native-device-info/react-native-device-info",
    npmUrl: "https://www.npmjs.com/package/react-native-device-info",
  },
  {
    name: "React Native Firebase",
    description: "Firebase SDK for React Native.",
    category: "Networking",
    githubUrl: "https://github.com/invertase/react-native-firebase",
    npmUrl: "https://www.npmjs.com/package/@react-native-firebase/app",
  },
  {
    name: "Stripe React Native",
    description: "Accept payments in apps.",
    category: "Payments & Commerce",
    githubUrl: "https://github.com/stripe/stripe-react-native",
    npmUrl: "https://www.npmjs.com/package/@stripe/stripe-react-native",
  },
  {
    name: "Jotai",
    description: "Minimal state management using atoms.",
    category: "Storage & State",
    githubUrl: "https://github.com/pmndrs/jotai",
    npmUrl: "https://www.npmjs.com/package/jotai",
  },
  {
    name: "MMKV",
    description: "Blazing-fast key-value storage.",
    category: "Storage & State",
    githubUrl: "https://github.com/mrousavy/react-native-mmkv",
    npmUrl: "https://www.npmjs.com/package/react-native-mmkv",
  },
  // ✅ MORE PACKAGES CAN BE ADDED HERE FROM ME IN NEXT SEED UPDATE
];

// ✅ Convert category names into DB entries
async function seed() {
  console.log("🌱 Seeding database...");

  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: slugify(name, { lower: true }) },
      update: {},
      create: {
        name,
        slug: slugify(name, { lower: true }),
      }
    });
  }

  for (const lib of libraries) {
    const category = await prisma.category.findFirst({
      where: { name: lib.category },
    });

    const { category: _, ...libData } = lib;

    await prisma.library.upsert({
      where: { slug: slugify(lib.name, { lower: true }) },
      update: {},
      create: {
        ...libData,
        slug: slugify(lib.name, { lower: true }),
        categoryId: category!.id,
        githubStars: Math.floor(Math.random() * 50000),
        githubForks: Math.floor(Math.random() * 5000),
        openIssues: Math.floor(Math.random() * 200),
        maintenanceScore: Math.floor(Math.random() * 100),
        popularityScore: Math.floor(Math.random() * 100),
        lastCommitDate: new Date(),
      }
    });
  }

  console.log("✅ Seed completed!");
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
