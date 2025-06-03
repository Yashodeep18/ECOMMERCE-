import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'https://fakestoreapi.com/products'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async() => {
        const response = await fetch(API_URL)
        const data = await response.json()
        return data
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async(product) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        const data = await response.json()
        return data
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async({ id, product }) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        const data = await response.json()
        return data
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async(id) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
        return id
    }
)

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    filters: {
        search: '',
        category: '',
        priceRange: { min: 0, max: Infinity },
    },
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchFilter: (state, action) => {
            state.filters.search = action.payload
        },
        setCategoryFilter: (state, action) => {
            state.filters.category = action.payload
        },
        setPriceRangeFilter: (state, action) => {
            state.filters.priceRange = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id)
                if (index !== -1) {
                    state.items[index] = action.payload
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload)
            })
    },
})

export const { setSearchFilter, setCategoryFilter, setPriceRangeFilter } = productsSlice.actions

export const selectAllProducts = (state) => state.products.items
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error
export const selectProductsFilters = (state) => state.products.filters

export const selectFilteredProducts = (state) => {
    const { items, filters } = state.products
    return items.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase())
        const matchesCategory = !filters.category || product.category === filters.category
        const matchesPrice = product.price >= filters.priceRange.min &&
            product.price <= filters.priceRange.max
        return matchesSearch && matchesCategory && matchesPrice
    })
}

export default productsSlice.reducer