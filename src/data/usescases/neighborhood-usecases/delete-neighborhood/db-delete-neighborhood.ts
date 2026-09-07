import { DeleteNeighborhood } from "../../../../domain/usescases/neighborhood/delete-neighborhood";
import { DeleteNeighborhoodRepository } from "../../../protocols/db/neighborhood/delete-neighborhood";

export class DbDeleteNeighborhood implements DeleteNeighborhood {
  constructor(private readonly deleteNeighborhoodRepository: DeleteNeighborhoodRepository) {}

  async delete(id: number): Promise<string> {
    return this.deleteNeighborhoodRepository.deleteOne(id);
  }
}
