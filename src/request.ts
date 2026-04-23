export interface Request {
  request_id?: string;
  data: string;
  type: 'url' | 'file_path';
}
