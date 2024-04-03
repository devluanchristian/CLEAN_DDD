import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not0found-error'
import { NotificationRepository } from '../repositories/notification-repostiories'

export interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  object
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    )
    if (!notification) {
      return left(new ResourceNotFoundError())
    }
    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }
    notification.read()

    return right({})
  }
}
