import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get slug() {
    return this.props.slug
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
}
