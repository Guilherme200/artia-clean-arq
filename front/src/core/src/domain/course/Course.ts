import {CourseInterface} from "#/domain/course/CourseInterface";

export class Course {
  public id: number;
  public title: string;
  public description: string;
  public video: string;
  public status: boolean;
  public expiredAt: string;
  public updatedAt: string;
  public createdAt: string;

  constructor(data: CourseInterface) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.video = data.video
    this.status = data.status
    this.expiredAt = data.expiredAt
    this.updatedAt = data.updatedAt
    this.createdAt = data.createdAt
  }
}