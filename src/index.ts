import { Serializable } from './serializable/serializable';
import { CommandHandler } from './handler/command-handler';
import { ResponseMessage } from './message/response-message';
import { InstanceSC } from './serializable/serializable-capsule/instance-serializable-capsule';
import { CommandMessage } from './message/command-message';
import { SimpleCommandBus } from './message-bus/command-bus/simple-command-bus';
import { ResponseCallback } from './message-bus/response-callback/response-callback';
import { asyncSleep } from './base/utils/async-sleep';
import { MessageHandlerInterceptor } from './message-bus/interceptor/message-handler-interceptor';
import { InferMessageFromHandler, InferResFromHandler } from './handler/types';
import { UnitOfWork } from './unit-of-work/unit-of-work';
import { InterceptorChain } from './message-bus/interceptor/intercepter-chain';
import { Message } from './message/message';
import { MessageDispatchInterceptor } from './message-bus/interceptor/message-dispatch-interceptor';

async function main() {
  class Command1 implements Serializable {
    constructor(
      public readonly name: string,
    ) {}
  }
  
  class Response1 implements Serializable {
    constructor(
      public readonly res: string,
    ) {}
  }
  
  class Command1Handler implements CommandHandler<Command1, ResponseMessage<InstanceSC<Response1>>> {
    async handle(
      message: CommandMessage<Command1>,
    ): Promise<ResponseMessage<InstanceSC<Response1>>> {
      console.log(22, ' in handle ', message.getPayload().get());
      return new ResponseMessage({
        source: 'source',
        metadata: {},
        payload: new InstanceSC(new Response1('result message')),
      })
    }
  }

  class LoggerDispatch implements MessageDispatchInterceptor<CommandMessage<Command1>> {
    async handle(command: CommandMessage<Command1>): Promise<CommandMessage<Command1>> {
      console.log('in logger dispatch');
      return command;
    }
  }

  class Logger implements MessageHandlerInterceptor<Command1Handler> {
    async handle(
      uow: UnitOfWork<InferMessageFromHandler<Command1Handler>>,
      iChain: InterceptorChain<Command1Handler>,
    ): Promise<InferResFromHandler<Command1Handler>> {
      console.log('in logger, before handle');
      const res = await iChain.proceed();
      console.log('in logger, after handle');
      return res;
    }
  }

  class WithHandleIntercepterCommandBus extends SimpleCommandBus {
  }

  const commandBus = new WithHandleIntercepterCommandBus();
  commandBus.registerDispatchInterceptor(new LoggerDispatch());
  commandBus.registerHandleInterceptor(new Logger());

  await commandBus.subscribe(
    Command1,
    new Command1Handler(),
  )
  
  const callback = new ResponseCallback();
  const iR = new InstanceSC(Response1);
  callback.onResponse(
    iR, 
    async (resp): Promise<void> => {
      console.log('resp', resp);
    }
  );
  
  await commandBus.dispatch(
    new CommandMessage({
      payload: new InstanceSC(new Command1('Aizere')),
      metadata: {},
      source: 'source',
    }),
    callback as any,
  );
  console.log('after dispatch');
}

main().then(() => {
  console.log('main end');
});
