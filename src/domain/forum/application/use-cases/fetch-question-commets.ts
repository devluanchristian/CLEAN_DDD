import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentRepository } from '../repositories/question-comments-repositories'

interface FetchQuestionQuestionsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionQuestionsUseCaseResponse = Either<
  null,
  { questionComment: QuestionComment[] }
>

export class FetchQuestionQuestionsUseCase {
  constructor(private questionCommentsRepository: QuestionsCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionQuestionsUseCaseRequest): Promise<FetchQuestionQuestionsUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })
    return right({ questionComment })
  }
}
