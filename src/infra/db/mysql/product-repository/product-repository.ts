import { PrismaClient } from "@prisma/client";
import { AddProductRepository } from "../../../../data/protocols/db/product/add-product-repository";
import { DeleteProductByIdRepository } from "../../../../data/protocols/db/product/delete-product-repository";
import {
  LoadProductByIdRepository,
  LoadProductRepository,
} from "../../../../data/protocols/db/product/load-product-repository";
import { UpdateProductRepository } from "../../../../data/protocols/db/product/update-product-repository";
import {
  Product,
  ProductModel,
  LoadProductFilter,
  LoadProductResult,
} from "../../../../domain/models/product/product";
import { AddProductModel } from "../../../../domain/usescases/product/add-product/add-product";

export class ProductMysqlRepository
  implements
    AddProductRepository,
    LoadProductRepository,
    LoadProductByIdRepository,
    UpdateProductRepository,
    DeleteProductByIdRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async add(product: AddProductModel): Promise<Product> {
    const result = await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      },
    });
    return { ...result, price: Number(result.price) };
  }

  async getAllProducts(filter: LoadProductFilter = {}): Promise<LoadProductResult> {
    const { name, category, priceMin, priceMax, limit, offset } = filter;

    const where: any = {};
    if (name) where.name = { contains: name };
    if (category) where.category = category;
    if (priceMin !== undefined || priceMax !== undefined) {
      where.price = {};
      if (priceMin !== undefined) where.price.gte = priceMin;
      if (priceMax !== undefined) where.price.lte = priceMax;
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: { name: "asc" },
        ...(limit !== undefined && { take: limit }),
        ...(offset !== undefined && { skip: offset }),
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: items.map((product) => ({ ...product, price: Number(product.price) })),
      total,
    };
  }

  async getOneProduct(id: number): Promise<Product> {
    const result = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
    return result && { ...result, price: Number(result.price) };
  }

  async updateProduct(id: number, info: Partial<ProductModel>): Promise<Product> {
    const result = await this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(info.name && { name: info.name }),
        ...(info.price !== undefined && { price: info.price }),
        ...(info.description && { description: info.description }),
        ...(info.category && { category: info.category }),
      },
    });
    return { ...result, price: Number(result.price) };
  }

  async deleteById(id: number): Promise<string> {
    await this.prisma.product.delete({
      where: { id: Number(id) },
    });
    return "Deletado com sucesso!";
  }
}
