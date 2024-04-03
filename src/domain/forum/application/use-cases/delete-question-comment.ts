import { Either, left, right } from '@/core/either'
import { QuestionsCommentRepository } from '../repositories/question-comments-repositories'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not0found-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  object
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionsCommentRepository: QuestionsCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionsCommentRepository.findById(
      questionCommentId,
    )
    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }
    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionsCommentRepository.delete(questionComment)

    return right({})
  }
}
