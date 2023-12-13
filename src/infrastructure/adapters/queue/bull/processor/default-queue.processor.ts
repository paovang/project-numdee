import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JobNames } from '../constants/queue.constant';

@Processor('defaultQueue')
export class QueueProcessor {
  constructor(
   
  ) {}

  @Process({ name: JobNames.SendMail })
  async sendMail(job: Job<any>) {
    console.log('successfully: ', job.data);
  }
}