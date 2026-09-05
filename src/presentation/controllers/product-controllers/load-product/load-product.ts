import { LoadAllProduct } from "../../../../domain/usescases/product/load-product/load-product";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class LoadProductController implements Controller {
  constructor(private readonly loadProduct: LoadAllProduct) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.loadProduct.load();
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
