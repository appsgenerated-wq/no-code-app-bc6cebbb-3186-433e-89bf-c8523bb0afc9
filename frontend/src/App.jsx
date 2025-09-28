import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(null); // null state for initial load
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('ℹ️ [APP] No active session found.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed. App may not function correctly.');
        setCurrentScreen('landing'); // Show landing page even if backend fails
      }
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setRecipes([]);
    setCurrentScreen('landing');
  };

  const loadRecipes = async () => {
    try {
      const response = await manifest.from('Recipe').find({ 
        include: ['author'],
        sort: { createdAt: 'desc' }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    }
  };

  const createRecipe = async (recipeData) => {
    try {
      const newRecipe = await manifest.from('Recipe').create(recipeData, { include: ['author'] });
      setRecipes([newRecipe, ...recipes]);
    } catch (error) {
      console.error('Failed to create recipe:', error);
      alert('Failed to create recipe. You may not have the required permissions.');
    }
  };

  const renderContent = () => {
    if (currentScreen === null) {
      return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className='text-gray-600'>Loading application...</p></div>;
    }
    if (currentScreen === 'landing' || !user) {
      return <LandingPage onLogin={handleLogin} />;
    }
    if (currentScreen === 'dashboard' && user) {
      return (
        <DashboardPage 
          user={user} 
          recipes={recipes} 
          onLogout={handleLogout}
          onLoadRecipes={loadRecipes}
          onCreateRecipe={createRecipe}
        />
      );
    }
    return <LandingPage onLogin={handleLogin} />;
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-xs font-medium ${backendConnected ? 'text-gray-700' : 'text-red-700'}`}>
          {backendConnected ? 'API Connected' : 'API Error'}
        </span>
      </div>
      {renderContent()}
    </div>
  );
}

export default App;
