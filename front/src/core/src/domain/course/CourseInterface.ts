export interface VideoInterface {
  file: string,
  fileName: string,
  fileExtension: string,
  fileMimeType: string,
}

export interface CourseFormInterface {
  title: string;
  description: string;
  video: VideoInterface;
  expiredAt: Date;
}

export interface CourseInterface {
  id: number;
  title: string;
  description: string;
  video: string;
  expiredAt: string;
  updatedAt: string;
  createdAt: string;
}