import { IBaseService } from '@/interfaces/base-service.interface';
import { IFindAndCountResponse } from '@/interfaces/typeorm.interface';
import {
    DeepPartial,
    DeleteResult,
    EntityManager,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    In,
    InsertResult,
    Repository,
    UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<Entity> implements IBaseService<Entity> {
    constructor(public repository: Repository<Entity>) {}

    async withTnx(
        runInTransaction: (
            entityManager: EntityManager,
        ) => Promise<unknown>,
    ): Promise<any> {
        try {
            const manager = this.repository.manager;

            return await manager.transaction(runInTransaction);
        } catch (error) {
            throw error;
        }
    }

    async insert(
        entity:
            | QueryDeepPartialEntity<Entity>
            | QueryDeepPartialEntity<Entity>[],
    ): Promise<InsertResult> {
        const result = await this.repository.insert(entity);

        return result;
    }

    async insertWithTnx(
        entityManager: EntityManager,
        entity:
            | QueryDeepPartialEntity<Entity>
            | QueryDeepPartialEntity<Entity>[],
    ): Promise<InsertResult> {
        const result = await entityManager.insert(
            this.repository.target,
            entity,
        );

        return result;
    }

    async findAndCount(
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

    async findById(
        id: string,
        options?: FindOneOptions<Entity>,
    ): Promise<Entity> {
        return this.repository.findOne({
            ...options,
            where: { id } as any,
        });
    }

    async findByIds(
        ids: string[],
        options?: FindOneOptions<Entity>,
    ): Promise<Entity[]> {
        return this.repository.find({
            ...options,
            where: { id: In(ids) } as any,
        });
    }

    async save(data: DeepPartial<Entity>): Promise<Entity> {
        return this.repository.save(data);
    }

    async saveWithTnx(
        entityManager: EntityManager,
        entity: DeepPartial<Entity>,
    ): Promise<DeepPartial<Entity>> {
        const result = await entityManager.save(
            this.repository.target,
            entity,
        );

        return result;
    }

    async bulkSave(data: DeepPartial<Entity[]>): Promise<Entity[]> {
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

    async updateWithTnx(
        entityManager: EntityManager,
        where: FindOptionsWhere<Entity>,
        update: QueryDeepPartialEntity<Entity>,
    ): Promise<UpdateResult> {
        const result = await entityManager.update(
            this.repository.target,
            where,
            update,
        );

        return result;
    }

    async delete(
        where: FindOptionsWhere<Entity>,
    ): Promise<DeleteResult> {
        return await this.repository.softDelete(where);
    }

    async hardDelete(
        where: FindOptionsWhere<Entity>,
    ): Promise<DeleteResult> {
        return await this.repository.delete(where);
    }
}
