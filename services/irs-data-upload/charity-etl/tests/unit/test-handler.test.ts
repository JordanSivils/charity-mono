import { describe, expect, it, jest } from "@jest/globals";
import type { Handler } from "aws-lambda";
import { handler } from "../../app";
import { streamData } from "../../utils/pipeline";
import client from "../../pg/pg-config";

jest.mock("../../utils/pipeline", () => ({
  streamData: jest.fn()
}));

jest.mock("../../pg/pg-config", () => ({
  __esModule: true,
  default: {
    end: jest.fn()
  }
}));

describe("handler", () => {
  it("runs the IRS import and returns a successful response", async () => {
    jest.mocked(streamData).mockResolvedValue(undefined);
    (client.end as jest.MockedFunction<() => Promise<void>>).mockResolvedValue(undefined);

    const result = (await (handler as Handler<unknown, { statusCode: number; body: string }>)(
      {},
      {} as never,
      jest.fn()
    )) as { statusCode: number; body: string };

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "IRS import completed successfully",
      filesProcessed: expect.any(Number)
    });
    expect(streamData).toHaveBeenCalled();
    expect(client.end).toHaveBeenCalled();
  });
});
