import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

// Onde está impFolder era para ser tmpFolder
const impFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  impFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  impFolder,
  uploadsFolder: path.resolve(impFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: impFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'go-barber-2',
    },
  },
} as IUploadConfig;
