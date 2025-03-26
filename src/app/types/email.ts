export type EmailType = "PENDING" | "APPROVED" | "DISMISSED";

export interface EmailRequest {
   data: {
     name: string;
     email: string;
   };
   type: EmailType;
 }



