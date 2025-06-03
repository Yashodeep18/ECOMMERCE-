import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../features/products/productsSlice'

function AddProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })
  const [errors, setErrors] = useState({})

  // Fallback inline styles for custom colors
  const colors = {
    primary: '#1d4ed8',
    primaryForeground: '#ffffff',
    secondary: '#6b7280', // Example secondary color (gray-500)
    secondaryForeground: '#ffffff',
    destructive: '#dc2626', // red-600 for errors
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.price) newErrors.price = 'Price is required'
    if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number'
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await dispatch(addProduct({
          ...formData,
          price: parseFloat(formData.price),
        })).unwrap()
        navigate('/')
      } catch (error) {
        setErrors({ submit: 'Failed to add product. Please try again.' })
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8" style={{ color: colors.primary }}>
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2" style={{ color: colors.secondary }}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            style={{
              borderColor: errors.title ? colors.destructive : '#d1d5db' // default border gray-300
            }}
          />
          {errors.title && (
            <p className="mt-1 text-sm" style={{ color: colors.destructive }}>{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2" style={{ color: colors.secondary }}>
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full px-4 py-2 border rounded-md"
            style={{
              borderColor: errors.price ? colors.destructive : '#d1d5db'
            }}
          />
          {errors.price && (
            <p className="mt-1 text-sm" style={{ color: colors.destructive }}>{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2" style={{ color: colors.secondary }}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md"
            style={{
              borderColor: errors.description ? colors.destructive : '#d1d5db'
            }}
          />
          {errors.description && (
            <p className="mt-1 text-sm" style={{ color: colors.destructive }}>{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2" style={{ color: colors.secondary }}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            style={{
              borderColor: errors.category ? colors.destructive : '#d1d5db'
            }}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm" style={{ color: colors.destructive }}>{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2" style={{ color: colors.secondary }}>
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            style={{
              borderColor: errors.image ? colors.destructive : '#d1d5db'
            }}
          />
          {errors.image && (
            <p className="mt-1 text-sm" style={{ color: colors.destructive }}>{errors.image}</p>
          )}
        </div>

        {errors.submit && (
          <p className="text-sm" style={{ color: colors.destructive }}>{errors.submit}</p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            style={{
              backgroundColor: colors.primary,
              color: colors.primaryForeground,
            }}
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            style={{
              backgroundColor: colors.secondary,
              color: colors.secondaryForeground,
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
