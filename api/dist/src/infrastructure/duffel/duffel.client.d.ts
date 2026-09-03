import { Duffel } from '@duffel/api';
import { ConfigService } from '@nestjs/config';
export declare const DUFFEL_CLIENT = "DUFFEL_CLIENT";
export declare const duffelClientProvider: {
    provide: string;
    useFactory: (configService: ConfigService) => Duffel;
    inject: (typeof ConfigService)[];
};
