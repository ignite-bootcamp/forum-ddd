import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Slug } from './value-objects/slug';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import { QuestionAttachment } from './question-attachment';

export interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  createdAt: Date;
  attachments: QuestionAttachment[];
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
  get slug() {
    return this.props.slug;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...');
  }

  get attachments() {
    return this.props.attachments;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments;
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return question;
  }
}
