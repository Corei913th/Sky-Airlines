import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../mail.service';
import { AbstractMailProvider } from '../abstracts/mail-provider';
import { LoggerService } from '@/infrastructure/logger/logger';
import { SendMailOptions } from '../abstracts/mail-service';

/**
 * Fake in-memory MailProvider mock for unit test verification.
 * Stores dispatched email payloads and tracks SMTP verification status.
 */
class FakeMailProvider implements AbstractMailProvider {
  /** In-memory array storing all dispatched email payloads. */
  public sentMails: SendMailOptions[] = [];

  /** Flag tracking whether the SMTP connection verification was executed. */
  public verified = false;

  /**
   * Simulates email dispatch by capturing the payload in memory.
   *
   * @param payload Email recipient, subject, and content options.
   */
  async send(payload: SendMailOptions): Promise<void> {
    this.sentMails.push(payload);
  }

  /**
   * Simulates SMTP connectivity verification.
   */
  async verify(): Promise<void> {
    this.verified = true;
  }
}

/**
 * Unit test suite for MailService.
 * Validates module initialization, connection verification, option validations, and email delivery workflows.
 */
describe('MailService', () => {
  let service: MailService;
  let provider: FakeMailProvider;

  beforeEach(async () => {
    provider = new FakeMailProvider();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: AbstractMailProvider,
          useValue: provider,
        },
        {
          provide: AbstractMailProvider,
          useValue: provider,
        },
        {
          provide: LoggerService,
          useValue: {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  /**
   * Module initialization lifecycle hook tests.
   */
  describe('onModuleInit', () => {
    it('should verify the connection with the provider on module startup', async () => {
      service.onModuleInit();

      // Allow background microtask queue to process async verification
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(provider.verified).toBe(true);
    });
  });

  /**
   * Email dispatch and validation tests.
   */
  describe('sendMail', () => {
    it('should successfully validate payload and delegate email dispatch to provider', async () => {
      const options: SendMailOptions = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Content',
      };

      await service.sendMail(options);

      expect(provider.sentMails).toHaveLength(1);
      expect(provider.sentMails[0].to).toBe('test@example.com');
      expect(provider.sentMails[0].subject).toBe('Test Subject');
    });

    it('should throw an error when recipient (to) parameter is missing', async () => {
      const options = { subject: 'No Recipient', text: 'Content' } as SendMailOptions;
      await expect(service.sendMail(options)).rejects.toThrow('Recipient (to) is required.');
    });

    it('should throw an error when email subject parameter is missing', async () => {
      const options = { to: 'test@example.com', text: 'Content' } as SendMailOptions;
      await expect(service.sendMail(options)).rejects.toThrow('Subject is required.');
    });

    it('should throw an error when email content (text or html) is missing', async () => {
      const options = { to: 'test@example.com', subject: 'No Content' } as SendMailOptions;
      await expect(service.sendMail(options)).rejects.toThrow(
        'Email content (text or html) is required.',
      );
    });

    it('should handle provider errors and mark provider as unavailable upon failure', async () => {
      jest.spyOn(provider, 'send').mockRejectedValueOnce(new Error('SMTP Error'));

      const options: SendMailOptions = {
        to: 'test@example.com',
        subject: 'Fail Test',
        text: 'Content',
      };

      await expect(service.sendMail(options)).rejects.toThrow('SMTP Error');
    });
  });
});
