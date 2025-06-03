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
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.title ? 'border-destructive' : ''
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className={`w-full px-4 py-2 border rounded-md ${
              errors.price ? 'border-destructive' : ''
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-destructive">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-md ${
              errors.description ? 'border-destructive' : ''
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.category ? 'border-destructive' : ''
            }`}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-destructive">{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.image ? 'border-destructive' : ''
            }`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-destructive">{errors.image}</p>
          )}
        </div>

        {errors.submit && (
          <p className="text-sm text-destructive">{errors.submit}</p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:bg-secondary/90 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct 