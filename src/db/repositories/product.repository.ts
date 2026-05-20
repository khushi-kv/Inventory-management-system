// Data access layer — ONLY raw MongoDB queries live here
import Product, { IProduct } from "../models/product.js";
import { SortOrder } from "mongoose";

class ProductRepository {
  async create(data: Partial<IProduct>): Promise<IProduct> {
    return Product.create(data);
  }

  async findAll(
    filter: Record<string, unknown>,
    sort: string | Record<string, SortOrder>,
    skip: number,
    limit: number
  ): Promise<IProduct[]> {
    return Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  async count(filter: Record<string, unknown>): Promise<number> {
    return Product.countDocuments(filter);
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  async updateById(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id);
  }
}

export default new ProductRepository();
