import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { FileResponse } from './file.interface'
import { ensureDir, writeFile } from 'fs-extra'

const uploadsDirName = 'static/uploads'

@Injectable()
export class FileService {
  async saveFiles(
    files: Express.Multer.File[],
    destDir = 'default',
  ): Promise<FileResponse[]> {
    const uploadsDirPath = `${path}/${uploadsDirName}/${destDir}`

    await ensureDir(uploadsDirPath)

    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadsDirPath}/${file.originalname}`, file.buffer)

        return {
          url: `/${uploadsDirName}/${destDir}/${file.originalname}`,
          name: file.originalname,
        }
      }),
    )

    return res
  }
}
