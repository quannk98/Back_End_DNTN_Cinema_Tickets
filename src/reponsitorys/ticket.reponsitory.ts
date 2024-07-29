import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { populate } from 'dotenv';
import { Model } from 'mongoose';
import path from 'path';
import { ESeatStatus, ETicketStatus } from 'src/common/enums/user.enum';
import { TicketDto } from 'src/modules/ticket/dto/ticket.dto';
import { Cinema } from 'src/schemas/cinema.schema';
import { Movie } from 'src/schemas/movie.schema';
import { Room } from 'src/schemas/room.schema';
import { Seat } from 'src/schemas/seat.schema';
import { Showtime } from 'src/schemas/showtime.schema';
import { Ticket } from 'src/schemas/ticket.schema';
import { Time } from 'src/schemas/time.schema';
import mongoose from 'mongoose';
import { Seatstatus } from 'src/schemas/seatstatus.schema';
import { NotificationGateway } from 'src/modules/notification/notification.gateway';

@Injectable()
export class TicketReponsitory {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel(Seat.name) private readonly seatModel: Model<Seat>,
    @InjectModel(Cinema.name) private readonly cinemaModel: Model<Cinema>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
    @InjectModel(Showtime.name) private readonly showtimeModel: Model<Showtime>,
    @InjectModel(Time.name) private readonly timeModel: Model<Time>,
    @InjectModel(Seatstatus.name)
    private readonly seatstatusModel: Model<Seatstatus>,
    private readonly notificationGateway: NotificationGateway,
  ) {}
  async create(ticketDto: TicketDto): Promise<any> {
    try {
      const seats = await this.seatModel.find({ _id: { $in: ticketDto.seat } });
      const idroom = seats[0].room;
      const room = await this.roomModel.findById(idroom);
      const movie = await this.movieModel.findById(room.movie);
      const showtime = await this.showtimeModel.findById(ticketDto.showdate);
      const cinema = await this.cinemaModel.findById(room.cinema);
      const time = await this.timeModel.findById(ticketDto.showtime);

      const dataCreate = {
        ...ticketDto,
        room: room._id,
        movie: movie._id,
        showdate: showtime._id,
        time: time._id,
        cinema: cinema._id,
      };

      const seatStatusPromises = [];

      for (const seatId of ticketDto.seat) {
        const seatStatusCreate = {
          seat: seatId,
          room: room._id,
          cinema: cinema._id,
          day: showtime._id,
          date: new Date(showtime.date),
          time: time._id,
          status: ESeatStatus.WAITING,
        };
        const existsAvailable = await this.seatstatusModel.findOne({
          seat: seatId,
          room: room._id,
          cinema: cinema._id,
          day: showtime._id,
          date: new Date(showtime.date),
          time: time._id,
          status: ESeatStatus.AVAILABLE,
        });
        const existsWaitting = await this.seatstatusModel.findOne({
          seat: seatId,
          room: room._id,
          cinema: cinema._id,
          day: showtime._id,
          date: new Date(showtime.date),
          time: time._id,
          status: ESeatStatus.AVAILABLE,
        });

        if (!existsAvailable && !existsWaitting) {
          seatStatusPromises.push(
            await new this.seatstatusModel(seatStatusCreate).save(),
          );
          for (const seatId of ticketDto.seat) {
            const data = {
              seat: seatId,
              cinema: cinema._id,
              room: room._id,
              day: showtime._id,
              date: new Date(showtime.date),
              time: time._id,
              status: ESeatStatus.WAITING,
            };
            await this.notificationGateway.StatusSeat(data);
          }
        } else if (existsAvailable && !existsWaitting) {
          await this.seatstatusModel.findByIdAndUpdate(
            existsAvailable._id,
            {
              status: ESeatStatus.WAITING,
            },
            { new: true },
          );

          for (const seatId of ticketDto.seat) {
            const data = {
              seat: seatId,
              cinema: cinema._id,
              room: room._id,
              day: showtime._id,
              date: new Date(showtime.date),
              time: time._id,
              status: ESeatStatus.WAITING,
            };
            await this.notificationGateway.StatusSeat(data);
          }
        } else if (!existsAvailable && existsWaitting) {
          return 'Tick already exists';
        }
      }
      const newTicket = new this.ticketModel(dataCreate);
      const createdTicket = await newTicket.save();

      return createdTicket;
    } catch (error) {
      return error.message;
    }
  }

  async getAllTicketForAdmin(page: number): Promise<any> {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const getAll: any = await this.ticketModel
      .find({})
      .populate([
        {
          path: 'discount',
          select: 'name image percent code type cinema',
        },
        {
          path: 'movie',
          select: 'name duration image genre',
          populate: [{ path: 'genre', select: 'name image' }],
        },
        {
          path: 'room',
          select: 'name',
        },
        {
          path: 'seat',
          select: 'name price status',
        },
        {
          path: 'showdate',
          select: 'date',
        },
        {
          path: 'time',
          select: 'time',
        },
        { path: 'user', select: 'name email number_phone image' },
        {
          path: 'food.foodId',
          select: 'name price image',
          model: 'Food',
        },
        { path: 'cinema', select: 'name address' },
      ])
      .skip(skip)
      .limit(pageSize);
    return getAll;
  }

  // async getAllTicketForUser(): Promise<any> {
  //   const getAll: any = await this.ticketModel
  //     .find({})
  //     .populate([
  //       {
  //         path: 'discount',
  //         select: 'name image percent code type cinema',
  //       },
  //       {
  //         path: 'movie',
  //         select: 'name duration image genre',
  //         populate: [{ path: 'genre', select: 'name image' }],
  //       },
  //       {
  //         path: 'room',
  //         select: 'name',
  //       },
  //       {
  //         path: 'seat',
  //         select: 'name price status',
  //       },
  //       {
  //         path: 'showdate',
  //         select: 'date',
  //       },
  //       {
  //         path: 'time',
  //         select: 'time',
  //       },
  //       { path: 'user', select: 'name email number_phone image' },
  //       {
  //         path: 'food.foodId',
  //         select: 'name price image',
  //         model: 'Food',
  //       },
  //       { path: 'cinema', select: 'name address' },
  //     ])
      
  //   return getAll;
  // }
  async getTicket(ticketId: any): Promise<any> {
    try {
      const getTicket: any = await this.ticketModel
        .findById(ticketId)
        .populate([
          {
            path: 'discount',
            select: 'name percent code type cinema',
          },
          {
            path: 'movie',
            select: 'name duration image genre',
            populate: [{ path: 'genre', select: 'name image' }],
          },
          {
            path: 'room',
            select: 'name',
          },
          {
            path: 'seat',
            select: 'name price status',
          },
          {
            path: 'showdate',
            select: 'date',
          },
          {
            path: 'time',
            select: 'time',
          },
          { path: 'user', select: 'name email number_phone image' },
          {
            path: 'food.foodId',
            select: 'name price image',
            model: 'Food',
          },
          { path: 'cinema', select: 'name address' },
        ]);

      if (!getTicket) {
        return 'Get Failed';
      }

      return getTicket;
    } catch (error) {
      console.log('error', error);
    }
  }

  async getTicketByUserForAdmin(userId: any, page: number): Promise<any> {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const getTicket: any = await this.ticketModel
      .find({ user: userId })
      .populate([
        {
          path: 'discount',
          select: 'name percent code type cinema',
        },
        {
          path: 'movie',
          select: 'name duration image genre',
          populate: [{ path: 'genre', select: 'name image' }],
        },
        {
          path: 'room',
          select: 'name',
        },
        {
          path: 'seat',
          select: 'name price status',
        },
        {
          path: 'showdate',
          select: 'date',
        },
        {
          path: 'time',
          select: 'time',
        },
        { path: 'user', select: 'name email number_phone image' },
        {
          path: 'food.foodId',
          select: 'name price image',
          model: 'Food',
        },
        { path: 'cinema', select: 'name address' },
      ])
      .skip(skip)
      .limit(pageSize);
    if (!getTicket) {
      return 'Get Failed';
    }
    return getTicket;
  }

  async getTicketByUserForUser(userId: any): Promise<any> {
   
    const getTicket: any = await this.ticketModel
      .find({ user: userId })
      .populate([
        {
          path: 'discount',
          select: 'name percent code type cinema',
        },
        {
          path: 'movie',
          select: 'name duration image genre',
          populate: [{ path: 'genre', select: 'name image' }],
        },
        {
          path: 'room',
          select: 'name',
        },
        {
          path: 'seat',
          select: 'name price status',
        },
        {
          path: 'showdate',
          select: 'date',
        },
        {
          path: 'time',
          select: 'time',
        },
        { path: 'user', select: 'name email number_phone image' },
        {
          path: 'food.foodId',
          select: 'name price image',
          model: 'Food',
        },
        { path: 'cinema', select: 'name address' },
      ])
    if (!getTicket) {
      return 'Get Failed';
    }
    return getTicket;
  }

  async getRevenue(): Promise<any> {
    const allTickets = await this.ticketModel.find({
      status: { $ne: ETicketStatus.INACTIVE },
    });
    let totalRevenue = 0;
    for (const ticket of allTickets) {
      totalRevenue += ticket.total;
    }

    const getRevenue = {
      total: totalRevenue,
    };

    return getRevenue;
  }

  async getRevenueByUser(userId: any): Promise<any> {
    const allTicketsByUser: any = await this.ticketModel
      .find({
        status: !ETicketStatus.INACTIVE,
        user: userId,
      })
      .populate([{ path: 'user', select: 'name' }]);
    let totalRevenue = 0;
    for (const ticket of allTicketsByUser) {
      totalRevenue += ticket.total;
    }

    const nameuser = allTicketsByUser[0].user.name;
    const getRevenueUser = {
      User: nameuser,
      total: totalRevenue,
    };

    return getRevenueUser;
  }

  async getRevenueByCMD(
    movieId: any,
    dayStart: string,
    dayEnd: string,
  ): Promise<any> {
    let filter: any = { status: { $ne: ETicketStatus.INACTIVE } };

    if (movieId) {
      filter.movie = new mongoose.Types.ObjectId(movieId);
    }
    if (dayStart && dayEnd) {
      filter.date = {
        $gte: new Date(dayStart),
        $lte: new Date(dayEnd),
      };
    }

    const reportData = await this.ticketModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'movies',
          localField: 'movie',
          foreignField: '_id',
          as: 'movieData',
        },
      },
      {
        $lookup: {
          from: 'cinemas',
          localField: 'cinema',
          foreignField: '_id',
          as: 'cinemaData',
        },
      },
      {
        $group: {
          _id: {
            cinema: '$cinemaData._id',
            movie: '$movieData._id',
          },
          totalRevenue: { $sum: '$total' },
          ticketCount: { $sum: 1 },
          movieName: { $first: '$movieData.name' },
          cinemaName: { $first: '$cinemaData.name' },
        },
      },
      {
        $project: {
          _id: 0,
          // cinema: '$_id.cinema',
          // movie: '$_id.movie',
          totalRevenue: 1,
          ticketCount: 1,
          movieName: 1,
          cinemaName: 1,
        },
      },
    ]);

    return reportData;
  }
  async getMovieRevenue(page: number): Promise<any> {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const reportData = await this.ticketModel
      .aggregate([
        {
          $match: { status: { $ne: ETicketStatus.INACTIVE } }, // Filter active tickets
        },
        {
          $lookup: {
            from: 'movies', // Join with 'movies' collection
            localField: 'movie',
            foreignField: '_id',
            as: 'movieData',
          },
        },
        {
          $group: {
            _id: '$movieData._id', // Group by movie ID
            movie: { $first: '$movieData.name' }, // Get movie title
            totalRevenue: { $sum: '$total' }, // Sum revenue for each movie
            count: { $sum: 1 }, // Count tickets for each movie
          },
        },
        {
          $project: {
            _id: 0, // Exclude unnecessary _id field
            movie: 1,
            totalRevenue: 1,
            count: 1,
          },
        },
        {
          $sort: { totalRevenue: -1 }, // Sort by totalRevenue in descending order (highest first)
        },
      ])
      .skip(skip)
      .limit(pageSize);

    return reportData;
  }

  async getCinemaRevenue(): Promise<any> {
    const reportData = await this.ticketModel.aggregate([
      {
        $match: { status: { $ne: ETicketStatus.INACTIVE } }, // Filter active tickets
      },
      {
        $lookup: {
          from: 'cinemas', // Join with 'cinemas' collection
          localField: 'cinema',
          foreignField: '_id',
          as: 'cinemaData',
        },
      },
      {
        $group: {
          _id: '$cinemaData._id', // Group by cinema ID
          cinema: { $first: '$cinemaData.name' }, // Get cinema name
          totalRevenue: { $sum: '$total' }, // Sum revenue for each cinema
        },
      },
      {
        $project: {
          _id: 0, // Exclude unnecessary _id field
          cinema: 1,
          totalRevenue: 1,
        },
      },
      {
        $sort: { totalRevenue: -1 }, // Sort by totalRevenue in descending order (highest first)
      },
    ]);

    return reportData;
  }

  async checkTicket(): Promise<any> {
    const time = Date.now() - 2 * 40 * 1000;
    const date = new Date(time);

    const inactiveTickets = await this.ticketModel.find({
      status: ETicketStatus.INACTIVE,
      date: { $lt: date },
    });

    const datass = [];

    if (inactiveTickets.length >= 0) {
      for (const ticket of inactiveTickets) {
        for (const seat of ticket.seat) {
          datass.push({
            seat: seat,
            showday: ticket.showdate,
            showtime: ticket.time,
            status: ESeatStatus.AVAILABLE,
          });

          await this.notificationGateway.StatusSeat(datass[datass.length - 1]);
        }

        await Promise.all(
          ticket.seat.map(async (seatId) => {
            await this.seatstatusModel.findOneAndUpdate(
              { seat: seatId },
              {
                status: ESeatStatus.AVAILABLE,
                day: ticket.showdate,
                time: ticket.time,
              },
              { new: true },
            );
          }),
        );

        await this.ticketModel.findByIdAndDelete(ticket._id);
      }
    }
  }

  async updateStatusSeat(seatId: any, status: ESeatStatus): Promise<any> {
    const update = await this.seatstatusModel.findOneAndUpdate(
      { seat: seatId },
      { status: status },
      {
        new: true,
      },
    );

    if (!update) {
      return 'Update Failed';
    }
    return update;
  }

  async updateFoodTicket(ticketId: any, ticketDto: TicketDto) {
    if (ticketDto.food === undefined && ticketDto.total_food === undefined) {
      const update = await this.ticketModel.findByIdAndUpdate(
        ticketId,
        ticketDto,
        { new: true },
      );
      if (!update) throw new UnauthorizedException('Vé của bạn không tồn tại');
      return update;
    } else {
      const foodItems = [];
      for (const foodData of ticketDto.food) {
        foodItems.push({
          foodId: new mongoose.Types.ObjectId(foodData.foodId),
          quantity: foodData.quantity,
        });
      }
      const data = {
        ...ticketDto,
        food: foodItems,
        total_food: ticketDto.total_food,
        total: ticketDto.total,
      };

      const update = await this.ticketModel.findByIdAndUpdate(ticketId, data, {
        new: true,
      });
      if (!update) throw new UnauthorizedException('Vé của bạn không tồn tại');
      return update;
    }
  }

  async updateStatusTicket(ticketId: any, status: any): Promise<any> {
    const update = await this.ticketModel.findByIdAndUpdate(
      ticketId,
      { status: status },
      {
        new: true,
      },
    );
    if (!update) throw new UnauthorizedException('Vé của bạn không tồn tại');
    return update;
  }

  async updateTicket(ticketId: any, dataUpdate: any): Promise<any> {
    const update = await this.ticketModel.findByIdAndUpdate(
      ticketId,
      dataUpdate,
      {
        new: true,
      },
    );
    if (!update) {
      return 'Update Failed';
    }
    return update;
  }

  async deleteTicket(ticketId: any, password: any): Promise<any> {
    if (password != '8888') {
      return 'You do not have sufficient authority to delete';
    }
    const deleteticket = await this.ticketModel.findByIdAndDelete(ticketId);
    if (!deleteticket) {
      return 'Delete Failed';
    }
    return deleteticket;
  }
}
