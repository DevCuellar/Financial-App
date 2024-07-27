import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) {}

  @EventPattern('user_registered')
  async handleUserRegistered(@Payload() data: CreateNotificationDto) {
    await this.notificationsService.processUserRegistrationNotification(data);
  }
}
