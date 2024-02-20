import { UniqueEntityID } from "./unique-entity-id";

export class Entity<T> {
  private _id: UniqueEntityID;
  protected props: T;

  get id(): string {
    return this._id.toValue();
  }

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();
    this.props = props;
  }
}
