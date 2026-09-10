import type { PrismaService } from '../prisma.service';

export abstract class PrismaRepository<T> {
  protected constructor(protected readonly prisma: PrismaService) {}

  abstract findById(id: string): Promise<T | null>;

  abstract findAll(): Promise<T[]>;
}
