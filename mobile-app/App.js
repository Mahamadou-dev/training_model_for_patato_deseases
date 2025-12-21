import React, { useState, useEffect } from 'react';
import { View, StatusBar, BackHandler } from 'react-native';
import Home from './src/screens/Home';
import Scan from './src/screens/Scan';
import Learn from './src/screens/Learn';
import PlantDetail from './src/screens/PlantDetail';
import About from './src/screens/About';
import Splash1 from './src/screens/Splash1';
import Splash2 from './src/screens/Splash2';

const App = () => {
  // Navigation State
  // Start at Splash1 now that stability is confirmed
  const [screenStack, setScreenStack] = useState([{ name: 'Splash1', params: {} }]);

  // Guard against empty stack
  if (screenStack.length === 0) {
    setScreenStack([{ name: 'Splash1', params: {} }]);
  }

  const currentRoute = screenStack[screenStack.length - 1];

  // Hardware Back Button Handler
  useEffect(() => {
    const onBackPress = () => {
      // Allow going back
      if (screenStack.length > 1) {
        goBack();
        return true;
      }
      return false; // Exit app
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [screenStack]);

  // Navigation Methods
  const navigate = (name, params = {}) => {
    console.log('NAVIGATE TO:', name);
    setScreenStack(prev => [...prev, { name, params }]);
  };

  const replace = (name, params = {}) => {
    // Replace current screen with new one
    setScreenStack(prev => {
      const newStack = [...prev];
      newStack.pop(); // Remove current
      return [...newStack, { name, params }];
    });
  };

  const goBack = () => {
    console.log('GO BACK');
    setScreenStack(prev => {
      if (prev.length > 1) {
        const newStack = [...prev];
        newStack.pop();
        return newStack;
      }
      return prev;
    });
  };

  const navigation = {
    navigate,
    replace,
    goBack,
    push: navigate,
  };

  // Screen Renderer
  const renderScreen = () => {
    const { name, params } = currentRoute;
    const route = { params };

    switch (name) {
      case 'Splash1': return <Splash1 navigation={navigation} />;
      case 'Splash2': return <Splash2 navigation={navigation} />;
      case 'Home': return <Home navigation={navigation} />;
      case 'Scan': return <Scan navigation={navigation} />;
      case 'Learn': return <Learn navigation={navigation} />;
      case 'PlantDetail': return <PlantDetail navigation={navigation} route={route} />;
      case 'About': return <About navigation={navigation} />;
      default: return <Home navigation={navigation} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F1F8E9' }}>
      <StatusBar backgroundColor="#2E7D32" barStyle="light-content" />
      {renderScreen()}
    </View>
  );
};

export default App;
