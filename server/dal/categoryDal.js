// Local DB for Categories
class CategoryDal {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const categorySchema = new mongoose.Schema({
            categoryName: String,
            books: [
                {
                    title: String,
                    author: String,
                    price: Number,
                    seller: String,
                }
            ]
        });
        this.categoryModel = mongoose.model("category", categorySchema);
    }
    async getCategories() {
        try {
            return await this.categoryModel.find({});
        } catch (error) {
            console.error("getCategories:", error.message);
            return {};
        }
    }
    async getCategory(id) {
        try {
            return await this.categoryModel.findById(id);
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }
    async getCategoryByName(catName) {
        try {
            return await this.categoryModel.find({ categoryName: catName });
        } catch (error) {
            console.error("getCategoryByName:", error.message);
            return {};
        }
    }
    async AddACategory(newCategory){
        try {
            let category = new this.categoryModel(newCategory);
            return category.save();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async deleteCategory(catId) {
        return await this.categoryModel.findByIdAndRemove(catId);
    }
    async AddABook(categoryId, book) {
        const category = await this.getCategory(categoryId);
        const newBook = {
            title: book.title,
            author: book.author,
            price: book.price,
            seller: book.seller,
        };
        category.books.push(newBook);
        return category.save();
    }
    async bootstrap(count = 5) {
        let j = (await this.getCategories()).length;
        console.log("Category collection size:", j);
        if (j === 0) {
            let promises = [];
            const categoryNames = [
                "Science",
                "Maths",
                "Physics",
                "History",
                "Catalan",
            ];
            const bookTitles = [
                "ESO 1",
                "ESO 2",
                "ESO 3",
                "ESO 4",
                "ESO 5",
            ];
            const authors = [
                "Merce Griño",
                "Aleix Oganissian",
                "Merce Rodoreda",
                "Enric Pujol",
                "Teresa Tico",
            ];
            const seller = [
                "Avia Joana",
                "Claudia Shifler",
                "Pol Tarrats",
                "Sergio Gil",
                "La mare que em va parir",
            ];

            for (let i = 0; i < count; i++) {
                let category = new this.categoryModel({
                    categoryName: categoryNames[i],
                    books: [
                        {
                            title: bookTitles[0],
                            author: authors[2],
                            price: 149,
                            seller: seller[4]
                        },
                        {
                            title: bookTitles[3],
                            author: authors[2],
                            price: 99,
                            seller: seller[2]
                        },
                        {
                            title: bookTitles[5],
                            author: authors[1],
                            price: 89,
                            seller: seller[1]
                        },
                        {
                            title: bookTitles[4],
                            author: authors[2],
                            price: 39,
                            seller: seller[2]
                        },
                        {
                            title: bookTitles[2],
                            author: authors[4],
                            price: 199,
                            seller: seller[4]
                        }
                    ]
                });
                promises.push(category.save());
            }

            return Promise.all(promises);
        }
    }
}

module.exports = mongoose => new CategoryDal(mongoose);
