import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductModel } from './product.model';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductParams, UpdateProductParams } from './product.types';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}


    private readonly products: ProductModel[]=[];

    insertProduct(id: string, price: number){
        const newProduct=new ProductModel(id, price);
        this.products.push(newProduct);
        return newProduct;
    }

    insertProductDatabase(productDetails: CreateProductParams){
        const newProduct=this.productRepository.create({ ...productDetails, createdAt: new Date() });
        return this.productRepository.save(newProduct);
    }

    getProducts(){
        return [...this.products];
    }

    getProductsDatabase(){
        return this.productRepository.find();
    }

    getProduct(id: string){
        return this.findProduct(id)[0];
    }

    getProductDatabase(id: number){
        return this.findProductDatabase(id);
    }

    updateProduct(id: string, price: number){
        const [product, productIndex]=this.findProduct(id);
        const updatedProduct={...product};

        if(price){
            updatedProduct.price=price;
        }

        return this.products[productIndex]=updatedProduct;
    }

    updateProductDatabase(id: number, productDetails: UpdateProductParams){
        return this.productRepository.update({ prodId: id }, { ...productDetails });
    }

    deleteProduct(id: string){
        const index=this.findProduct(id)[1];

        return this.products.splice(index, 1);
    }

    deleteProductDatabase(id: number){
        return this.productRepository.delete({prodId: id});
    }

    private findProduct(id: string): [ProductModel, number]{
        const product=this.products.find((product)=>product.id==id);
        const productIndex=this.products.findIndex((product)=>product.id==id);
        if(!product){
            throw new NotFoundException('Product Not Found.');
        }
        return [product, productIndex];
    }

    private findProductDatabase(id: number){
        const product=this.productRepository.findOneBy({prodId: id});
        if(!product){
            throw new NotFoundException('Product Not Found.');
        }
        return product;
    }
}