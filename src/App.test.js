import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('Submitting new recipe will render it on home page', () => {

  render(<App recipeState={true}/>);

  userEvent.type(screen.getByTestId("newRecipeName"), "Grandma's ramen")
  userEvent.type(screen.getByTestId("newRecipeInstructions"), "1. Open Shin Ramen \n2. Pour package")

  userEvent.click(screen.getByTestId("submit"))

  expect(screen.getByText("Grandma's ramen")).toBeInTheDocument();
})