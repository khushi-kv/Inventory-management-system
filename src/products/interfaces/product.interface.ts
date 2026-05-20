// Type definitions — documents the shape of data flowing through the module
export interface CreateProductDTO {
  name: string;
  price: number;
  description?: string;
  category: "electronics" | "fashion" | "grocery" | "other";
  inStock?: boolean;
}

export interface ProductFilter {
  category?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedProducts {
  products: unknown[];
  pagination: PaginationMeta;
}
