import {Course} from "#/domain/course/Course";
import {BaseService} from "#/domain/shared/BaseService";
import {RequestInterface} from "#/domain/shared/RequestInterface";

export class CourseService extends BaseService<Course> {
  constructor() {
    super({data: Course, url: 'api/courses'});
  }

  async getVideo(id: string): Promise<any> {
    return await this.fetch.get(`${this.url}/${id}/video`).then((response: any) => {
      return {item: response}
    }).catch((error: any) => error)
  }
}