const recipes = [
  {
    id: "1",
    userId: "1",
    title: "Flour Tortillas",
    description: 'These Best Ever Homemade Flour Tortillas are so simple and unbelievably delicious!',
    ingredients: `
      3 cups flour
      1 teaspoon salt
      1 teaspoon baking powder
      1/3 cup extra virgin olive oil
      1 cup warm water
    `,
    instructions: `
      Combine flour, salt and baking powder in a medium-size bowl. Using a sturdy silicone spatuala or a sturdy wooden spoon, mix dry ingredients until well combined.
      Make a well in the center of the dry ingredients and add the oil and water. Stir well from the bottom up, until all dry ingredients are incorporated and the dough begins to come together and form a shaggy ball.
      Turn dough out onto a lightly floured work surface and knead for 1-2 minutes until the dough is nice and smooth. Proceed with step number 3 below for the remainder of the recipe.    
    `
  },
  {
    id: "2",
    userId: "2",
    title: "Apple Pie",
    description: "Our homemade apple pie is sure to be the best apple pie recipe you've made to date.",
    ingredients: `
      Crust
        1 box (14.1 oz) refrigerated Pillsbury™ Pie Crusts (2 Count), softened as directed on box
      Filling*
        6 cups thinly sliced, peeled apples (6 medium)
        3/4 cup sugar
        2 tablespoons all-purpose flour
        3/4 teaspoon ground cinnamon
        1/4 teaspoon salt
        1/8 teaspoon ground nutmeg
        1 tablespoon lemon juice    
    `,
    instructions: `
      Heat oven to 425°F. Place 1 pie crust in ungreased 9-inch glass pie plate. Press firmly against side and bottom.
      In large bowl, gently mix filling ingredients; spoon into crust-lined pie plate. Top with second crust. Wrap excess top crust under bottom crust edge, pressing edges together to seal; flute. Cut slits or shapes in several places in top crust.
      Bake 40 to 45 minutes or until apples are tender and crust is golden brown. Cover edge of crust with 2- to 3-inch wide strips of foil after first 15 to 20 minutes of baking to prevent excessive browning. Cool on cooling rack at least 2 hours before serving.
    `
  },
  {
    id: "3",
    userId: "3",
    title: "Smoked Ribs",
    description: "Our famously easy 3-2-1 ribs recipe will make your rib game the envy of the neighborhood",
    ingredients: `
      1/3 Cup yellow mustard
      1/2 Cup apple juice, divided
      1 Tablespoon Worcestershire sauce
      To Taste Traeger Pork & Poultry Rub
    `,
    instructions: `
      When ready to cook, set Traeger temperature to 180℉ and preheat, lid closed for 15 minutes. Smoke the ribs, meat-side up for 3 hours, or until the internal temperature reaches 160℉.
      After the ribs have smoked for 3 hours, transfer them to a rimmed baking sheet and increase the grill temperature to 225℉.
      Tear off four long sheets of heavy-duty aluminum foil. Top with a rack of ribs and pull up the sides to keep the liquid enclosed. Sprinkle half the brown sugar on the rack, then top with half the honey and half the remaining apple juice. Use a bit more apple juice if you want more tender ribs. Lay another piece of foil on top and tightly crimp the edges so there is no leakage. Repeat with the remaining rack of ribs.
      Return the foiled ribs to the grill and cook for an additional 2 hours, or until internal temperature reaches 205℉.
      Carefully remove the foil from the ribs and brush the ribs on both sides with Traeger 'Que Sauce. Discard the foil. Arrange the ribs directly on the grill grate and continue to grill until the sauce tightens, 30 to 60 minutes more.
      Let the ribs rest for a few minutes before serving. Enjoy!      
    `
  },
  {
    id: "4",
    userId: "4",
    title: "Chicken Tacos",
    description: "I think this will be my go-to weeknight meal for the next few weeks. No, wait, months probably.",
    ingredients: `
      2 teaspoons chili powder
      1 teaspoon ground cumin
      1 teaspoon smoked paprika
      1 teaspoon dried oregano
      1/2 teaspoon garlic powder
      Kosher salt and freshly ground black pepper, to taste
      1 1/2 pounds boneless, skinless chicken thighs
      1 tablespoon canola oil
      12 mini flour tortillas, warmed
      1 cup pico de gallo, homemade or store-bought
      1 avocado, halved, peeled, seeded and diced
      1/2 cup chopped fresh cilantro leaves
      1 lime, cut into wedges    
    `,
    instructions: `
      In a small bowl, combine chili powder, cumin, paprika, oregano, garlic powder, 1 teaspoon salt and 1/2 teaspoon pepper. Season chicken with chili powder mixture.
      Heat canola oil in a large skillet over medium high heat. Working in batches, add chicken to the skillet in a single layer and cook until golden brown and cooked through, reaching an internal temperature of 165 degrees F, about 4-5 minutes per side. Let cool before dicing into bite-size pieces.
      Serve chicken in tortillas, topped with pico de gallo, avocado, cilantro and lime.
    `
  },
  {
    id: "5",
    userId: "5",
    title: "Funeral Potatoes",
    description: "These easy and delicious Funeral Potatoes (also called cheesy potatoes) are a cheesy hash brown casserole that makes the perfect warm side dish for any meal, holiday dinner, or potluck.",
    ingredients: `
      30 ounces frozen hash browns , diced or shredded will work, THAWED*
      2 cups sour cream
      10.5 ounce can cream of chicken soup (or homemade)
      10 Tablespoons butter , divided, melted
      1 teaspoon salt
      1/4 teaspoon freshly ground black pepper
      1 teaspoon dried minced onion
      2 cups shredded cheddar cheese
      2 cups corn flakes cereal
    `,
    instructions: `
      Allow potatoes to thaw in your fridge overnight, or spread them on a baking sheet and warm them in the oven at 200 degrees for about 20 minutes, until thawed.
      Preheat oven to 350 degrees F.
      Combine sour cream, cream of chicken soup, 6 Tablespoons of melted butter, salt, pepper and dried onion in a bowl. Mix well.
      Add potatoes and shredded cheese and stir to combine. Spoon mixture into a single layer in a 9x13'' pan.
      Add cornflakes to a large ziplock bag and crush gently with your hands or a rolling pin.
      Add remaining 4 tablespoons of melted butter to the crushed cornflakes and combine well. Sprinkle mixture over potatoes.
      Bake uncovered at 350 F for 40-50 minutes.
    `
  },
  {
    id: "6",
    userId: "6",
    title: "Tuna Noodle Caserole",
    description: "Campbell's® Condensed Cream of Mushroom Soup flavors a creamy sauce that is mixed with tuna, egg noodles and peas, topped with a crunchy bread crumb topping and baked to perfection.",
    ingredients: `
      2 (10.75 ounce) cans Campbell's® Condensed Cream of Mushroom Soup (regular or 25% Lower Sodium)
      1 cup milk
      2 cups frozen peas
      2 (10 ounce) cans tuna, drained
      4 cups hot cooked medium egg noodles
      2 tablespoons dry bread crumbs
      1 tablespoon butter, melted
    `,
    instructions: `
      Stir soup, milk, peas, tuna and noodles in 3-quart casserole.
      Bake at 400 degrees F for 30 minutes or until hot. Stir.
      Mix bread crumbs with butter in bowl and sprinkle over tuna mixture. Bake for 5 minutes more.
    `
  }
];

export default class RecipeModel {
  static getAll() {
    return recipes.sort((recipe1, recipe2) => {
      if (recipe1.title < recipe2.title) {
        return -1;
      }

      if (recipe1.title === recipe2.title) {
        return 0;
      }

      if (recipe1.title > recipe2.title) {
        return 1;
      }
    });
  }

  static getById(id) {
    return recipes.find(recipe => recipe.id === id);
  }
};