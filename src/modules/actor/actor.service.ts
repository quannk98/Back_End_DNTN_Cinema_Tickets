import { Injectable } from '@nestjs/common';
import { ActorReponsitory } from 'src/repositories/actor.reponsitory';
import { ActorDto } from './dto/actor.dto';
import { Actor } from 'src/schemas/actor.schema';

@Injectable()
export class ActorService {
  constructor(private readonly actorReponsitory: ActorReponsitory) {}
  async createActor(actorDto: ActorDto): Promise<Actor> {
    const actor = await this.actorReponsitory.createActor(actorDto);
    return actor.data;
  }

  async getAllactor(): Promise<Actor> {
    const getall = await this.actorReponsitory.getAllactor();
    return getall;
  }
  async getactor(actorId: any): Promise<Actor> {
    const getActor = await this.actorReponsitory.getactor(actorId);
    return getActor;
  }

  async updateActor(actorId: any, actorDto: ActorDto): Promise<Actor> {
    const update = await this.actorReponsitory.updateActor(actorId, {
      name: actorDto.name,
      image: actorDto.image,
    });
    return update;
  }

  async deleteActor(actorId: any): Promise<Actor> {
    const deleteDirector = await this.actorReponsitory.deleteActor(actorId);
    return deleteDirector;
  }
}
