import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor({ recipeState = false }) {
    super();

    this.state = {
      isAddRecipeFormDisplayed: recipeState,
      recipeBeingEdited: {
      },
      recipes: []
    }
  }

  toggleAddRecipeForm = () => {
    this.setState((prevState) => {
      let newState = {
        isAddRecipeFormDisplayed: !prevState.isAddRecipeFormDisplayed,
        recipeBeingEdited: {
        },
        recipes: prevState.recipes
      }

      return newState
    })
  }

  /**
   * 
   * @param {*} event Event object
   * @param {*} stateObj string representing name of obj inside state to store
   */
  handleChange = (event, stateObj) => {
    if(stateObj) {
      let newStateObj = {}
      for(let key in this.state[stateObj]) {
        newStateObj[key] = this.state[stateObj][key];
      }
      newStateObj[event.target.id] = event.target.value;
      this.setState({[stateObj]: newStateObj});
    }
    else {
      this.setState({[event.target.id]: event.target.value})
    }
  }

  submitRecipe = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      let newState = {
        isAddRecipeFormDisplayed: !prevState.isAddRecipeFormDisplayed,
        recipeBeingEdited: prevState.recipeBeingEdited,
        recipes: prevState.recipes
      }
      newState.recipeBeingEdited.viewInstructions = 'none';
      newState.recipes = newState.recipes.concat(newState.recipeBeingEdited)
      return newState
    })
  }

  toggleInstructions = (index) => {
    console.log("title clicked: ", index)
    this.setState((state) => {
      let newRecipes = JSON.parse(JSON.stringify(state.recipes));
      if(newRecipes[index].viewInstructions === 'block') {
        newRecipes[index].viewInstructions = 'none';
      } else {
        newRecipes[index].viewInstructions = 'block';
      }
      return {recipes: newRecipes};
    })
  }

  renderRecipes = () => {
    if (this.state.recipes.length === 0) {
      return <p>There are no recipes to list.</p>
    } else {
      return (
        <ul>
            {
            this.state.recipes.map(({ newRecipeName, newRecipeInstructions, viewInstructions }, index) => (
              <li key={index}>
                <h2 onClick={() => this.toggleInstructions(index)}>{newRecipeName}</h2>
                <p style={{display: viewInstructions}}>{newRecipeInstructions}</p>
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
          value={this.state.recipeBeingEdited.newRecipeName}
          onChange={
            (event) => this.handleChange(event, "recipeBeingEdited")
          }/>
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea
          id="newRecipeInstructions"
          data-testid="newRecipeInstructions"
          placeholder="write recipe instructions here..."
          value={this.state.recipeBeingEdited.newRecipeInstructions}
          onChange={
            (event) => this.handleChange(event, "recipeBeingEdited")
          }/>
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
