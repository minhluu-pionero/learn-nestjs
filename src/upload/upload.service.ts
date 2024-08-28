import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
  create(file) {
    console.log(file.filename)

    return 'File uploaded successfully'
  }
}
