// Facade — business logic lives here, orchestrates repo calls
import productRepository from "../db/repositories/product.repository.js";
import { CreateProductDTO, PaginatedProducts } from "./interfaces/product.interface.js";
import { IProduct } from "../db/models/product.js";

interface ListProductsQuery {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  category?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
}

class ProductService {
  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return productRepository.create(data);
  }

  async listProducts(query: ListProductsQuery): Promise<PaginatedProducts> {
    let {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      category,
      minPrice,
      maxPrice,
    } = query;

    page = Number(page);
    limit = Number(limit);

    const filter: Record<string, unknown> = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) (filter.price as Record<string, number>).$gte = Number(minPrice);
      if (maxPrice) (filter.price as Record<string, number>).$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      productRepository.findAll(filter, sort, skip, limit),
      productRepository.count(filter),
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error("Product not found");
      (error as Error & { statusCode: number }).statusCode = 404;
      throw error;
    }
    return product;
  }

  async updateProduct(id: string, data: Partial<CreateProductDTO>): Promise<IProduct> {
    const product = await productRepository.updateById(id, data);
    if (!product) {
      const error = new Error("Product not found");
      (error as Error & { statusCode: number }).statusCode = 404;
      throw error;
    }
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await productRepository.deleteById(id);
    if (!product) {
      const error = new Error("Product not found");
      (error as Error & { statusCode: number }).statusCode = 404;
      throw error;
    }
  }
}

export default new ProductService();
