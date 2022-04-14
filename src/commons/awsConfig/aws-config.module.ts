import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AwsConfigService } from './aws.config.service';
import { AWS_CONFIG } from '../../enum';

@Module({})
export class AWSConfigModule {
  static forRoot(): DynamicModule {
    const AWSConfigServiceProvider: Provider = {
      provide: AWS_CONFIG.PROVIDER,
      useValue: new AwsConfigService(),
    };

    return {
      module: AWSConfigModule,
      providers: [AWSConfigServiceProvider],
      exports: [AWSConfigServiceProvider],
      global: true,
    };
  }
}
