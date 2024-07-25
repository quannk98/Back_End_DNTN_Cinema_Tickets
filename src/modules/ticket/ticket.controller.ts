import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto } from './dto/ticket.dto';
import { SeatService } from '../seat/seat.srevice';
import { ESeatStatus, ETicketStatus } from 'src/common/enums/user.enum';
import { PaymentDto } from './dto/payment.dto';
import Stripe from 'stripe';
import { StripeService } from './Stripe.Service';
import { AuthAdminGuard } from '../auth/dto/admin.guard';
import { AuthGuard } from '../auth/auth.guard';
import { NotificationService } from '../notification/notification.service';
import { Socket } from 'socket.io';
import { NotificationGateway } from '../notification/notification.gateway';
import { FcmNotificationService } from '../firebase_notification/firebase.service';

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly stripeService: StripeService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
    private readonly fcmnotification: FcmNotificationService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(@Request() req, @Body() ticketDto: TicketDto): Promise<any> {
    try {
      const dataCreate = {
        ...ticketDto,
        user: req.user.sub,
      };

      const create = await this.ticketService.createTicket(dataCreate);
      const datass = [];

      for (const seat of ticketDto.seat) {
        datass.push({
          seat: seat,
          showday: ticketDto.showdate,
          showtime: ticketDto.showtime,
          status: ESeatStatus.WAITING,
        });

        await this.notificationGateway.StatusSeat(datass[datass.length - 1]);
      }
      
      return {
        create,
      };
    } catch (error) {
      return error.reponse;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('revenue/movie')
  async getMovieRevenue(): Promise<any> {
    try {
      const revenue = await this.ticketService.getMovieRevenue();
      return revenue;
    } catch (error) {
      console.log('error', error.reponse);
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('revenue/cinema')
  async getCinemaRevenue(): Promise<any> {
    try {
      const revenue = await this.ticketService.getCinemaRevenue();
      return revenue;
    } catch (error) {
      console.log('error', error.reponse);
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('revenue/cmd')
  async getRevenueByCMD(
    // @Query('cinemaId') cinemaId,
    @Query('movieId') movieId,
    @Query('dayStart') dayStart,
    @Query('dayEnd') dayEnd,
  ): Promise<any> {
    try {
      const revenue = await this.ticketService.getRevenueByCMD(
        // cinemaId,
        movieId,
        dayStart,
        dayEnd,
      );
      return revenue;
    } catch (error) {
      console.log('error', error.reponse);
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('revenue')
  async getRevenue(): Promise<any> {
    const revenue = await this.ticketService.getRevenue();
    return revenue;
  }

  @UseGuards(AuthAdminGuard)
  @Get('')
  async getAll(): Promise<any> {
    const getall = await this.ticketService.getAll();
    return {
      getall,
    };
  }
  @Get('revenue/:userid')
  async getRevenueuser(@Param('userid') id: any): Promise<any> {
    const revenue = await this.ticketService.getRevenueUser(id);
    return revenue;
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async getTicketByUser(@Param('userId') id: any): Promise<any> {
    const getTicket = await this.ticketService.getTicketByUser(id);
    return {
      getTicket,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTicket(@Param('id') id: any): Promise<any> {
    try {
      const getTicket = await this.ticketService.getticket(id);
      return {
        getTicket,
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  @UseGuards(AuthGuard)
  @Put('food/:id')
  async updateFoodTicket(
    @Param('id') id: any,
    @Body() ticketDto: TicketDto,
  ): Promise<any> {
    const update = await this.ticketService.updateFoodTicket(id, ticketDto);

    return update;
  }

  @UseGuards(AuthGuard)
  @Post('payment/:id')
  async paymentTicket(
    @Param('id') id: any,
    @Body() paymentDto: PaymentDto,
  ): Promise<any> {
    const getticket = await this.ticketService.getticket(id);
    if (getticket.length < 0) {
      return 'Vé của bạn không tồn tại';
    } else {
      const payment = await this.stripeService.createPaymentIntent(paymentDto);
      if (!payment) {
        return 'Payment failed';
      }
      
      
      return payment;
    }
  }

  @UseGuards(AuthGuard)
  @Put('status/:id')
  async updateStatusticket(
    @Request() req,
    @Param('id') id: any,
    @Body() token: string,
  ): Promise<any> {
    const getticket = await this.ticketService.getticket(id);

    const update = await this.ticketService.updateStatusTicket(
      id,
      ETicketStatus.ACTIVE,
    );

    for (var i = 0; i < getticket.seat.length; i++) {
      await this.ticketService.updateStatusSeat(
        getticket.seat[i],
        ESeatStatus.RESERVED,
      );
      const data = {
        statusseat: getticket.seat[i],
        status: ESeatStatus.RESERVED,
      };
      await this.notificationGateway.StatusSeat(data);
    }
    const dataNotification = {
      name: 'Đặt vé thành công',
      date: getticket.date,
      user: req.user.sub,
    };
    await this.notificationService.CreateNotificationUser(dataNotification);

    // await this.notificationGateway.NotificationUser(
    //   req.user.sub,
    //   dataNotification.name,
    // ); // dùng socket
    const datass = [];
    for (const seat of getticket.seat) {
      datass.push({
        seat: seat,
        showday: getticket.showdate,
        showtime: getticket.showtime,
        status: ESeatStatus.SELECTED,
      });

      await this.notificationGateway.StatusSeat(datass[datass.length - 1]);
    }
    const data = {
      title: 'Đặt vé thành công!',
      body: `Vé xem phim ${getticket.movie} - ${getticket.showtime} đã được đặt thành công!`,
      user: req.user.sub,
    };
    // await this.fcmnotification.sendingNotificationOneUser(token);
    return {
      update,
    };
  }

  @UseGuards(AuthGuard)
  @Put('status/:id/complete')
  async updateStatusticketComplete(@Param('id') id: any): Promise<any> {
    const checkstatus = await this.getTicket(id);
    if (checkstatus.getTicket.status === 'inactive') {
      return 'Bạn chưa thanh toán';
    } else {
      const update = await this.ticketService.updateStatusTicket(
        id,
        ETicketStatus.COMPLETE,
      );
      const ticket = await this.ticketService.getticket(id);

      return update;
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: any,
    @Body() ticketDto: TicketDto,
  ): Promise<any> {
    try {
      const updated = await this.ticketService.updateTicket(id, ticketDto);
      return {
        updated,
      };
    } catch (error) {
      return error.reponse;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async deleteTicket(
    @Param('id') id: any,
    @Query('password') password: any,
  ): Promise<any> {
    const tickets = await this.ticketService.getticket(id);
    for (var i = 0; i < tickets.seat.length; i++) {
      await this.ticketService.updateStatusSeat(
        tickets.seat[i],
        ESeatStatus.AVAILABLE,
      );
      const data = {
        statusseat: tickets.seat[i],
        status: ESeatStatus.AVAILABLE,
      };
      await this.notificationGateway.StatusSeat(data);
    }
    const deleteticket = await this.ticketService.deleteTicket(id, password);
    await this.ticketService.deleteTicket(id, password);
    return {
      deleteticket,
    };
  }
}
