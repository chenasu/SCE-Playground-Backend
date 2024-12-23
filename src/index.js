import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    const response = '{ "text": "hello from server"}';
    res.send(response);
});


app.get('/recipes', (req, res) => {
    const response = `{
        "recipes": [
          {
            "title": "Spaghetti Bolonez",
            "body": "Ingredients:\n- 200g spaghetti\n- 100g pancetta\n- 2 large eggs\n- 50g Pecorino cheese\n- 50g Parmesan cheese\n- Freshly ground black pepper\n- Salt\n- 1 garlic clove, peeled\n- 50g unsalted butter\n\nInstructions:\n1. Put a large saucepan of water on to boil.\n2. Finely chop the pancetta, having first removed any rind.\n3. Beat the eggs in a medium bowl, season with a little freshly grated black pepper and set everything aside.\n4. Add the spaghetti to the water with a pinch of salt and cook according to the packet instructions.\n5. Squash the garlic with the blade of a knife, just to bruise it.\n6. While the spaghetti is cooking, heat the butter in a deep frying pan. Add the pancetta and garlic, and cook until the pancetta is crispy.\n7. Remove and discard the garlic, then take the pan off the heat.\n8. Save a cup of pasta water, then drain the spaghetti and add it to the pan with the pancetta. Toss everything together.\n9. Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later.\n10. Add a little of the reserved pasta water to the egg mixture and stir quickly.\n11. Pour the eggs and cheese into the pasta, stirring quickly to combine, so that the eggs thicken but do not scramble.\n12. Adjust the consistency with more pasta water if necessary, then season with salt and pepper.\n13. Serve immediately, with the remaining cheese sprinkled on top."
          },
          {
            "title": "Chicken Tikka Masala",
            "body": "Ingredients:\n- 2 large chicken breasts\n- 1 large onion, chopped\n- 2 garlic cloves, minced\n- 1 tablespoon grated ginger\n- 2 tablespoons vegetable oil\n- 1 teaspoon ground turmeric\n- 1 teaspoon ground cumin\n- 1 teaspoon ground coriander\n- 1 teaspoon paprika\n- 1 teaspoon garam masala\n- 400g can of diced tomatoes\n- 200ml coconut milk\n- 1 tablespoon tomato paste\n- Fresh cilantro, chopped\n- Salt and pepper to taste\n\nInstructions:\n1. Cut the chicken breasts into bite-sized pieces and season with salt and pepper.\n2. Heat the oil in a large pan over medium heat. Add the onions and cook until softened.\n3. Add the garlic and ginger, cooking for another minute until fragrant.\n4. Add the turmeric, cumin, coriander, paprika, and garam masala, and cook for another 2 minutes.\n5. Add the chicken pieces to the pan and cook until they are no longer pink on the outside.\n6. Add the diced tomatoes, coconut milk, and tomato paste, stirring to combine.\n7. Bring the mixture to a simmer, then reduce the heat and cook for about 20 minutes, until the chicken is cooked through and the sauce has thickened.\n8. Taste and adjust seasoning with salt and pepper.\n9. Serve hot, garnished with fresh cilantro, along with rice or naan bread."
          }
        ]
      }
      `;
    res.send(response);
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});






