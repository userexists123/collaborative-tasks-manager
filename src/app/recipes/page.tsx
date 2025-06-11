'use client';

import Search from '@/components/Search/Search';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchAllRecipes = async () => {
    const data = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    const recipes = await data.json();
    return recipes.meals ?? []
}


const RecipesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: recipes, isLoading, error } = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchAllRecipes
    });

    const filteredRecipes = recipes?.filter((recipe: any) =>
        recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recipes</h2>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} classProp={"mb-2 md:w-1/3"} keyWord={'name'} />
            {isLoading && <p>Loading recipes...</p>}
            {error && <p>Failed to load recipes</p>}
            {filteredRecipes?.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Ingredients</th>
                            <th className="border p-2">Instructions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecipes.map((recipe: any) => (
                            <tr key={recipe.idMeal}>
                                <td className="border p-2">{recipe.strMeal}</td>
                                <td className="border p-2">
                                    {[...Array(20)].map((_, i) => {
                                        const ingredient = recipe[`strIngredient${i + 1}`];
                                        const measure = recipe[`strMeasure${i + 1}`];
                                        return ingredient ? (
                                            <div key={i} className="mb-2">{`${ingredient} - ${measure}`}</div>
                                        ) : null;
                                    })}
                                </td>
                                <td className="border p-2">{recipe.strInstructions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !isLoading && <p>No recipes found.</p>
            )}
        </div>
    );
};

export default RecipesPage;
