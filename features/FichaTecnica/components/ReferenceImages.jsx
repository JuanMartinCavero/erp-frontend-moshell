import React, { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import api from '../../../services/api';

export default function ReferenceImages({ images, techSheetId, isEditing, onRefresh }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Procesar imágenes independientemente del formato
  const getImageList = () => {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const imageList = getImageList();

  // ✅ Manejar selección de archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Subir imagen
  const handleUpload = async () => {
    if (!selectedFile || !techSheetId) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await api.post(`/technical-sheets/${techSheetId}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        setSelectedFile(null);
        setPreview(null);
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  // ✅ Eliminar imagen
  const handleDeleteImage = async (imageUrl) => {
    if (!confirm('¿Estás seguro de eliminar esta imagen?')) return;
    
    try {
      await api.delete(`/technical-sheets/${techSheetId}/remove-image`, {
        data: { image_url: imageUrl }
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      alert('Error al eliminar la imagen');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Reference Images</h3>
      <div className="grid grid-cols-4 gap-4">
        {/* ✅ Mostrar imágenes existentes */}
        {imageList.map((img, idx) => (
          <div key={idx} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group">
            <img 
              src={img} 
              className="w-full h-full object-cover" 
              alt={`Reference ${idx + 1}`} 
            />
            {isEditing && (
              <button
                onClick={() => handleDeleteImage(img)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {/* ✅ Botón de subida (solo si está en modo edición y no hay archivo seleccionado) */}
        {isEditing && !selectedFile && (
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer">
            <Upload className="w-6 h-6 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}

        {/* ✅ Vista previa de la imagen seleccionada */}
        {isEditing && selectedFile && preview && (
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
            <img 
              src={preview} 
              className="w-full h-full object-cover" 
              alt="Preview" 
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-[#42526E] text-white px-3 py-1 rounded text-sm hover:bg-[#344563] disabled:opacity-50 flex items-center gap-2"
              >
                {uploading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                Subir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}