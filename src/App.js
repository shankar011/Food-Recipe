import React, { useEffect, useState } from 'react';
import "./App.css"
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // function for searching for the recipe
  const searchRecipes = async (searchQuery) => {
    setIsLoading(true);
    const url = apiUrl + searchQuery;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchRecipes(query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes(query);
  };

  return (
    <div className='container'>
      <h2>Food Recipe App</h2>
      <SearchBar handleSubmit={handleSubmit} value={query} onChange={(event) => setQuery(event.target.value)} isLoading={isLoading} />
      <div className='recipes'>
        {
          recipes ? recipes.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          )) : "No Recipes"
        }
      </div>
    </div>
  );
}

export default App;
