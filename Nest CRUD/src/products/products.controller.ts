import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "./createProduct.dto";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    // @Post()
    // addProduct(@Body('id') id: string, @Body('price') price: number) {
    //     return this.productsService.insertProduct(id, price);
    // }

    @Post()
    addProductDatabase(@Body() createProductDto: CreateProductDto ) {
        return this.productsService.insertProductDatabase(createProductDto);
    }

    // @Get()
    // getProducts(){
    //     return this.productsService.getProducts();
    // }

    @Get()
    getProductsDatabase(){
        return this.productsService.getProductsDatabase();
    }

    // @Get(':id')
    // getProduct(@Param('id') id: string){
    //     return this.productsService.getProduct(id);
    // }

    @Get(':id')
    getProductDatabase(@Param('id', ParseIntPipe) id: number){
        return this.productsService.getProductDatabase(id);
    }

    // @Patch(':id')
    // updateProduct(@Param('id') id: string, @Body('price') price: number){
    //     return this.productsService.updateProduct(id, price);
    // }

    @Patch(':id')
    updateProductDatabase(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto){
        return this.productsService.updateProductDatabase(id, updateProductDto);
    }

    // @Delete(':id')
    // deleteProduct(@Param('id') id: string){
    //     return this.productsService.deleteProduct(id);
    // }

    @Delete(':id')
    deleteProductDatabase(@Param('id', ParseIntPipe) id: number){
        return this.productsService.deleteProductDatabase(id);
    }
}