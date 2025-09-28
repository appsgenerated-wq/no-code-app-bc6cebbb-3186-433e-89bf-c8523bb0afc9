import React from 'react';
import config from '../constants.js';
import { CakeIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const features = [
    { name: 'Discover Recipes', description: 'Find thousands of recipes from chefs around the world.', icon: SparklesIcon },
    { name: 'Share Your Creations', description: 'Become a chef and share your own culinary masterpieces.', icon: CakeIcon },
    { name: 'Join the Community', description: 'Rate, review, and connect with fellow food lovers.', icon: UserGroupIcon },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 text-2xl font-bold text-indigo-600 flex items-center">
              <CakeIcon className="h-8 w-8 mr-2" />
              <span>FoodApp</span>
            </a>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors">
              Admin Panel <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover & Share Amazing Recipes
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your ultimate destination for culinary inspiration. Join our community of chefs and food enthusiasts to explore, create, and share delicious food.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => onLogin('chef@example.com', 'password')}
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:scale-105"
              >
                Login as Demo Chef
              </button>
              <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors">
                View Admin Panel <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to be a master chef</p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                {features.map((featureItem) => (
                    <div key={featureItem.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <featureItem.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        {featureItem.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{featureItem.description}</dd>
                    </div>
                ))}
                </dl>
            </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default LandingPage;
