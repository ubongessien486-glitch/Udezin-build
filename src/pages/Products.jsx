import React, { useEffect } from 'react';
import MaterialCatalog from '../components/MaterialCatalog';

const Products = ({
    products,
    activeCategory,
    setActiveCategory,
    isAdmin,
    handleEditProduct,
    handleDeleteProduct,
    addToCart
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20"> {/* Add padding for fixed navbar */}
            <MaterialCatalog
                products={products}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                isAdmin={isAdmin}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                addToCart={addToCart}
            />
        </div>
    );
};

export default Products;

