import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, maxLength: 100 },
    description: { type: String, trim: true, required: true },
    price: { type: Number, required: true, default: 0.0 },
    image: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        }
    },
    stock: { type: Number, maxLength: 5, default: 0 },
    seller: { type: String, required: true },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
        {
            user: { type: mongoose.Schema.ObjectId, ref: 'User' },
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            Comment: { type: String, required: true }
        }
    ],
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('ProductModel',productSchema,'products');