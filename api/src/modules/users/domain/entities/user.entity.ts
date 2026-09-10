import { UserRole } from '@prisma/client';

/**
 * Initial properties required to instantiate a User entity.
 */
export interface UserProperties {
  id?: string;
  email: string;
  emailVerified?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * User domain entity.
 *
 * Encapsulates core business logic and maintains entity invariants.
 */
export class User {
  private readonly _id: string;
  private readonly _email: string;
  private _emailVerified: boolean;
  private _firstName: string | null;
  private _lastName: string | null;
  private _role: UserRole;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: UserProperties) {
    this._id = props.id ?? crypto.randomUUID();
    this._email = props.email;
    this._emailVerified = props.emailVerified ?? false;
    this._firstName = props.firstName ?? null;
    this._lastName = props.lastName ?? null;
    this._role = props.role ?? UserRole.CLIENT;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  /**
   * Creates a new User domain entity instance.
   */
  public static create(props: UserProperties): User {
    return new User(props);
  }

  /**
   * Reconstitutes a User domain entity from persistence storage.
   */
  public static reconstitute(props: UserProperties): User {
    return new User(props);
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get emailVerified(): boolean {
    return this._emailVerified;
  }

  get firstName(): string | null {
    return this._firstName;
  }

  get lastName(): string | null {
    return this._lastName;
  }

  get role(): UserRole {
    return this._role;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  /**
   * Updates user profile names.
   */
  public updateProfile(firstName?: string | null, lastName?: string | null): void {
    if (firstName !== undefined) this._firstName = firstName;
    if (lastName !== undefined) this._lastName = lastName;
    this._updatedAt = new Date();
  }

  /**
   * Marks the user's email address as verified.
   */
  public markEmailAsVerified(): void {
    this._emailVerified = true;
    this._updatedAt = new Date();
  }

  /**
   * Updates the role assigned to the user.
   */
  public changeRole(role: UserRole): void {
    this._role = role;
    this._updatedAt = new Date();
  }
}
