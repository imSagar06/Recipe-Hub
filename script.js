const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchRecipe = async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...<h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        // console.log(response.meals[0]);
    
        recipeContainer.innerHTML="";
        response.meals.forEach(meal => {
            // console.log(meal);
            const recipediv = document.createElement('div');
            recipediv.classList.add('recipe');
            recipediv.innerHTML = `
                <img src="${meal.strMealThumb}"> 
                <h3>${meal.strMeal}</h3>  
                <p><span>${meal.strArea}</span> Dish</p>  
                <p>Belongs to <span>${meal.strCategory} </span>Category</p>  
             `
            const button = document.createElement('button');
            button.textContent="Get Recipe";
            recipediv.appendChild(button);
    
            // Adding EventListener to recipe button
            button.addEventListener('click',()=>{
                openRecipePopup(meal);
            });
            recipeContainer.appendChild(recipediv);
        }); 
    } catch (error) {
        recipeContainer.innerHTML=`<h2>Error In Fetching Recipes...</h2>`
    }

}
const fetchIngredients = (meal)=>{
    let ingredientsList = "";
    for(let i=1 ; i<=20 ; i++)
    {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient)
        {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
// Function for recipe details as popoup
const openRecipePopup = (meal)=>{
    // <img src="${meal.strMealThumb}">
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>  
    <h3>Ingredients : </h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions"> 
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    <div class = "recipe-link">
    <img src="${meal.strMealThumb}"> 
        <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    </div>
         `
         
    recipeDetailsContent.parentElement.style.display = "block"; 
}
recipeCloseBtn.addEventListener('click',(e)=>{
    recipeDetailsContent.parentElement.style.display = "none"; 
})
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput)
    {
        recipeContainer.innerHTML=`<h2>Type meal in the search box</h2>`;
        return;
    }
    fetchRecipe(searchInput);
    // console.log("Button Clicked");
})