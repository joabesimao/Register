import { City } from "../../../../domain/models/city/city-model";

export interface UpdateCityRepository {
  update(id: number, data: Partial<City>): Promise<City>;
}
