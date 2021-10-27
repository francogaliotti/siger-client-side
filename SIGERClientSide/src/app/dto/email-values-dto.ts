export class EmailValuesDTO {
    
    mailFrom: string;

    mailTo: string;

    subject: string;

    username: string;

    tokenPassword: string;

    constructor(mailTo: string){
        this.mailTo = mailTo;
    }
}