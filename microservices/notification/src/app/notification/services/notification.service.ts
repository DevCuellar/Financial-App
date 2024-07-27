import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { Email } from '../interfaces/email.interface';
import { USER_REGISTRATION_TEMPLATE } from '../templates/user-registration.template';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async processUserRegistrationNotification(data: CreateNotificationDto) {
    const emailDetails = this.createUserRegistrationEmail(data);
    const notification = await this.createNotification(data, emailDetails);

    await this.sendNotification(emailDetails);
    notification.isSent = true;
    await this.notificationRepository.save(notification);
  }

  private createUserRegistrationEmail(data: CreateNotificationDto): Email {
    const html = USER_REGISTRATION_TEMPLATE.replace(
      '{{confirmationLink}}',
      data.confirmationLink
    );

    return {
      from: process.env.MAIL_USER,
      to: data.email,
      subject: 'Confirma tu correo electrónico para completar tu registro',
      html: html,
    };
  }

  private async createNotification(
    data: CreateNotificationDto,
    emailDetails: Email
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      email: data.email,
      subject: emailDetails.subject,
      message: emailDetails.html,
      isSent: false,
    });

    return this.notificationRepository.save(notification);
  }

  private async sendNotification(email: Email) {
    await this.transporter.sendMail(email);
  }
}
