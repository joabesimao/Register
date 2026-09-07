export interface DeleteNeighborhoodRepository {
  deleteOne(id: number): Promise<string>;
}
