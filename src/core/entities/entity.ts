import { UniqueEntityID } from "./unique-entity-id";

export class Entity<T> {
  private _id: UniqueEntityID;
  protected props: T;

  get id(): string {
    return this._id.toValue();
  }

  constructor(props: T, id?: string) {
    this._id = new UniqueEntityID(id);
    this.props = props;
  }
}
