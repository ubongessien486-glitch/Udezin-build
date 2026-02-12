import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabase';

import { INITIAL_PRODUCTS, INITIAL_PROJECTS } from './data';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AdminDashboard from './components/AdminDashboard';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));

const App = () => {
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false); // Start false to show initial content immediately

  // --- ADMIN FUNCTIONS ---
  const [uploading, setUploading] = useState(false);

  // Helper to compress image
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Compress to JPEG at 70% quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // FETCH DATA FROM SUPABASE
  const fetchData = async () => {
    try {
      // Don't set loading=true here to avoid flashing the loader
      // Fetch Products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (productsError) throw productsError;

      // Fetch Projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (projectsError) throw projectsError;

      // Update state only if we got data
      if (productsData && productsData.length > 0) {
        setProducts(productsData);
      }

      if (projectsData && projectsData.length > 0) {
        setProjects(projectsData);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      // No need to fallback, we started with initial data
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.target);
    const file = formData.get('imageFile');
    const existingImageUrl = formData.get('image');

    // Helper to upload image to Supabase Storage
    const uploadImage = async (imageFile) => {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        return data.publicUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image to cloud storage.");
        return null;
      }
    };

    // Helper to process the final logic
    const processSubmission = async (finalImageUrl) => {
      try {
        // --- PROJECT EDITING LOGIC ---
        if (editingProject) {
          const { error } = await supabase
            .from('projects')
            .update({
              title: formData.get('name'),
              location: formData.get('location_status'),
              image: finalImageUrl || editingProject.image
            })
            .eq('id', editingProject.id);

          if (error) throw error;
          alert("Project Updated!");
          setEditingProject(null);
        }
        // --- PRODUCT EDITING LOGIC ---
        else if (editingProduct) {
          const { error } = await supabase
            .from('products')
            .update({
              name: formData.get('name'),
              price: Number(formData.get('price')),
              category: formData.get('category'),
              image: finalImageUrl || editingProduct.image
            })
            .eq('id', editingProduct.id);

          if (error) throw error;
          alert("Product Updated!");
          setEditingProduct(null);
        }
        // --- ADD NEW PRODUCT LOGIC ---
        else {
          const newProduct = {
            id: Date.now(),
            name: formData.get('name'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            image: finalImageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
            stock: "In Stock"
          };

          const { error } = await supabase
            .from('products')
            .insert([newProduct]);

          if (error) throw error;
          alert("Material Added Successfully!");
        }

        // Refresh data after any operation
        fetchData();
        e.target.reset();

      } catch (error) {
        console.error("Error saving data:", error);
        alert(`Error: ${error.message || "Failed to save data"}`);
      } finally {
        setUploading(false);
      }
    };

    // --- IMAGE PROCESSING ---
    if (file && file.size > 0) {
      try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert("Please upload a valid image file");
          setUploading(false);
          return;
        }

        // Upload to Supabase Storage
        const publicUrl = await uploadImage(file);
        if (publicUrl) {
          processSubmission(publicUrl);
        } else {
          setUploading(false);
        }
      } catch (err) {
        console.error("Image processing error:", err);
        alert("Error processing image. Please try a different file.");
        setUploading(false);
      }
    } else {
      processSubmission(existingImageUrl || null);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditingProject(null); // Ensure we aren't editing a project
    document.getElementById('admin-panel').scrollIntoView({ behavior: 'smooth' });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setEditingProduct(null); // Ensure we aren't editing a product
    document.getElementById('admin-panel').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this material?")) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;

        if (editingProduct && editingProduct.id === id) {
          setEditingProduct(null);
        }
        fetchData(); // Refresh UI
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete.");
      }
    }
  };

  const handleExportData = () => {
    // Export BOTH products and projects
    const exportData = {
      products: products,
      projects: projects
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'udezein_data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // --- CLOUD SYNC FUNCTIONS ---
  const handlePushToSupabase = async () => {
    if (!window.confirm("CAUTION: This will OVERWRITE the cloud database with your current local data. Continue?")) return;

    try {
      setLoading(true);
      // Upsert Products
      const { error: prodError } = await supabase.from('products').upsert(products);
      if (prodError) throw prodError;

      // Upsert Projects
      const { error: projError } = await supabase.from('projects').upsert(projects);
      if (projError) throw projError;

      alert("âœ… SUCCESS: Data saved to Cloud Database!");
    } catch (err) {
      console.error(err);
      alert("âŒ ERROR: Could not save to cloud. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handlePullFromSupabase = async () => {
    if (!window.confirm("CAUTION: This will OVERWRITE your local view with data from the cloud. Continue?")) return;
    fetchData(); // Re-fetch from Supabase
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0B1C33] font-sans selection:bg-[#D49D42] selection:text-white">

        <Navbar
          cartCount={cart.length}
          setIsCartOpen={setIsCartOpen}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />

        {/* Global Admin Dashboard - Appears above content when needed */}
        <AdminDashboard
          isAdmin={isAdmin}
          editingProject={editingProject}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          setEditingProject={setEditingProject}

          handleAddProduct={handleAddProduct}
          handleExportData={handleExportData}
          handlePushToSupabase={handlePushToSupabase}
          handlePullFromSupabase={handlePullFromSupabase}
          uploading={uploading}
        />

        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="text-2xl font-bold text-[#D49D42] animate-pulse">Loading Udezin...</div>
          </div>
        ) : (
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="text-2xl font-bold text-[#D49D42] animate-pulse">Loading Udezin...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={
                <Home
                  projects={projects}
                  isAdmin={isAdmin}
                  handleEditProject={handleEditProject}
                />
              } />
              <Route path="/products" element={
                <Products
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  isAdmin={isAdmin}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={handleDeleteProduct}
                  addToCart={addToCart}
                />
              } />
            </Routes>
          </Suspense>
        )}

        <CartSidebar
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          removeFromCart={removeFromCart}
        />

        <Footer />

      </div>
    </Router>
  );
};

export default App;

