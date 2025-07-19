
const API_BASE = 'https://crudcrud.com/api/dddfa0c3295d4100a53acccf72584dbe';

export interface ApiProduct {
  _id?: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  shopId: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
  originalPrice?: number;
}

export const apiService = {
  // Products
  async getProducts(): Promise<ApiProduct[]> {
    try {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async createProduct(product: Omit<ApiProduct, '_id'>): Promise<ApiProduct | null> {
    try {
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  },

  async updateProduct(id: string, product: Partial<ApiProduct>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE'
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // Initialize with sample data
  async initializeSampleData(): Promise<void> {
    const sampleProducts: Omit<ApiProduct, '_id'>[] = [
      {
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        originalPrice: 39.99,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        description: "High-quality cotton t-shirt with premium comfort and style.",
        shopId: 1,
        rating: 4.5,
        reviewCount: 128,
        inStock: true,
        colors: ["White", "Black", "Navy"],
        sizes: ["S", "M", "L", "XL"]
      },
      {
        name: "Designer Jeans",
        price: 89.99,
        originalPrice: 120.00,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        description: "Stylish designer jeans with perfect fit and premium denim.",
        shopId: 1,
        rating: 4.7,
        reviewCount: 89,
        inStock: true,
        colors: ["Blue", "Black"],
        sizes: ["28", "30", "32", "34", "36"]
      }
    ];

    for (const product of sampleProducts) {
      await this.createProduct(product);
    }
  }
};

export default apiService;
