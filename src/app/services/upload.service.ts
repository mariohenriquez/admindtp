require('aws-sdk/dist/aws-sdk');
import { File } from '../model/file';
import { environment } from '../../environments/environment';

export class UploadService {

    private bucket: string;

    constructor() {
        this.bucket = environment.APP_BUCKET_NAME;
    }

    upload(file: any, key: string) {
        var AWSService = window.AWS;
    
         AWSService.config.accessKeyId = process.env.APP_AWS_ACCESS_KEY_ID;
        AWSService.config.secretAccessKey = process.env.APP_AWS_SECRET_ACCESS_KEY;

        var bucket = new AWSService.S3({ params: { Bucket: this.bucket } });
        var params = { Key: `${key}/${file.name}`, Body: file };

        bucket.upload(params, function (err, data) {
            if( err != undefined) {
            }
        });
    }

    handleFileUploads(files: File[], prefix: string) {
        files.forEach(file => {
            if (file.selected() == false || file.details.path != null) {
                return
            }

            this.upload(file.details, prefix)
        })
    }
}
