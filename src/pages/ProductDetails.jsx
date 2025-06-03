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
    return <div className="text-center">Product not found</div>
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(product.id))
      navigate('/')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square relative">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full p-4"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-bold text-primary">${product.price}</p>
          <p className="text-sm text-muted-foreground capitalize">
            Category: {product.category}
          </p>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground px-6 py-2 rounded-md hover:bg-destructive/90 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 