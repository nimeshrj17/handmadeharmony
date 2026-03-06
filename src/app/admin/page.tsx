"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { getProducts, addProduct, deleteProduct, updateProduct, getReviews, deleteReview, uploadImage, getCategories, addCategory, deleteCategory, getClasses, addClass, deleteClass } from "@/lib/db";
import { Product, Review, ClassVideo } from "@/lib/types";
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

    const [classes, setClasses] = useState<ClassVideo[]>([]);
    const [newClassTitle, setNewClassTitle] = useState("");
    const [newClassUrl, setNewClassUrl] = useState("");

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
    const [imageFiles, setImageFiles] = useState<File[]>([]);
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
                fetchClasses();
            } else {
                setIsAuthenticated(false);
                setProducts([]);
                setReviews([]);
                setClasses([]);
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

    const fetchClasses = async () => {
        const data = await getClasses();
        setClasses(data);
    };

    // Extract YouTube ID to get thumbnail
    const getYouTubeThumbnail = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
        }
        return "";
    };

    const handleAddClass = async () => {
        if (!newClassTitle.trim() || !newClassUrl.trim()) {
            alert("Title and YouTube URL are required.");
            return;
        }

        const thumbnailUrl = getYouTubeThumbnail(newClassUrl);
        if (!thumbnailUrl) {
            alert("Invalid YouTube URL. Please provide a valid link.");
            return;
        }

        setLoading(true);
        try {
            await addClass({
                title: newClassTitle.trim(),
                youtubeUrl: newClassUrl.trim(),
                thumbnailUrl
            });
            setNewClassTitle("");
            setNewClassUrl("");
            fetchClasses();
        } catch (error) {
            console.error("Failed to add class", error);
            alert("Failed to add class. Check permissions.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClass = async (id: string) => {
        if (confirm("Are you sure you want to delete this class video?")) {
            try {
                await deleteClass(id);
                fetchClasses();
            } catch (error) {
                console.error("Failed to delete class", error);
            }
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

                if (imageFiles && imageFiles.length > 0) {
                    const uploadPromises = imageFiles.map(file => uploadImage(file));
                    const newUrls = await Promise.all(uploadPromises);
                    updates.images = [...(newProduct.images || []), ...newUrls];
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
                    images: newProduct.images || []
                }, imageFiles);
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
        setImageFiles([]);
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
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 border rounded-md px-3 bg-background">
                                                <Upload size={16} className="text-muted-foreground min-w-[16px]" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="flex-1 bg-transparent py-2 text-sm outline-none"
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            setImageFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                                                            e.target.value = ''; // Reset input so same file can be selected again
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {/* Previews */}
                                            {((newProduct.images?.length || 0) > 0 || imageFiles.length > 0) && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {newProduct.images?.map((url, i) => (
                                                        <div key={`existing-${i}`} className="relative w-16 h-16 rounded-md overflow-hidden border">
                                                            <img src={url} alt={`Existing ${i}`} className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                title="Remove existing image"
                                                                className="absolute top-0 right-0 bg-destructive text-destructive-foreground p-0.5 rounded-bl-md"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    const updatedImages = [...(newProduct.images || [])];
                                                                    updatedImages.splice(i, 1);
                                                                    setNewProduct({ ...newProduct, images: updatedImages });
                                                                }}
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {imageFiles.map((file, i) => (
                                                        <div key={`new-${i}`} className="relative w-16 h-16 rounded-md overflow-hidden border opacity-80">
                                                            <img src={URL.createObjectURL(file)} alt={`New ${i}`} className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                title="Remove selected file"
                                                                className="absolute top-0 right-0 bg-muted/80 text-foreground p-0.5 rounded-bl-md hover:bg-destructive hover:text-destructive-foreground"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    const updatedFiles = [...imageFiles];
                                                                    updatedFiles.splice(i, 1);
                                                                    setImageFiles(updatedFiles);
                                                                }}
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
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

                {/* Classes Section */}
                <div className="space-y-6 pt-8 border-t">
                    <h2 className="text-2xl font-bold font-heading">Classes (YouTube Videos)</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Add New Class</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Video Title (e.g., Crochet Basics)"
                                    value={newClassTitle}
                                    onChange={(e) => setNewClassTitle(e.target.value)}
                                />
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="YouTube URL (https://youtube.com/watch?v=...)"
                                        value={newClassUrl}
                                        onChange={(e) => setNewClassUrl(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button onClick={handleAddClass} disabled={loading || !newClassTitle.trim() || !newClassUrl.trim()}>
                                        <Plus size={16} className="mr-2" /> Add Video
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-muted-foreground">
                                <tr>
                                    <th className="p-4 font-medium w-32">Thumbnail</th>
                                    <th className="p-4 font-medium">Title</th>
                                    <th className="p-4 font-medium">URL</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {classes.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                            No classes added yet. Add a YouTube video above!
                                        </td>
                                    </tr>
                                ) : (
                                    classes.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-muted/10">
                                            <td className="p-4">
                                                <div className="w-24 h-16 rounded overflow-hidden bg-muted">
                                                    <img src={cls.thumbnailUrl} alt={cls.title} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="p-4 font-medium">{cls.title}</td>
                                            <td className="p-4">
                                                <a href={cls.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {cls.youtubeUrl.substring(0, 40)}...
                                                </a>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteClass(cls.id!)}>
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
