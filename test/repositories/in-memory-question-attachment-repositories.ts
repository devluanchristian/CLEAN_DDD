import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repositories'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = await this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )
    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = await this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )
    this.items = questionAttachments
  }
}
