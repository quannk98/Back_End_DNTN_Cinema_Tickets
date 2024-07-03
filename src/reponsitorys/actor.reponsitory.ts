import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActorDto } from 'src/modules/actor/dto/actor.dto';
import { Actor } from 'src/schemas/actor.schema';

@Injectable()
export class ActorReponsitory {
  constructor(
    @InjectModel(Actor.name) private readonly actorModel: Model<Actor>,
  ) {}
  async createActor(actorDto: ActorDto): Promise<any> {
    const existsActor = await this.actorModel.findOne({
      name: actorDto.name,
    });
    if (existsActor) throw new ConflictException('Actor already exists');
    const createActor = new this.actorModel(actorDto);
    if (!createActor) throw new UnauthorizedException('Create Fail');
    return {
      data: createActor.save(),
      message: 'Successfully',
    };
  }

  async getAllactor(): Promise<any> {
    const getAll = await this.actorModel.find({});
    return getAll;
  }
  async getactor(actorId: any): Promise<any> {
    const getActor = await this.actorModel.findById(actorId);
    if (!getActor) {
      return {
        status: 'error',
        message: 'Get Failed',
      };
    }
    return {
      data: getActor,
      message: 'Successfully',
    };
  }

  async updateActor(actorId: any, dataUpdate: any): Promise<any> {
    const update = await this.actorModel.findByIdAndUpdate(
      actorId,
      dataUpdate,
      {
        new: true,
      },
    );
    if (!update) {
      return {
        status: 'error',
        message: 'Update Failed',
      };
    }
    return update;
  }

  async deleteActor(actorId: any): Promise<any> {
    const deleteactor = await this.actorModel.findByIdAndDelete(actorId);
    if (!deleteactor) {
      return {
        status: 'error',
        message: 'Delete Failed',
      };
    }
    return deleteactor;
  }
}
