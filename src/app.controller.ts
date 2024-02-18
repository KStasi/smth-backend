import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DeployParams, GetPaymentAddressParams, WithdrawParams } from './types';
import { ProxyService } from './proxy.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly proxyService: ProxyService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('create')
  async create(): Promise<{
    link: string;
  }> {
    return this.proxyService.createChild();
  }

  @Post('deploy')
  async deploy(@Body() params: DeployParams): Promise<{
    imageHash: string;
  }> {
    const imageHash = await this.appService.deploy(params);

    return {
      imageHash,
    };
  }

  @Get('deposit')
  async deposit(@Query() params: GetPaymentAddressParams): Promise<string> {
    return this.appService.deposit(params);
  }

  @Post('withdraw')
  async withdraw(@Body() params: WithdrawParams): Promise<string> {
    return this.appService.withdraw(params);
  }
}
