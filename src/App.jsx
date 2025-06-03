import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from './features/products/productsSlice'
import { useEffect } from 'react'

// Lazy load components for better performance
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const AddProduct = lazy(() => import('./pages/AddProduct'))
const EditProduct = lazy(() => import('./pages/EditProduct'))
const Layout = lazy(() => import('./components/Layout'))

function App() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.products.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App 