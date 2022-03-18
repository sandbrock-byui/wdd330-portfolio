const recipes = [
  {
    id: "1",
    userId: "1",
    title: "Flour Tortillas"
  },
  {
    id: "2",
    userId: "2",
    title: "Apple Pie"
  },
  {
    id: "3",
    userId: "3",
    title: "Smoked Ribs"
  },
  {
    id: "4",
    userId: "4",
    title: "Chicken Tacos"
  },
  {
    id: "5",
    userId: "5",
    title: "Funeral Potatoes"
  },
  {
    id: "6",
    userId: "6",
    title: "Tuna Noodle Caserole"
  }
];

export default class RecipeModel {
  static getAllRecipes() {
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
};