import { Injectable, Type } from '@nestjs/common';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { Policy } from './interfaces/policy.interface';

@Injectable()
export class PolicyHandlersStorage {
  private readonly collection = new Map<Type<Policy>, PolicyHandler<any>>();

  add<T extends Policy>(policy: Type<T>, handler: PolicyHandler<T>) {
    this.collection.set(policy, handler);
  }

  get<T extends Policy>(policy: Type<T>): PolicyHandler<T> | undefined {
    const handler = this.collection.get(policy);

    if (!handler) {
      throw new Error(`Policy handler for ${policy.name} not found`);
    }

    return handler;
  }
}
