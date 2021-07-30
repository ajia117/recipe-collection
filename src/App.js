import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor({ recipeState = false }) {
    super();

    this.state = {
      addRecipe: recipeState,
      recipeBeingEdited: {},
      recipes: []
    }
  }

  toggleAddRecipe = () => {
    this.setState({
      addRecipe: !this.state.addRecipe,
      recipeBeingEdited: {}
    })
  }

  makeDeepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * 
   * @param {*} event Event object
   * @param {*} stateObj string representing name of obj inside state to store
   */
  handleChange = (event, stateObj) => {
    if(stateObj) {
      let newStateObj = this.makeDeepCopy(this.state[stateObj])
      newStateObj[event.target.id] = event.target.value;
      this.setState({[stateObj]: newStateObj});
    }
    else {
      this.setState({[event.target.id]: event.target.value})
    }
  }

  submitRecipe = (event) => {
    event.preventDefault();

    let newState = this.makeDeepCopy(this.state);
    newState.recipeBeingEdited.isVisible = false;
    newState.recipes.push(newState.recipeBeingEdited);

    this.setState(newState);
    this.toggleAddRecipe();
  }

  toggleInstructions = (index) => {
    this.setState((state) => {
      let newRecipes = this.makeDeepCopy(state.recipes);
      newRecipes[index].isVisible = !newRecipes[index].isVisible;
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
            this.state.recipes.map(({ newRecipeName, newRecipeInstructions, isVisible }, index) => (
              <li key={index}>
                <h2 onClick={() => this.toggleInstructions(index)}>{newRecipeName}</h2>
                <p style={{display: (isVisible ? 'block' : 'none')}}>{newRecipeInstructions}</p>
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
          this.state.addRecipe
            ? addNewRecipeForm
            : <button id="add-recipe" onClick={this.toggleAddRecipe}>Add Recipe</button>

        }
        {
          this.renderRecipes()
        }
      </div>
    )
  }
}

export default App;
