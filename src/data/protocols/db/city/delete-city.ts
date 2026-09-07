export interface DeleteCityRepository {
  deleteOne(id: number): Promise<string>;
}
