export class TrainingPrograms{
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public availability: string[],
    public location: string,
    public email: string){}
}
