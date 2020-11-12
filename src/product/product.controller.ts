import { Controller, Get, HttpException, HttpStatus, Param, Body, Post, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('all')
    public async getProducts(): Promise<Product[]>{
        const products = await this.productService.getProducts();
        if(!products){
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
        }, HttpStatus.FORBIDDEN);
}
        return products;

    }
    
  @Post()
  async create(@Body() createProductDTO: CreateProductDTO):Promise<Product> {
    return await this.productService.createProduct(createProductDTO);
  }




  @Get(':id')
  async getOne(@Param('id') id: any):Promise<Product> {
    return await this.productService.getProduct(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body()  createProductDTO: CreateProductDTO):Promise<Product> {
    return await this.productService.editProduct(id, createProductDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number):Promise<void> {
    return await this.productService.deleteProduct(id);
  }
}


