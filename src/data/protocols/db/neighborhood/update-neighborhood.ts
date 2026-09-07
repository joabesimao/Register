import { Neighborhood } from "../../../../domain/models/neighborhood/neighborhood-model";

export interface UpdateNeighborhoodRepository {
  update(id: number, data: Partial<Neighborhood>): Promise<Neighborhood>;
}
