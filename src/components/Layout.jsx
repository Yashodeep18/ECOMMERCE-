import { Outlet, Link } from 'react-router-dom'

function Layout() {
  // Define fallback styles for custom colors:
  const styles = {
    background: { backgroundColor: '#f9fafb' },
    primaryText: { color: '#1d4ed8' }, // blue-700
    foregroundText: { color: '#374151' }, // gray-700
    primaryForegroundText: { color: '#ffffff' }, // white
    primaryBg: { backgroundColor: '#1d4ed8' }, // blue-700
    primaryHoverBg: { backgroundColor: 'rgba(29, 78, 216, 0.9)' }, // blue-700 90%
    productsBg: { backgroundColor: '#3b82f6' }, // blue-500 for Products button
    productsHoverBg: { backgroundColor: '#2563eb' }, // blue-600 hover for Products button
  }

  return (
    <div className="min-h-screen" style={styles.background}>
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold mb-4 md:mb-0"
              style={styles.primaryText}
            >
              E-Commerce Dashboard
            </Link>
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="px-4 py-2 rounded-md whitespace-nowrap text-white transition-colors"
                style={styles.productsBg}
                onMouseEnter={e =>
                  (e.currentTarget.style.backgroundColor = styles.productsHoverBg.backgroundColor)
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.backgroundColor = styles.productsBg.backgroundColor)
                }
              >
                Products
              </Link>
              <Link
                to="/add"
                className="px-4 py-2 rounded-md whitespace-nowrap text-white transition-colors"
                style={styles.primaryBg}
                onMouseEnter={e =>
                  (e.currentTarget.style.backgroundColor = styles.primaryHoverBg.backgroundColor)
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.backgroundColor = styles.primaryBg.backgroundColor)
                }
              >
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
