import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  setSearchFilter,
  setCategoryFilter,
  setPriceRangeFilter,
} from '../features/products/productsSlice'

function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  const handleSearchChange = (e) => {
    dispatch(setSearchFilter(e.target.value))
  }

  const handleCategoryChange = (e) => {
    dispatch(setCategoryFilter(e.target.value))
  }

  const handlePriceRangeChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number)
    dispatch(setPriceRangeFilter({ min, max }))
  }

  if (status === 'loading') {
    return <div className="text-center">Loading...</div>
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearchChange}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <select
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <select
            onChange={handlePriceRangeChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="0,1000">All Prices</option>
            <option value="0,50">Under $50</option>
            <option value="50,100">$50 - $100</option>
            <option value="100,500">$100 - $500</option>
            <option value="500,1000">$500+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="border rounded-lg overflow-hidden transition-transform hover:scale-105">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-full p-4"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-primary font-bold">${product.price}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {product.category}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList 