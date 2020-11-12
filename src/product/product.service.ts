import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductRepository)private productRepository: ProductRepository,) { }

    public async createProduct( createProductDto: CreateProductDTO): Promise<Product> {
        const product = new Product()
        product.description = createProductDto.description
        product.name = createProductDto.name
        product.price = createProductDto.price
        product.save()
        return await product 
    }


    public async getProducts(): Promise<Product[]> {
        return await this.productRepository.find() ;
    }


    public async getProduct(createProductDto: CreateProductDTO): Promise<Product> {
        const foundProduct =createProductDto.id; 
        if (!foundProduct) {
            throw new NotFoundException('Product not found');
        }
        return await this.productRepository.findOne(foundProduct);
    }


    public async editProduct(productId: number,  createProductDto: CreateProductDTO):Promise<any> {
        const editedProduct = this.getProduct(createProductDto); 
        if (!editedProduct) {
            throw new NotFoundException('Product not found');
        }
        return await this.productRepository.update(productId,createProductDto) ; 
    }


    public async deleteProduct(productId: number): Promise<void> {
        await this.productRepository.delete(productId) 
    }
}
