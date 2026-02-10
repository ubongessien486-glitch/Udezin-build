import React from 'react';
import { Unlock } from 'lucide-react';

const AdminDashboard = ({
    isAdmin,
    editingProject,
    editingProduct,
    setEditingProduct,
    setEditingProject,
    handleAddProduct,
    handleExportData,
    handlePushToSupabase,
    handlePullFromSupabase,
    uploading
}) => {
    if (!isAdmin) return null;

    return (
        <div id="admin-panel" className="relative z-40 mt-20 bg-gray-100 border-b-4 border-red-500 p-8 animate-slide-down shadow-xl">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#0B1C33] flex items-center gap-2">
                        <Unlock className="text-red-500" /> Admin Control Center <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Cloud Sync v2.0</span>
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={handleExportData} className="text-sm bg-[#0B1C33] text-white px-4 py-2 rounded-full hover:bg-[#D49D42] transition">
                            Export Data (JSON)
                        </button>
                        <div className="flex bg-white rounded-full border border-gray-300 overflow-hidden">
                            <button onClick={handlePushToSupabase} className="px-3 py-1 text-xs font-bold text-white bg-green-600 hover:bg-green-700 border-r border-green-700" title="Save to Cloud">
                                CLOUD SAVE
                            </button>
                            <button onClick={handlePullFromSupabase} className="px-3 py-1 text-xs font-bold text-[#0B1C33] hover:bg-gray-100" title="Load from Cloud">
                                LOAD
                            </button>
                        </div>
                        <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full flex items-center">Secure Mode Active</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {editingProject
                                    ? `Edit Project: ${editingProject.title}`
                                    : editingProduct
                                        ? `Edit: ${editingProduct.name}`
                                        : "Add New Material"
                                }
                            </h2>
                            {(editingProduct || editingProject) && (
                                <button
                                    onClick={() => {
                                        setEditingProduct(null);
                                        setEditingProject(null);
                                    }}
                                    className="text-sm text-red-500 hover:text-red-700 underline"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <input
                                name="name"
                                defaultValue={editingProject ? editingProject.title : editingProduct?.name}
                                key={editingProject ? `proj-${editingProject.id}` : editingProduct ? `prod-${editingProduct.id}` : 'new'}
                                required
                                placeholder={editingProject ? "Project Title" : "Product Name"}
                                className="w-full p-3 border border-gray-200 rounded focus:border-[#0B1C33] outline-none"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {editingProject ? (
                                    <input
                                        name="location_status"
                                        defaultValue={editingProject.location}
                                        key={`loc-${editingProject.id}`}
                                        placeholder="Location / Status"
                                        className="w-full p-3 border border-gray-200 rounded"
                                    />
                                ) : (
                                    <select
                                        name="category"
                                        defaultValue={editingProduct?.category}
                                        key={editingProduct ? `${editingProduct.id}-cat` : 'new-cat'}
                                        className="w-full p-3 border border-gray-200 rounded bg-white"
                                    >
                                        <option>Interior</option>
                                        <option>Exterior</option>
                                        <option>Wall Decor</option>
                                        <option>Accessories</option>
                                    </select>
                                )}

                                {!editingProject && (
                                    <input
                                        name="price"
                                        type="number"
                                        defaultValue={editingProduct?.price}
                                        key={editingProduct ? `${editingProduct.id}-price` : 'new-price'}
                                        required
                                        placeholder="Price (₦)"
                                        className="w-full p-3 border border-gray-200 rounded"
                                    />
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Image</label>
                                <input name="imageFile" type="file" accept="image/*" className="w-full p-2 border border-gray-200 rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0B1C33] file:text-white hover:file:bg-[#D49D42]" />
                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>
                                <input name="image" placeholder="Paste Image URL instead" defaultValue={editingProduct?.image?.startsWith('http') ? editingProduct.image : ''} className="w-full p-3 border border-gray-200 rounded" />
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className={`w-full py-3 font-bold transition flex justify-center items-center gap-2 ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0B1C33] hover:bg-[#D49D42] text-white'}`}
                            >
                                {uploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    editingProduct ? "UPDATE MATERIAL" : "ADD TO INVENTORY"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                        <p className="text-center">Project Gallery Uploads<br />(Coming Soon in v2.0)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
