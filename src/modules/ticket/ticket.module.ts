import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketReponsitory } from 'src/repositories/ticket.reponsitory';
import { Ticket, TicketSchema } from 'src/schemas/ticket.schema';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { SeatService } from '../seat/seat.srevice';
import { SeatReponsitory } from 'src/repositories/seat.reponsitory';
import { SeatModule } from '../seat/seat.module';
import { Seat, SeatSchema } from 'src/schemas/seat.schema';
import { StripeService } from './Stripe.Service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Cinema, CinemaSchema } from 'src/schemas/cinema.schema';
import { Room, RoomSchema } from 'src/schemas/room.schema';
import { Showtime, ShowtimeSchema } from 'src/schemas/showtime.schema';
import { Movie, MovieScheme } from 'src/schemas/movie.schema';
import { Time, TimeSchema } from 'src/schemas/time.schema';
import { Seatstatus, SeatstatusSchema } from 'src/schemas/seatstatus.schema';
import {
  Notification,
  NotificationSchema,
} from 'src/schemas/notification.schema';
import { NotificationService } from '../notification/notification.service';
import { NotificationReponsitory } from 'src/repositories/notification.reponsitory';
import { User, UserSchema } from 'src/schemas/user.schema';
import { NotificationGateway } from '../notification/notification.gateway';
import { NotificationModule } from '../notification/notification.module';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { FcmNotificationService } from '../firebase_notification/firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Seat.name, schema: SeatSchema },
      { name: Cinema.name, schema: CinemaSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Showtime.name, schema: ShowtimeSchema },
      { name: Movie.name, schema: MovieScheme },
      { name: Time.name, schema: TimeSchema },
      { name: Seatstatus.name, schema: SeatstatusSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ConfigModule.forRoot({ envFilePath: '.evn' }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    TicketReponsitory,
    TicketService,
    StripeService,
    SeatReponsitory,
    NotificationService,
    NotificationReponsitory,
    NotificationGateway,
    FcmNotificationService,
    // {
    //   provide: 'FirebaseAdmin',
    //   useFactory: async () => {
    //     const cwd = process.cwd();
    //     const serviceAccountPath = path.join(cwd, 'public/serviceAccountKey.json');
    //     await admin.initializeApp({
    //       credential: admin.credential.cert(serviceAccountPath),
    //     });
    //     return admin.app();
    //   },
    // },
  ],

  controllers: [TicketController],
})
export class TicketModule {}
