import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectAllProducts, updateProduct } from '../features/products/productsSlice'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const product = products.find(p => p.id === parseInt(id))

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        image: product.image,
      })
    }
  }, [product])

  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Product not found</div>
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
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await dispatch(updateProduct({
        id: product.id,
        product: {
          ...formData,
          price: parseFloat(formData.price),
        },
      })).unwrap()
      navigate(`/product/${product.id}`)
    } catch (error) {
      setErrors({ submit: 'Failed to update product. Please try again.' })
    } finally {
      setIsSubmitting(false)
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
    <>
      {/* Internal CSS for error styles */}
      <style>{`
        .error-border {
          border: 2px solid #e53e3e; /* red-600 */
        }
        .error-text {
          color: #e53e3e;
          margin-top: 0.25rem;
          font-size: 0.875rem;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>Edit Product</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error-border' : ''}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                ...(errors.title ? { borderColor: '#e53e3e', borderWidth: '2px' } : {}),
              }}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className={errors.price ? 'error-border' : ''}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                ...(errors.price ? { borderColor: '#e53e3e', borderWidth: '2px' } : {}),
              }}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={errors.description ? 'error-border' : ''}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                ...(errors.description ? { borderColor: '#e53e3e', borderWidth: '2px' } : {}),
              }}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error-border' : ''}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                ...(errors.category ? { borderColor: '#e53e3e', borderWidth: '2px' } : {}),
              }}
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="image" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={errors.image ? 'error-border' : ''}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                ...(errors.image ? { borderColor: '#e53e3e', borderWidth: '2px' } : {}),
              }}
            />
            {errors.image && <p className="error-text">{errors.image}</p>}
          </div>

          {errors.submit && (
            <p className="error-text" style={{ fontWeight: '600', textAlign: 'center' }}>
              {errors.submit}
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                backgroundColor: '#3182ce', // blue-600
                color: 'white',
                padding: '0.75rem',
                borderRadius: '6px',
                fontWeight: '600',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => !isSubmitting && (e.target.style.backgroundColor = '#2b6cb0')} // blue-700 on hover
              onMouseLeave={e => !isSubmitting && (e.target.style.backgroundColor = '#3182ce')}
            >
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/product/${product.id}`)}
              style={{
                flex: 1,
                backgroundColor: '#718096', // gray-600
                color: 'white',
                padding: '0.75rem',
                borderRadius: '6px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = '#4a5568')} // gray-700 on hover
              onMouseLeave={e => (e.target.style.backgroundColor = '#718096')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProduct
