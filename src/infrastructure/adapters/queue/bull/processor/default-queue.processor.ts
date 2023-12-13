import { Inject } from '@nestjs/common';
import { MAIL_SERVICE } from '@/infrastructure/adapters/mail/inject-key';
import { IMail } from '@/infrastructure/ports/mail/mail.interface';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JobNames } from '../constants/queue.constant';
import { CACHE_SERVICE } from '@/infrastructure/adapters/cache/inject-key';
import { ICache } from '@/infrastructure/ports/cache/cache.interface';

@Processor('defaultQueue')
export class QueueProcessor {
  constructor(
    @Inject(MAIL_SERVICE) private readonly _mailer: IMail<any>,
    @Inject(CACHE_SERVICE) private readonly cacheService: ICache<any>,
  ) {}

  @Process({ name: JobNames.SendMail })
  async sendMail(job: Job<any>) {
    console.log('successfully: ', job.data);

    const body = job.data;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTcwMTM0MTMzOCwiZXhwIjoxNzAxMzQxMzk4fQ.PSGa3uXcxSrS_9j8PH4xDrD1xDyCuqUkGmXpjmaWlPE';

    await this._mailer.sendMail({
      to: body.email,
      subject: body.subject,
      template: 'forgot-password',
      context: {
        url: `http://uklao.com/forgot-password?token=${token}`
      },
    });
  }

  @OnQueueCompleted()
  async handleCompletion(job: Job) {
    const jobIdentifier = this.cacheService.generateJobIdentifier(
      job.name,
      job.data,
    );
    
    if(jobIdentifier){
      await this.cacheService.delete(jobIdentifier);
    }

    console.log('deleted.');
  }
}