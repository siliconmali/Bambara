export type Word = {
   word: string;
   definition: {
     bam: string;
     eng: string;
     fren: string;
   };
   example?: {
     bam: string;
     eng: string;
     fren: string;
   };
   variant?: string[];
   synonym?: string[];
   antonym?: string | string[];
   usage?: string;
   similar?: string[];
   expressions?: {
     bam: string;
     eng: string;
     fren: string;
   }[];
   see?: string;
 }
 
 export type Dictionary = {
   dictionary: Word[];
 };