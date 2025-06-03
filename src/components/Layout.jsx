import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 md:mb-0">
              E-Commerce Dashboard
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                to="/add"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
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