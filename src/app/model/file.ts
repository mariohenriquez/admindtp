import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

export class File {
    details: FileDetails;
    objectURL: SafeUrl;

    selected(): boolean {
        return this.details != undefined;
    }

    defineName(path: string) {
        this.details.name = path.split('/').pop().split('#')[0].split('?')[0];
    }
}

interface FileDetails {
    name: string;
    size: number;
    path?: string;
    orientation: number;
}
