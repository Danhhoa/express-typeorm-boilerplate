import { IBaseService } from '@/interfaces/base-service.interface';
import { IFindAndCountResponse } from '@/interfaces/typeorm.interface';
import {
    DeepPartial,
    DeleteResult,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    In,
    Repository,
    UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<Entity> implements IBaseService<Entity> {
    constructor(public repository: Repository<Entity>) {}

    public async findAndCount(
        where?: FindOptionsWhere<Entity>,
        options?: FindManyOptions<Entity>,
    ): Promise<IFindAndCountResponse<Entity>> {
        const result = await this.repository.findAndCount({
            ...options,
            where,
        });

        return {
            count: result[1],
            rows: result[0],
        };
    }

    public async findById(
        id: string,
        options?: FindOneOptions<Entity>,
    ): Promise<Entity> {
        return this.repository.findOne({
            ...options,
            where: { id } as any,
        });
    }

    public async findByIds(
        ids: string[],
        options?: FindOneOptions<Entity>,
    ): Promise<Entity[]> {
        return this.repository.find({
            ...options,
            where: { id: In(ids) } as any,
        });
    }

    public async save(data: DeepPartial<Entity>): Promise<Entity> {
        return this.repository.save(data);
    }

    public async bulkSave(
        data: DeepPartial<Entity[]>,
    ): Promise<Entity[]> {
        return this.repository.save(data);
    }

    async update(
        where: FindOptionsWhere<Entity>,
        update: QueryDeepPartialEntity<Entity>,
    ): Promise<UpdateResult> {
        const result = await this.repository.update(
            where,
            update as any,
        );

        return result;
    }

    public async delete(
        where: FindOptionsWhere<Entity>,
    ): Promise<DeleteResult> {
        return await this.repository.softDelete(where);
    }

    public async hardDelete(
        where: FindOptionsWhere<Entity>,
    ): Promise<DeleteResult> {
        return await this.repository.delete(where);
    }

    // public async paginate(
    //     dto: PaginateDTO,
    //     filters?: FindOptionsWhere<any>,
    //     sort?: FindOptionsOrder<any>,
    //     relations?: string[],
    // ): Promise<PaginationResult<T>> {
    //     const totalCount = await this.repository.count({
    //         where: filters,
    //     });
    //     if (totalCount === 0) {
    //         return {
    //             meta: {
    //                 total: 0,
    //                 currentPage: parseInt(dto.page),
    //                 perPage: 0,
    //             },
    //             data: [],
    //         };
    //     }

    //     const data = await this.repository.find({
    //         take: parseInt(dto.perPage),
    //         skip: (parseInt(dto.page) - 1) * parseInt(dto.perPage),
    //         relations,
    //         where: {
    //             deletedAt: IsNull(),
    //             ...filters,
    //         },
    //         order: sort,
    //     });

    //     return {
    //         meta: {
    //             total: totalCount,
    //             currentPage: parseInt(dto.page),
    //             perPage: parseInt(dto.perPage),
    //         },
    //         data,
    //     };
    // }
}
