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
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>
  }

  if (status === 'failed') {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
        Error: {error}
      </div>
    )
  }

  return (
    <>
      {/* Internal CSS for colors */}
      <style>{`
        .text-primary {
          color: #3182ce; /* blue-600 */
          font-weight: 700;
        }
        .text-muted {
          color: #718096; /* gray-600 */
        }
        .border-rounded {
          border-radius: 0.5rem; /* rounded-lg */
          border: 1px solid #e2e8f0; /* gray-300 */
        }
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>

      <div>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearchChange}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
              }}
            />
            <select
              onChange={handleCategoryChange}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
              }}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
            <select
              onChange={handlePriceRangeChange}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
              }}
            >
              <option value="0,1000">All Prices</option>
              <option value="0,50">Under $50</option>
              <option value="50,100">$50 - $100</option>
              <option value="100,500">$100 - $500</option>
              <option value="500,1000">$500+</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
            gap: '1.5rem',
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="group"
            >
              <div className="border-rounded hover-scale" style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'relative',
                    paddingTop: '100%', // 1:1 aspect ratio
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '1rem',
                    }}
                  />
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 className="line-clamp-2" style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    {product.title}
                  </h3>
                  <p className="text-primary">${product.price}</p>
                  <p className="text-muted" style={{ textTransform: 'capitalize', fontSize: '0.875rem' }}>
                    {product.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductList
