import React, { useEffect, useState } from 'react';
import config from '../constants.js';
import { UserCircleIcon, ArrowRightOnRectangleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, recipes, onLogout, onLoadRecipes, onCreateRecipe }) => {
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', prepTime: 0, photo: null });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    onLoadRecipes();
  }, [onLoadRecipes]);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    if (!newRecipe.title || !newRecipe.photo) {
        alert('Title and photo are required.');
        return;
    }
    await onCreateRecipe(newRecipe);
    setNewRecipe({ title: '', description: '', prepTime: 0, photo: null });
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
            <div>
                <h1 className="text-xl font-semibold text-gray-900">Welcome, {user.name}!</h1>
                <p className="text-sm text-gray-500 capitalize">Role: {user.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Community Recipes</h2>
            {(user.role === 'chef' || user.role === 'admin') && (
                <button 
                    onClick={() => setIsFormVisible(!isFormVisible)} 
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <span>{isFormVisible ? 'Cancel' : 'New Recipe'}</span>
                </button>
            )}
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Create a New Recipe</h3>
            <form onSubmit={handleCreateRecipe} className="space-y-4">
              <input
                type="text"
                placeholder="Recipe Title"
                value={newRecipe.title}
                onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <textarea
                placeholder="Short Description"
                value={newRecipe.description}
                onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
              />
              <input
                type="number"
                placeholder="Prep Time (minutes)"
                value={newRecipe.prepTime}
                onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: parseInt(e.target.value, 10) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Recipe Photo</label>
                  <input
                    type="file"
                    onChange={(e) => setNewRecipe({ ...newRecipe, photo: e.target.files[0] })}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    required
                  />
              </div>
              <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Submit Recipe
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                {recipe.photo && recipe.photo.thumbnail && (
                    <img src={recipe.photo.thumbnail.url} alt={recipe.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span>By {recipe.author ? recipe.author.name : 'Unknown Chef'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">No recipes found. Be the first to add one!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
