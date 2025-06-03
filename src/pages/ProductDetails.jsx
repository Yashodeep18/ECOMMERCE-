import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectAllProducts, deleteProduct } from '../features/products/productsSlice'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Product not found</div>
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(product.id))
      navigate('/')
    }
  }

  return (
    <>
      {/* Internal CSS for button colors */}
      <style>{`
        .btn-primary {
          background-color: #3182ce; /* blue-600 */
          color: white;
          transition: background-color 0.2s ease;
          border-radius: 0.375rem; /* rounded-md */
          padding: 0.5rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }
        .btn-primary:hover {
          background-color: #2b6cb0; /* blue-700 */
        }
        .btn-destructive {
          background-color: #e53e3e; /* red-600 */
          color: white;
          transition: background-color 0.2s ease;
          border-radius: 0.375rem; /* rounded-md */
          padding: 0.5rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }
        .btn-destructive:hover {
          background-color: #c53030; /* red-700 */
        }
      `}</style>

      <div className="max-w-4xl mx-auto" style={{ padding: '1rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square relative" style={{ minHeight: '300px' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ objectFit: 'contain', width: '100%', height: '100%', padding: '1rem' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>{product.title}</h1>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3182ce' }}>
              ${product.price}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#718096', textTransform: 'capitalize' }}>
              Category: {product.category}
            </p>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Description</h2>
              <p style={{ color: '#718096' }}>{product.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
              <button
                onClick={() => navigate(`/edit/${product.id}`)}
                className="btn-primary"
              >
                Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="btn-destructive"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
