import { LoadAllProduct } from "../../../../domain/usescases/product/load-product/load-product";
import { Product } from "../../../../domain/models/product/product";
import { LoadProductController } from "./load-product";
import { HttpRequest } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http/http-helper";

const makeFakeProducts = (): Product[] => [
  {
    id: 1,
    name: "any_name",
    price: 10,
    description: "any_description",
    category: "any_category",
  },
];

const makeLoadAllProductStub = (): LoadAllProduct => {
  class LoadAllProductStub implements LoadAllProduct {
    async load(): Promise<Product[]> {
      return new Promise((resolve) => resolve(makeFakeProducts()));
    }
  }
  return new LoadAllProductStub();
};

interface SutTypes {
  sut: LoadProductController;
  loadProductStub: LoadAllProduct;
}

const makeSut = (): SutTypes => {
  const loadProductStub = makeLoadAllProductStub();
  const sut = new LoadProductController(loadProductStub);
  return {
    sut,
    loadProductStub,
  };
};

describe("LoadProduct Controller", () => {
  test("Should call LoadAllProduct", async () => {
    const { sut, loadProductStub } = makeSut();
    const loadSpy = jest.spyOn(loadProductStub, "load");
    await sut.handle({} as HttpRequest);
    expect(loadSpy).toHaveBeenCalled();
  });

  test("Should return 200 with products on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({} as HttpRequest);
    expect(httpResponse).toEqual(ok(makeFakeProducts()));
  });

  test("Should return 500 if LoadAllProduct throws", async () => {
    const { sut, loadProductStub } = makeSut();
    jest
      .spyOn(loadProductStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const httpResponse = await sut.handle({} as HttpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
