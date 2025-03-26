export const getAudioDuration = (url: string): Promise<number> => {
   return new Promise((resolve) => {
     const audio = new Audio(url);
     audio.addEventListener("loadedmetadata", () => {
       resolve(audio.duration || 0); // Duration in seconds
     });
     audio.addEventListener("error", () => resolve(0));
   });
 };