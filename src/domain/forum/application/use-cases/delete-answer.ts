import { Either, left, right } from '@/core/either'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { ResourceNotFoundError } from './errors/resource-not0found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    await this.answerRepository.delete(answer)

    return right({})
  }
}
