export declare class HashingService {
    hash(plain: string, saltRounds?: number): Promise<string>;
    compare(plain: string, hash: string): Promise<boolean>;
}
