import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comment-repositories'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to delete a question comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })
})

it('should not be able to delete another user question comment', async () => {
  const answerComment = makeAnswerComment({
    authorId: new UniqueEntityID('author-1'),
  })

  await inMemoryAnswerCommentRepository.create(answerComment)

  const result = await sut.execute({
    answerCommentId: answerComment.id.toString(),
    authorId: 'author-2',
  })
  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)
})
