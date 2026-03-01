"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { getProducts, addProduct, deleteProduct, updateProduct, getReviews, deleteReview, uploadImage, getCategories, addCategory, deleteCategory } from "@/lib/db";
import { Product, Review } from "@/lib/types";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { AddReviewDialog } from "@/components/AddReviewDialog";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: "",
        price: 0,
        category: "", // Default to empty, will be set on load
        description: "",
        inStock: true,
        isFeatured: false,
        hasFreePattern: false,
        freePatternDetails: "",
        availableColors: []
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    // Initial Fetch & Auth Listener
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
                fetchProducts();
                fetchReviews();
                fetchCategories();
            } else {
                setIsAuthenticated(false);
                setProducts([]);
                setReviews([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const fetchReviews = async () => {
        const data = await getReviews();
        setReviews(data);
    };

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
        // Set default category for new product if not set
        if (!newProduct.category && data.length > 0) {
            setNewProduct(prev => ({ ...prev, category: data[0] }));
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        await addCategory(newCategoryName.trim());
        setNewCategoryName("");
        fetchCategories();
    };

    const handleDeleteCategory = async (name: string) => {
        if (confirm(`Are you sure you want to delete category "${name}"?`)) {
            await deleteCategory(name);
            fetchCategories();
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            // Auth listener will handle state update
        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your email and password.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const auth = getAuth(app);
        await auth.signOut();
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!newProduct.name || !newProduct.price) {
                alert("Name and Price are required");
                setLoading(false);
                return;
            }

            await addProduct({
                name: newProduct.name!,
                slug: newProduct.name!.toLowerCase().replace(/\s+/g, '-'),
                price: Number(newProduct.price),
                description: newProduct.description || "",
                category: newProduct.category || "Toddler Treasures",
                availableColors: newProduct.availableColors || [],
                isFeatured: newProduct.isFeatured || false,
                inStock: newProduct.inStock || true,
                hasFreePattern: newProduct.hasFreePattern || false,
                freePatternDetails: newProduct.freePatternDetails || "",
                images: []
            }, imageFile || undefined);

            await fetchProducts();
            setIsAdding(false);
            setNewProduct({ name: "", price: 0, category: "Plushies", description: "", inStock: true });
            setImageFile(null);
        } catch (error: any) {
            console.error(error);
            if (error.code === 'permission-denied') {
                alert("You do not have permission to add products.");
            } else {
                alert("Failed to add product");
            }
        }
        setLoading(false);
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!newProduct.name || !newProduct.price) {
                alert("Name and Price are required");
                setLoading(false);
                return;
            }

            if (editingProductId) {
                const updates: Partial<Product> = {
                    ...newProduct,
                    category: newProduct.category,
                };

                if (imageFile) {
                    const imageUrl = await uploadImage(imageFile);
                    updates.images = [imageUrl];
                }

                await updateProduct(editingProductId, updates);
            } else {
                await addProduct({
                    name: newProduct.name!,
                    slug: newProduct.name!.toLowerCase().replace(/\s+/g, '-'),
                    price: Number(newProduct.price),
                    description: newProduct.description || "",
                    category: newProduct.category!,
                    availableColors: newProduct.availableColors || [],
                    isFeatured: newProduct.isFeatured || false,
                    inStock: newProduct.inStock || true,
                    hasFreePattern: newProduct.hasFreePattern || false,
                    freePatternDetails: newProduct.freePatternDetails || "",
                    images: []
                }, imageFile || undefined);
            }

            await fetchProducts();
            cancelEdit();
        } catch (error: any) {
            console.error(error);
            if (error.code === 'permission-denied') {
                alert("Permission denied.");
            } else {
                alert("Failed to save product");
            }
        }
        setLoading(false);
    };

    const handleEdit = (product: Product) => {
        setNewProduct(product);
        setEditingProductId(product.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setIsAdding(false);
        setEditingProductId(null);
        setNewProduct({
            name: "",
            price: 0,
            category: categories.length > 0 ? categories[0] : "",
            description: "",
            inStock: true,
            isFeatured: false,
            hasFreePattern: false,
            freePatternDetails: "",
            availableColors: []
        });
        setImageFile(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                await fetchProducts();
            } catch (error: any) {
                if (error.code === 'permission-denied') {
                    alert("You do not have permission to delete products.");
                } else {
                    alert("Failed to delete product");
                }
            }
        }
    };

    const handleDeleteReview = async (id: string) => {
        if (confirm("Delete this review?")) {
            try {
                await deleteReview(id);
                fetchReviews();
            } catch (error: any) {
                alert("Failed to delete review");
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Categories Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-heading">Category Management</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Manage Categories</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <Input
                                    placeholder="New Category Name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="max-w-sm"
                                />
                                <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
                                    <Plus size={16} className="mr-2" /> Add Category
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <div key={cat} className="flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                        {cat}
                                        <button onClick={() => handleDeleteCategory(cat)} className="text-muted-foreground hover:text-destructive transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Products Section */}
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold font-heading">Product Management</h1>
                        <div className="flex gap-4">
                            <Button
                                variant="secondary"
                                onClick={async () => {
                                    if (confirm("This will add 5 new products to your database. Continue?")) {
                                        setLoading(true);
                                        const productsToSeed = [
                                            {
                                                name: "Red Bird Keychain",
                                                slug: "red-bird-keychain",
                                                price: 299,
                                                description: "A vibrant red crochet bird keychain with white eyes, perfect for adding a pop of color to your keys or bag.",
                                                images: ["/images/product-red-bird.jpg"],
                                                category: "Bag & Key Charms",
                                                availableColors: ["Red"],
                                                isFeatured: true,
                                                inStock: true
                                            },
                                            {
                                                name: "Grey Bear with Heart",
                                                slug: "grey-bear-with-heart",
                                                price: 499,
                                                description: "An adorable grey crochet bear holding a pink heart, a sweet gift for someone special.",
                                                images: ["/images/product-grey-bear.jpg"],
                                                category: "Toddler Treasures",
                                                availableColors: ["Grey"],
                                                isFeatured: true,
                                                inStock: true
                                            },
                                            {
                                                name: "Elephant Plushie",
                                                slug: "elephant-plushie",
                                                price: 799,
                                                description: "A cute and soft crochet elephant plushie, perfect for little hands to hold and play with.",
                                                images: ["/images/product-elephant.jpg"],
                                                category: "Toddler Treasures",
                                                availableColors: ["Blue"],
                                                isFeatured: true,
                                                inStock: true
                                            },
                                            {
                                                name: "Bala Krishna Doll",
                                                slug: "bala-krishna-doll",
                                                price: 1599,
                                                description: "A beautifully detailed crochet doll of baby Krishna with his butter pot, crafted with devotion.",
                                                images: ["/images/product-krishna.jpg"],
                                                category: "Comfort Creations",
                                                availableColors: ["Light Blue"],
                                                isFeatured: true,
                                                inStock: true
                                            },
                                            {
                                                name: "Captain America Doll",
                                                slug: "captain-america-doll",
                                                price: 1299,
                                                description: "A hero doll for your little one! Handcrafted Captain America crochet doll with shield.",
                                                images: ["/images/product-captain-america.jpg"],
                                                category: "Comfort Creations",
                                                availableColors: ["Blue", "Red", "White"],
                                                isFeatured: false,
                                                inStock: true
                                            }
                                        ];

                                        try {
                                            for (const p of productsToSeed) {
                                                await addProduct(p);
                                            }
                                            alert("Seeding successful!");
                                            fetchProducts();
                                        } catch (e) {
                                            console.error(e);
                                            alert("Seeding failed. Check console.");
                                        } finally {
                                            setLoading(false);
                                        }
                                    }
                                }}
                                disabled={loading}
                            >
                                Seed New Products
                            </Button>
                            <Button onClick={() => { cancelEdit(); setIsAdding(true); }} className="gap-2">
                                <Plus size={16} /> Add Product
                            </Button>
                            <Button variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>

                    {isAdding && (
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{editingProductId ? "Edit Product" : "New Product"}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={cancelEdit}>
                                    <X size={20} />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSaveProduct} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Product Name"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            required
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Price (₹)"
                                            value={newProduct.price || ""}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                            required
                                        />
                                        <select
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        >
                                            <option value="" disabled>Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center gap-2 border rounded-md px-3">
                                            <Upload size={16} className="text-muted-foreground" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="flex-1 bg-transparent py-2 text-sm outline-none"
                                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            />
                                        </div>
                                    </div>
                                    <Textarea
                                        placeholder="Description"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    />

                                    {/* Free Pattern Section */}
                                    <div className="space-y-4 border p-4 rounded-md bg-muted/20">
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <input
                                                type="checkbox"
                                                checked={newProduct.hasFreePattern || false}
                                                onChange={(e) => setNewProduct({ ...newProduct, hasFreePattern: e.target.checked })}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            Include Free Pattern
                                        </label>

                                        {newProduct.hasFreePattern && (
                                            <Textarea
                                                placeholder="Enter pattern details here..."
                                                value={newProduct.freePatternDetails || ""}
                                                onChange={(e) => setNewProduct({ ...newProduct, freePatternDetails: e.target.value })}
                                                className="min-h-[100px]"
                                            />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={newProduct.inStock}
                                                onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                                            />
                                            In Stock
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={newProduct.isFeatured}
                                                onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                                            />
                                            Featured
                                        </label>
                                    </div>
                                    <Button type="submit" disabled={loading} className="w-full">
                                        {loading ? "Saving..." : editingProductId ? "Update Product" : "Save Product"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-muted-foreground">
                                <tr>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Stock</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                            No products found. Add one to get started!
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="hover:bg-muted/10">
                                            <td className="p-4 font-medium">{product.name}</td>
                                            <td className="p-4">{product.category}</td>
                                            <td className="p-4">₹{product.price}</td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={async () => {
                                                            await updateProduct(product.id, { inStock: !product.inStock });
                                                            fetchProducts();
                                                        }}
                                                        className={`px-2 py-1 rounded-full text-xs font-bold border ${product.inStock ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}
                                                    >
                                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                                    </button>

                                                    <button
                                                        onClick={async () => {
                                                            await updateProduct(product.id, { isFeatured: !product.isFeatured });
                                                            fetchProducts();
                                                        }}
                                                        className={`px-2 py-1 rounded-full text-xs font-bold border ${product.isFeatured ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-muted text-muted-foreground border-transparent"}`}
                                                    >
                                                        {product.isFeatured ? "Featured" : "Not Featured"}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right space-x-2 flex justify-end">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                                                    <Edit size={16} className="text-blue-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                                                    <Trash2 size={16} className="text-destructive" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="space-y-6 pt-8 border-t">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold font-heading">Reviews Management</h2>
                        <AddReviewDialog
                            onReviewAdded={fetchReviews}
                            trigger={<Button variant="outline" className="gap-2"><Plus size={16} /> Add Review</Button>}
                        />
                    </div>

                    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-muted-foreground">
                                <tr>
                                    <th className="p-4 font-medium">Customer</th>
                                    <th className="p-4 font-medium">Rating</th>
                                    <th className="p-4 font-medium">Review</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {reviews.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                            No reviews yet.
                                        </td>
                                    </tr>
                                ) : (
                                    reviews.map((review) => (
                                        <tr key={review.id} className="hover:bg-muted/10">
                                            <td className="p-4 font-medium">{review.name}</td>
                                            <td className="p-4">{review.rating} / 5</td>
                                            <td className="p-4 truncate max-w-xs">{review.reviewText}</td>
                                            <td className="p-4 text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                                                    <Trash2 size={16} className="text-destructive" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
