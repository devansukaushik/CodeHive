import mongoose from "mongoose";   //The mongoose module is imported to define the schema and create a model.

const userSchema = mongoose.Schema({      //The mongoose.Schema function is used to define the structure of the document for the "User" model.
  name: { type: String, required: true },    //name: The user's name. It is a required field of type String.
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },   // The date when the user joined
});

export default mongoose.model("User", userSchema);
//The mongoose.model function is used to create a model named "User" based on the defined schema.


//This schema defines the structure of user documents in the MongoDB collection, specifying the types of data each field should contain and any additional constraints (e.g., required fields). It serves as a blueprint for creating, querying, and updating user documents in the MongoDB database.