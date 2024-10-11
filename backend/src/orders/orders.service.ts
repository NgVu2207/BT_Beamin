import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async order(model, user_id) {
    
    // order => lưu thông tin đơn hàng
    let newOrder = {
      user_id: user_id,
      list_product: JSON.parse(model.list_product),
      create_at: new Date(),
    };
    let orderSuccess = await this.prismaService.orders.create({
      data: newOrder,
    });

   
    // ship => lưu thông tin shipping
    let newShip = {
      order_id: orderSuccess.order_id,
      full_name: model.full_name,
      email: model.email,
      phone: model.phone,
      address: model.address,
      create_at: new Date(),
    };

    // payment => lưu thông tin thanh toán

    return 'thành công';
  }
}
