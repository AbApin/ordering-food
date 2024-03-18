const { Schema, models, model, mongoose } = require('mongoose');

const ExtraPriceSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

const MenuItemSchema = new Schema(
  {
    name: { type: String },
    category: { type: String },
    description: { type: String },
    basePrice: { type: Number },
    image: { type: String },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true },
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
