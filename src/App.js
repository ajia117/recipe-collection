import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor({ recipeState = false }) {
    super();

    this.state = {
      isAddRecipeFormDisplayed: recipeState,
      recipeBeingEdited: {
        name: '',
        steps: ''
      },
      recipes: []
    }
  }

  toggleAddRecipeForm = () => {
    this.setState({
      isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed,
      recipeBeingEdited: {
        name: '',
        steps: ''
      },
      recipes: this.state.recipes
    })
  }

  submitRecipe = (event) => {
    event.preventDefault();
    console.log("submission is occurring: ", event)
    console.log("submitRecipe recipes state: ", this.state)
    this.setState({
      isAddRecipeFormDisplayed: this.state.isAddRecipeFormDisplayed,
      recipeBeingEdited: this.state.recipeBeingEdited,
      recipes: this.state.recipes.push(this.state.recipeBeingEdited)
    })
    console.log("afterRecipe recipes state: ", this.state)
    this.toggleAddRecipeForm();
  }

  renderRecipes = () => {
    console.log("renderRecipes recipes state: ", this.state)
    if (this.state.recipes.length === 0) {
      return <p>There are no recipes to list.</p>
    } else {
      return (
        <ul>
          {
            this.state.recipes.map(({ name, steps }) => (
              <li key={name}>
                <h2>{name}</h2>
                <p>{steps}</p>
              </li>
            ))
          }
        </ul>
      )
    }
  }

  render() {
    const addNewRecipeForm = (
      <form id="recipe-form" onSubmit={this.submitRecipe}>
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input
          type="text"
          data-testid="newRecipeName"
          id="newRecipeName"
          value={this.state.recipeBeingEdited.name}
          onChange={
            (event) => this.setState((state) => {
              state.recipeBeingEdited.name = event.target.value;
              return state;
            })
          } />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea
          id="newRecipeInstructions"
          data-testid="newRecipeInstructions"
          placeholder="write recipe instructions here..."
          value={this.state.recipeBeingEdited.steps}
          onChange={
            (event) => this.setState((state) => {
              state.recipeBeingEdited.steps = event.target.value;
              return state;
            })
          } />
        <input type="submit" id="submit" data-testid="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed
            ? addNewRecipeForm
            : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>

        }
        {
          this.renderRecipes()
        }
      </div>
    )
  }
}

export default App;
