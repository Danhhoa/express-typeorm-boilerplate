import {
    DeepPartial,
    DeleteResult,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IFindAndCountResponse } from './typeorm.interface';

export interface IBaseService<Entity> {
    findAndCount(
        where: FindOptionsWhere<Entity>,
        options?: FindManyOptions<Entity>,
    ): Promise<IFindAndCountResponse<Entity>>;

    findById(
        id: string,
        options?: FindOneOptions<Entity>,
    ): Promise<Entity>;

    findByIds(
        ids: string[],
        options?: FindOneOptions<Entity>,
    ): Promise<Entity[]>;

    save(data: DeepPartial<Entity>): Promise<Entity>;

    bulkSave(data: DeepPartial<Entity[]>): Promise<Entity[]>;

    update(
        where: FindOptionsWhere<Entity>,
        update: QueryDeepPartialEntity<Entity>,
    ): Promise<UpdateResult>;

    delete(where: FindOptionsWhere<Entity>): Promise<DeleteResult>;
}
