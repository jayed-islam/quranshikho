// export interface IFeatureItem {
//   _id?: string | null;
//   videoId: string;
//   title: string;
//   lecturer: string;
//   videoDuration: string;
//   publishingDate: string;
//   episode?: string;
// }

export interface IFeatureItem {
  _id?: string | null;
  videoId: string | null;
  title: string;
  lecturer: string;
  videoDuration: string;
  publishingDate: Date | string;
  type?: string;
}

export interface ILecturerItem {
  _id?: string | null;
  lecturerId: string;
  name: string;
  image: string;
  lectureCount: number;
}

interface Lecturer {
  _id: string;
  name: string;
  lecturerId: string;
  image: string;
}

export interface IIslamicLectureItem {
  _id?: string | null;
  videoId: string;
  title: string;
  videoDuration: string;
  lecturer: Lecturer;
  publishingDate: string;
  type: string;
}

export interface ILecturerInfo {
  label: string;
  value: string;
}
