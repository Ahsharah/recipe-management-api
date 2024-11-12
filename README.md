# 🍳 Recipe Management API

A deliciously crafted API for managing recipes, categories, and reviews! Built with Node.js, Express, and MongoDB.

## 🌟 Features

- Complete CRUD operations for recipes, categories, and reviews
- Data validation to keep our recipes tasty and accurate
- MongoDB indexing for speedy queries
- Proper data modeling with relationships between collections
- Sample data included - ready to cook! 

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Your favorite API testing tool (we recommend using curl commands because they're cool!)

### Installation
1. Clone this tasty repo:
```bash
git clone [your-repo-url]

Install the ingredients (dependencies):

bashCopynpm install

Create your .env file and add your secret sauce:

CopyPORT=3000
MONGODB_URI=mongodb://localhost:27017/recipe-management

Fire up the kitchen:

bashCopynpm run dev
🔥 API Endpoints
Recipes
MethodEndpointDescriptionGET/api/recipesGet all recipesGET/api/recipes/:idGet a specific recipePOST/api/recipesCreate a new recipePUT/api/recipes/:idUpdate a recipeDELETE/api/recipes/:idDelete a recipe
Categories
MethodEndpointDescriptionGET/api/categoriesGet all categoriesGET/api/categories/:idGet a specific categoryPOST/api/categoriesCreate a new categoryPUT/api/categories/:idUpdate a categoryDELETE/api/categories/:idDelete a category
Reviews
MethodEndpointDescriptionGET/api/reviewsGet all reviewsGET/api/reviews/:idGet a specific reviewPOST/api/reviewsCreate a new reviewPUT/api/reviews/:idUpdate a reviewDELETE/api/reviews/:idDelete a review
📝 Data Models
Recipe Schema
javascriptCopy{
    title: String (required),
    ingredients: [{
        name: String,
        amount: String,
        unit: String
    }],
    instructions: [String],
    prepTime: Number,
    cookTime: Number,
    difficulty: String
}
Category Schema
javascriptCopy{
    name: String (required, unique),
    description: String
}
Review Schema
javascriptCopy{
    recipeId: ObjectId (required),
    rating: Number (1-5),
    comment: String,
    userName: String
}
🧪 Testing
Test the API using curl commands or your preferred API testing tool. Here's a taste:
bashCopy# Create a recipe
curl -X POST http://localhost:3000/api/recipes \
-H "Content-Type: application/json" \
-d '{
    "title": "Chocolate Chip Cookies",
    "ingredients": [
        {"name": "flour", "amount": "2", "unit": "cups"},
        {"name": "chocolate chips", "amount": "1", "unit": "cup"}
    ],
    "instructions": ["Mix ingredients", "Bake at 350F"],
    "prepTime": 15,
    "cookTime": 12,
    "difficulty": "Easy"
}'
🏗️ Project Structure
Copyrecipe-management-api/
├── src/
│   ├── models/
│   │   ├── Recipe.js
│   │   ├── Category.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── recipes.js
│   │   ├── categories.js
│   │   └── reviews.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
🔍 Validation & Indexing

Implemented MongoDB validation rules for data consistency
Added indexes for frequently queried fields
Includes custom validators for recipes, categories, and reviews

🎯 Technical Requirements Met
✅ Three different data collections
✅ Data modeling practices
✅ Complete CRUD operations
✅ MongoDB indexes
✅ Validation rules
✅ Sample data (5+ documents per collection)
Created with 💖 and JavaScript by Alexandria. W
